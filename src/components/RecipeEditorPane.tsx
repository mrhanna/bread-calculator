import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { selectCurrentRecipe } from '../state/editorSlice';
import IngredientPicker from './IngredientPicker';

export default function RecipeEditorPane() {
  const recipe = useAppSelector(selectCurrentRecipe);
  const dispatch = useAppDispatch();

  return (
    <Paper sx={{ p: 8 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h2">
            {recipe.name || 'Unnamed Recipe'}
          </Typography>
        </Box>
        {recipe.ingredients.map((ingredient) => (
          <IngredientPicker key={ingredient.id} ingredient={ingredient} />
        ))}
      </Stack>
    </Paper>
  );
}
