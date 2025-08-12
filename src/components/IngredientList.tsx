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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Measurement from './Measurement';
import TransitionGroup from 'react-transition-group/TransitionGroup';

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
    <Stack width="100%" spacing={0}>
      <TransitionGroup component={null}>
        {ingredients.map((ingredient) => (
          <Collapse key={ingredient.id}>
            <Stack
              spacing={2}
              direction="row"
              alignItems="flex-end"
              sx={{
                mb: 2,
              }}
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
                <IconButton
                  aria-label="Delete"
                  onClick={() => {
                    const remove =
                      category === 'flours' ? flourRemoved : ingredientRemoved;
                    dispatch(remove(ingredient.id));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
          </Collapse>
        ))}
      </TransitionGroup>
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
