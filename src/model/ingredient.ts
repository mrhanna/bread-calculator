import { nanoid } from 'nanoid';

export interface Ingredient {
  id: string;
  name: string;
  measure: number;
}

export const createIngredient = (name = '', measure = 0): Ingredient => ({
  id: nanoid(5),
  name,
  measure,
});
