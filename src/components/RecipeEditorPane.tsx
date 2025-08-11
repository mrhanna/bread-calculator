import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { selectCurrentRecipe } from '../state/editorSlice';
import IngredientPicker from './IngredientPicker';

export default function RecipeEditorPane() {
  const recipe = useAppSelector(selectCurrentRecipe);
  const dispatch = useAppDispatch();

  return (
    <Paper sx={{ p: 8, width: 500 }}>
      <Stack spacing={4}>
        <Typography variant="h2">{recipe.name || 'Unnamed Recipe'}</Typography>

        <Typography variant="h3">Flour</Typography>
        <Grid container spacing={4}>
          {recipe.ingredients.flours.map((ingredient) => (
            <IngredientPicker
              scope="flours"
              key={ingredient.id}
              ingredient={ingredient}
            />
          ))}
        </Grid>
        <Grid container spacing={4}>
          <Typography variant="h3">Other Ingredients</Typography>
          {recipe.ingredients.others.map((ingredient) => (
            <IngredientPicker key={ingredient.id} ingredient={ingredient} />
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
}
