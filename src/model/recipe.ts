import { createIngredient, type Ingredient } from './ingredient';

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

export function createDefaultRecipe(): Recipe {
  return {
    id: crypto.randomUUID(),
    name: '',
    ingredients: [
      createIngredient('bread flour', 100),
      createIngredient('water', 70),
      createIngredient('salt', 2),
      createIngredient('instant yeast', 1),
    ],
  };
}
