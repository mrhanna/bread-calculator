import { Autocomplete, Grid, Stack, TextField } from '@mui/material';
import { useAppDispatch } from '../state/hooks';

import ingredients from '../assets/ingredients.json';
import type { Ingredient } from '../model';
import { useCallback } from 'react';
import { flourEdited, ingredientEdited } from '../state/editorSlice';

export default function IngredientPicker({
  ingredient,
  scope = 'others',
  hidePercentage = false,
}: {
  ingredient: Ingredient;
  scope?: 'flours' | 'others';
  hidePercentage?: boolean;
}) {
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (change: { name?: string; measure?: number }) => {
      const action = scope === 'flours' ? flourEdited : ingredientEdited;
      dispatch(action({ id: ingredient.id, ...change }));
    },
    [dispatch, scope, ingredient.id]
  );

  return (
    <>
      <Grid size={hidePercentage ? 12 : 8}>
        <Autocomplete
          options={ingredients[scope]}
          value={ingredient.name}
          onChange={(_event, value) => handleChange({ name: value ?? '' })}
          freeSolo
          renderInput={(params) => <TextField {...params} label="Ingredient" />}
        />
      </Grid>

      {!hidePercentage && (
        <Grid size={4}>
          <TextField
            fullWidth
            type="number"
            value={ingredient.measure}
            slotProps={{
              input: {
                endAdornment: (
                  <span
                    style={{
                      color: '#999',
                      marginLeft: 8,
                    }}
                  >
                    {scope === 'flours' ? 'parts' : '%'}
                  </span>
                ),
              },
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange({ measure: +e.target.value })
            }
          />
        </Grid>
      )}
    </>
  );
}
