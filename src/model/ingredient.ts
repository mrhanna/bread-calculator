export interface RecipeIngredient {
  name: string;
  percentage: number;
}

export const createIngredient = () => ({
  name: '',
  percentage: 0,
});
