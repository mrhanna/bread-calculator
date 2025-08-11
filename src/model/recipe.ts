import { type RecipeIngredient } from './ingredient';

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
}

export function createDefaultRecipe(): Recipe {
  return {
    id: crypto.randomUUID(),
    name: '',
    ingredients: [
      { name: 'bread flour', percentage: 100 },
      { name: 'water', percentage: 70 },
      { name: 'salt', percentage: 2 },
      { name: 'instant yeast', percentage: 1 },
    ],
  };
}
