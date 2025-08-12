import { Paper, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../state/hooks';
import { selectCurrentRecipe } from '../state/editorSlice';
import IngredientList from './IngredientList';

export default function RecipeEditorPane() {
  const recipe = useAppSelector(selectCurrentRecipe);

  return (
    <Paper sx={{ p: 8 }}>
      <Stack spacing={4}>
        <Typography variant="h2">{recipe.name || 'Unnamed Recipe'}</Typography>
        <Typography variant="h3">Flour</Typography>
        <IngredientList category="flours" />
        <Typography variant="h3">Other Ingredients</Typography>
        <IngredientList category="others" />
      </Stack>
    </Paper>
  );
}
