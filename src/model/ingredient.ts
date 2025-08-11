import { nanoid } from 'nanoid';

export interface Ingredient {
  id: string;
  name: string;
  percentage: number;
}

export const createIngredient = (name = '', percentage = 0): Ingredient => ({
  id: nanoid(5),
  name,
  percentage,
});
