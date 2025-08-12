import { Box, Paper, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { nameEdited, selectCurrentRecipe } from '../state/editorSlice';
import IngredientList from './IngredientList';
import { WeightTargetPicker } from './WeightTargetPicker';
import { visuallyHidden } from '@mui/utils';
import EditableTypography from './EditableTypography';

export default function RecipeEditorPane() {
  const recipe = useAppSelector(selectCurrentRecipe);
  const dispatch = useAppDispatch();

  return (
    <Paper sx={{ p: 8, width: 550 }}>
      <EditableTypography
        variant="h2"
        fontSize="3rem"
        label="Recipe Name"
        value={recipe.name}
        defaultValue="Unnamed Recipe"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(nameEdited(e.target.value));
        }}
      />
      <Stack spacing={2}>
        <WeightTargetPicker />
        <Box>
          <Typography sx={visuallyHidden} variant="h3">
            Flour
          </Typography>
          <IngredientList category="flours" />
        </Box>
        <Typography sx={visuallyHidden} variant="h3">
          Other Ingredients
        </Typography>
        <IngredientList category="others" />
      </Stack>
    </Paper>
  );
}
