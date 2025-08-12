import { createIngredient, type Ingredient } from './ingredient';
import { type Normalized, toNormalized } from '../utils/normalize';

export interface Recipe {
  id: string;
  name: string;
  ingredients: {
    flours: Normalized<Ingredient>;
    others: Normalized<Ingredient>;
  };
}

export type RecipeIngredientCategory = keyof Recipe['ingredients'];

export function createDefaultRecipe(): Recipe {
  return {
    id: crypto.randomUUID(),
    name: '',
    ingredients: {
      flours: toNormalized([createIngredient('bread flour', 1)]),
      others: toNormalized([
        createIngredient('water', 70),
        createIngredient('salt', 2),
        createIngredient('instant yeast', 1),
      ]),
    },
  };
}
