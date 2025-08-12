import Autocomplete from '@mui/material/Autocomplete';
import Stack, { type StackProps } from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '../state/hooks';

import ingredients from '../assets/ingredients.json';
import { useCallback } from 'react';
import {
  flourEdited,
  ingredientEdited,
  selectFlourById,
  selectOtherIngredientById,
} from '../state/editorSlice';
import type { RecipeIngredientCategory } from '../model';
import NumberTextField from './NumberTextField';

const selectors = {
  flours: selectFlourById,
  others: selectOtherIngredientById,
};

const handlers = {
  flours: flourEdited,
  others: ingredientEdited,
};

const labels = {
  flours: 'Flour',
  others: 'Ingredient',
};

export default function IngredientPicker({
  id,
  category,
  measureHidden = false,
  width,
}: {
  id: string;
  category: RecipeIngredientCategory;
  measureHidden?: boolean;
  width: StackProps['width'];
}) {
  const ingredient = useAppSelector(selectors[category](id));
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (change: { name?: string; measure?: number }) => {
      dispatch(handlers[category]({ id, ...change }));
    },
    [dispatch, category, id]
  );

  return (
    <Stack direction="row" spacing={2} width={width} alignItems="flex-end">
      <Autocomplete
        fullWidth
        options={ingredients[category]}
        value={ingredient.name}
        onChange={(_event, value) => handleChange({ name: value ?? '' })}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} variant="standard" label={labels[category]} />
        )}
      />

      {!measureHidden && (
        <NumberTextField
          variant="standard"
          value={ingredient.measure}
          sx={{ width: 150 }}
          slotProps={{
            input: {
              endAdornment: (
                <span
                  style={{
                    color: '#999',
                    marginLeft: 8,
                  }}
                >
                  {category === 'flours' ? 'parts' : '%'}
                </span>
              ),
            },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange({ measure: +e.target.value })
          }
        />
      )}
    </Stack>
  );
}
