import {
  createSlice,
  createSelector,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { createDefaultRecipe, createIngredient, type Recipe } from '../model';
import type { RootState } from './store';
import type { WritableDraft } from 'immer';
import { toNormalized, type Normalized } from '../utils/normalize';

import { round } from '../utils/round';

export type WeightTargetType = 'flour' | 'dough';
export interface WeightTarget {
  weight: number;
  type: WeightTargetType;
}

export interface EditorState {
  recipes: Normalized<Recipe>;
  weightTarget: WeightTarget;
  currentRecipeId: string;
}

const initializeState = (): EditorState => {
  const recipes = [createDefaultRecipe()];
  return {
    recipes: toNormalized(recipes),
    weightTarget: {
      weight: 500,
      type: 'flour',
    },
    currentRecipeId: recipes[0].id,
  };
};

const editorSlice = createSlice({
  name: 'recipe',
  initialState: initializeState,
  reducers: {
    nameEdited: (state, { payload }: PayloadAction<string>) => {
      state.recipes.byId[state.currentRecipeId].name = payload;
    },
    targetWeightChanged: (state, { payload }: PayloadAction<WeightTarget>) => {
      state.weightTarget = { ...payload };
      state.weightTarget.weight = round(state.weightTarget.weight);
    },
    ingredientAdded: makeAddIngredient('others'),
    ingredientRemoved: makeRemoveIngredient('others'),
    ingredientEdited: makeEditIngredient('others'),
    ingredientReordered: makeReorderIngredient('others'),
    flourAdded: makeAddIngredient('flours'),
    flourRemoved: makeRemoveIngredient('flours'),
    flourEdited: makeEditIngredient('flours'),
    flourReordered: makeReorderIngredient('flours'),
    recipeSelected: (state, { payload }: PayloadAction<string>) => {
      state.currentRecipeId = payload;
    },
    recipeAdded: (state) => {
      const recipe = createDefaultRecipe();
      state.recipes.byId[recipe.id] = recipe;
      state.recipes.allIds.push(recipe.id);
      state.currentRecipeId = recipe.id;
    },
    recipeDeleted: (state, { payload }: PayloadAction<string>) => {
      delete state.recipes.byId[payload];
      if (state.currentRecipeId === payload) {
        state.currentRecipeId = Object.keys(state.recipes)[0];
      }
    },
  },
});

function makeAddIngredient(scope: 'flours' | 'others') {
  return function addIngredient(state: WritableDraft<EditorState>) {
    const list = state.recipes.byId[state.currentRecipeId].ingredients[scope];
    const ingredient = createIngredient();
    list.byId[ingredient.id] = ingredient;
    list.allIds.push(ingredient.id);
  };
}

function makeRemoveIngredient(scope: 'flours' | 'others') {
  return function removeIngredient(
    state: WritableDraft<EditorState>,
    action: PayloadAction<string>
  ) {
    const list = state.recipes.byId[state.currentRecipeId].ingredients[scope];
    list.allIds = list.allIds.filter((id) => id !== action.payload);
    delete list.byId[action.payload];
  };
}

function makeEditIngredient(scope: 'flours' | 'others') {
  return function editIngredient(
    state: WritableDraft<EditorState>,
    action: PayloadAction<{ id: string; name?: string; measure?: number }>
  ) {
    const modifiedPayload = {};
    Object.assign(
      modifiedPayload,
      action.payload,
      action.payload.measure ? { measure: round(action.payload.measure) } : {}
    );

    const ingredient =
      state.recipes.byId[state.currentRecipeId].ingredients[scope].byId[
        action.payload.id
      ];
    Object.assign(ingredient, modifiedPayload);
  };
}

function makeReorderIngredient(scope: 'flours' | 'others') {
  return function reorderIngredient(
    state: WritableDraft<EditorState>,
    action: PayloadAction<{ oldPosition: number; newPosition: number }>
  ) {
    const list = state.recipes.byId[state.currentRecipeId].ingredients[scope];
    const id = list.allIds[action.payload.oldPosition];
    list.allIds.splice(action.payload.oldPosition, 1);
    list.allIds.splice(action.payload.newPosition, 0, id);
  };
}

export const selectEditor = (state: RootState) => state.editor;

export const selectRecipes = createSelector(
  selectEditor,
  (editor) => editor.recipes.byId
);

export const selectRecipeIds = createSelector(selectEditor, (editor) =>
  Object.keys(editor.recipes.byId)
);

export const selectRecipeList = createSelector(selectEditor, (editor) =>
  editor.recipes.allIds.map((id) => editor.recipes.byId[id])
);

export const selectCurrentRecipeId = createSelector(
  selectEditor,
  (editor) => editor.currentRecipeId
);

export const selectCurrentRecipe = createSelector(
  [selectRecipes, selectCurrentRecipeId],
  (recipes, currentId) => recipes[currentId]
);

export const selectIngredients = createSelector(
  selectCurrentRecipe,
  (recipe) => recipe.ingredients
);

export const selectFlours = createSelector(
  selectIngredients,
  (ingredients) => ingredients.flours
);

export const selectOtherIngredients = createSelector(
  selectIngredients,
  (ingredients) => ingredients.others
);

export const selectFlourList = createSelector(selectFlours, (flours) =>
  flours.allIds.map((id) => flours.byId[id])
);

export const selectTotalFlourParts = createSelector(selectFlourList, (list) =>
  list.reduce<number>((acc, ingredient) => acc + ingredient.measure, 0)
);

export const selectOtherIngredientList = createSelector(
  selectOtherIngredients,
  (others) => others.allIds.map((id) => others.byId[id])
);

export const selectTotalPercentage = createSelector(
  selectOtherIngredientList,
  (list) =>
    list.reduce<number>((acc, ingredient) => acc + ingredient.measure, 0) + 100
);

const selectWeightTarget = createSelector(
  selectEditor,
  (editor) => editor.weightTarget
);

export const selectFlourWeight = createSelector(
  [selectWeightTarget, selectTotalPercentage],
  (weightTarget, totalPercentage) => {
    if (weightTarget.type === 'flour') {
      return weightTarget.weight;
    }

    // convert dough weight to flour weight
    return round((weightTarget.weight * 100) / totalPercentage);
  }
);

export const selectTotalWeight = createSelector(
  [selectWeightTarget, selectTotalPercentage],
  (weightTarget, totalPercentage) => {
    if (weightTarget.type === 'dough') {
      return weightTarget.weight;
    }

    return round((totalPercentage * weightTarget.weight) / 100);
  }
);

export const selectFlourById = (id: string) =>
  createSelector(selectFlours, (flours) => flours.byId[id]);

export const selectOtherIngredientById = (id: string) =>
  createSelector(selectOtherIngredients, (others) => others.byId[id]);

export const {
  nameEdited,
  targetWeightChanged,
  ingredientAdded,
  ingredientRemoved,
  ingredientEdited,
  ingredientReordered,
  flourAdded,
  flourRemoved,
  flourEdited,
  flourReordered,
  recipeSelected,
  recipeAdded,
  recipeDeleted,
} = editorSlice.actions;
export default editorSlice.reducer;
