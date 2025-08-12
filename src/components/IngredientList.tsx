import Stack from '@mui/material/Stack';
import type { RecipeIngredientCategory } from '../model';
import IngredientPicker from './IngredientPicker';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import {
  flourAdded,
  flourRemoved,
  ingredientAdded,
  ingredientRemoved,
  selectFlourList,
  selectOtherIngredientList,
} from '../state/editorSlice';
import { Box, Button } from '@mui/material';
import Measurement from './Measurement';

const selectors = {
  flours: selectFlourList,
  others: selectOtherIngredientList,
};

export default function IngredientList({
  category,
}: {
  category: RecipeIngredientCategory;
}) {
  const ingredients = useAppSelector(selectors[category]);
  const dispatch = useAppDispatch();

  return (
    <Stack width="100%" spacing={2}>
      {ingredients.map((ingredient) => (
        <Stack
          key={ingredient.id}
          spacing={2}
          direction="row"
          alignItems="flex-end"
        >
          <IngredientPicker
            width={400}
            category={category}
            id={ingredient.id}
            measureHidden={ingredients.length === 1}
          />

          <Box sx={{ flexGrow: 1, py: 0.5 }}>
            <Measurement category={category} measure={ingredient.measure} />
          </Box>

          {ingredients.length > 1 && (
            <IconButton aria-label="Delete">
              <DeleteIcon
                onClick={() => {
                  const remove =
                    category === 'flours' ? flourRemoved : ingredientRemoved;
                  dispatch(remove(ingredient.id));
                }}
              />
            </IconButton>
          )}
        </Stack>
      ))}
      <Box display="flex" justifyContent="flex-end" width={400}>
        <Button
          onClick={() => {
            const add = category === 'flours' ? flourAdded : ingredientAdded;
            dispatch(add());
          }}
          startIcon={<AddIcon />}
        >
          Add {category === 'flours' ? 'Flour' : 'Ingredient'}
        </Button>
      </Box>
    </Stack>
  );
}
