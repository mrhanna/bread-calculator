import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  createDefaultRecipe,
  createIngredient,
  type Ingredient,
  type Recipe,
} from '../model';
import type { RootState } from './store';

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
    ingredientAdded: (state) => {
      state.recipes[state.currentRecipeId].ingredients.push(createIngredient());
    },
    ingredientRemoved: (state, { payload }: PayloadAction<string>) => {
      state.recipes[state.currentRecipeId].ingredients = state.recipes[
        state.currentRecipeId
      ].ingredients.filter(
        (ingredient: Ingredient) => ingredient.id !== payload
      );
    },
    ingredientEdited: (
      state,
      {
        payload,
      }: PayloadAction<{ id: string; name?: string; percentage?: number }>
    ) => {
      state.recipes[state.currentRecipeId].ingredients = state.recipes[
        state.currentRecipeId
      ].ingredients.map((ingredient: Ingredient) =>
        ingredient.id === payload.id
          ? { ...ingredient, ...payload }
          : ingredient
      );
    },
    ingredientReordered: (
      state,
      { payload }: PayloadAction<{ oldPosition: number; newPosition: number }>
    ) => {
      const ingredient =
        state.recipes[state.currentRecipeId].ingredients[payload.oldPosition];
      state.recipes[state.currentRecipeId].ingredients.splice(
        payload.oldPosition,
        1
      );
      state.recipes[state.currentRecipeId].ingredients.splice(
        payload.newPosition,
        0,
        ingredient
      );
    },
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

export const selectCurrentRecipe = (state: RootState) =>
  state.editor.recipes[state.editor.currentRecipeId];

export const {
  nameEdited,
  ingredientAdded,
  ingredientRemoved,
  ingredientEdited,
  ingredientReordered,
  recipeSelected,
  recipeAdded,
  recipeDeleted,
} = editorSlice.actions;
export default editorSlice.reducer;
