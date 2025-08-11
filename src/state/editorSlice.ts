import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  createDefaultRecipe,
  createIngredient,
  type Ingredient,
  type Recipe,
} from '../model';
import type { RootState } from './store';
import type { WritableDraft } from 'immer';

export interface EditorState {
  recipes: Record<string, Recipe>;
  currentRecipeId: string;
}

const initializeState = () => {
  const recipe = createDefaultRecipe();
  return {
    recipes: {
      [recipe.id]: recipe,
    },
    currentRecipeId: recipe.id,
  };
};

const editorSlice = createSlice({
  name: 'recipe',
  initialState: initializeState,
  reducers: {
    nameEdited: (state, { payload }: PayloadAction<string>) => {
      state.recipes[state.currentRecipeId].name = payload;
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
      state.recipes[recipe.id] = recipe;
      state.currentRecipeId = recipe.id;
    },
    recipeDeleted: (state, { payload }: PayloadAction<string>) => {
      delete state.recipes[payload];
      if (state.currentRecipeId === payload) {
        state.currentRecipeId = Object.keys(state.recipes)[0];
      }
    },
  },
});

function makeAddIngredient(scope: 'flours' | 'others') {
  return function addIngredient(state: WritableDraft<EditorState>) {
    state.recipes[state.currentRecipeId].ingredients[scope].push(
      createIngredient()
    );
  };
}

function makeRemoveIngredient(scope: 'flours' | 'others') {
  return function removeIngredient(
    state: WritableDraft<EditorState>,
    action: PayloadAction<string>
  ) {
    state.recipes[state.currentRecipeId].ingredients[scope] = state.recipes[
      state.currentRecipeId
    ].ingredients[scope].filter(
      (ingredient: Ingredient) => ingredient.id !== action.payload
    );
  };
}

function makeEditIngredient(scope: 'flours' | 'others') {
  return function editIngredient(
    state: WritableDraft<EditorState>,
    action: PayloadAction<{ id: string; name?: string; measure?: number }>
  ) {
    state.recipes[state.currentRecipeId].ingredients[scope] = state.recipes[
      state.currentRecipeId
    ].ingredients[scope].map((ingredient: Ingredient) =>
      ingredient.id === action.payload.id
        ? { ...ingredient, ...action.payload }
        : ingredient
    );
  };
}

function makeReorderIngredient(scope: 'flours' | 'others') {
  return function reorderIngredient(
    state: WritableDraft<EditorState>,
    action: PayloadAction<{ oldPosition: number; newPosition: number }>
  ) {
    const ingredient =
      state.recipes[state.currentRecipeId].ingredients[scope][
        action.payload.oldPosition
      ];
    state.recipes[state.currentRecipeId].ingredients[scope].splice(
      action.payload.oldPosition,
      1
    );
    state.recipes[state.currentRecipeId].ingredients[scope].splice(
      action.payload.newPosition,
      0,
      ingredient
    );
  };
}

export const selectCurrentRecipe = (state: RootState) =>
  state.editor.recipes[state.editor.currentRecipeId];

export const {
  nameEdited,
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
