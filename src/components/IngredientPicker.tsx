import { Autocomplete, Grid, Stack, TextField } from '@mui/material';
import { useAppDispatch } from '../state/hooks';

import ingredients from '../assets/ingredients.json';
import type { Ingredient } from '../model';
import { useCallback } from 'react';
import { ingredientEdited } from '../state/editorSlice';

export default function IngredientPicker({
  ingredient,
}: {
  ingredient: Ingredient;
}) {
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (change: { name?: string; percentage?: number }) => {
      dispatch(ingredientEdited({ id: ingredient.id, ...change }));
    },
    [dispatch, ingredient.id]
  );

  return (
    <Stack direction="row" spacing={2}>
      <Autocomplete
        sx={{ width: 300 }}
        options={ingredients}
        value={ingredient.name}
        onChange={(_event, value) => handleChange({ name: value ?? '' })}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Ingredient" />}
      />
      <TextField
        type="number"
        value={ingredient.percentage}
        sx={{ width: 120 }}
        slotProps={{
          input: {
            endAdornment: (
              <span
                style={{
                  color: '#999',
                  fontWeight: 'bold',
                  fontSize: 24,
                  marginLeft: 8,
                }}
              >
                %
              </span>
            ),
          },
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange({ percentage: +e.target.value })
        }
      />
    </Stack>
  );
}
