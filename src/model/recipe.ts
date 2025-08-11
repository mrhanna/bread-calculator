import { createIngredient, type Ingredient } from './ingredient';

export interface Recipe {
  id: string;
  name: string;
  ingredients: {
    flours: Ingredient[];
    others: Ingredient[];
  };
}

export function createDefaultRecipe(): Recipe {
  return {
    id: crypto.randomUUID(),
    name: '',
    ingredients: {
      flours: [createIngredient('bread flour', 100)],
      others: [
        createIngredient('water', 70),
        createIngredient('salt', 2),
        createIngredient('instant yeast', 1),
      ],
    },
  };
}
