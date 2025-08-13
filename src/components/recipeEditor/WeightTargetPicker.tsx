import { Stack, Typography } from '@mui/material';
import NumberTextField from './NumberTextField';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  selectFlourWeight,
  selectTotalWeight,
  targetWeightChanged,
} from '../../state/editorSlice';

export function WeightTargetPicker() {
  const flourWeight = useAppSelector(selectFlourWeight);
  const doughWeight = useAppSelector(selectTotalWeight);
  const dispatch = useAppDispatch();

  return (
    <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
      <NumberTextField
        value={flourWeight}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(
            targetWeightChanged({ weight: +e.target.value, type: 'flour' })
          );
        }}
        variant="standard"
        label={`Total flour weight`}
        slotProps={{
          input: {
            endAdornment: <Typography color="#999">g</Typography>,
          },
        }}
      />
      <NumberTextField
        value={doughWeight}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(
            targetWeightChanged({ weight: +e.target.value, type: 'dough' })
          );
        }}
        variant="standard"
        label={`Total dough weight`}
        slotProps={{
          input: {
            endAdornment: <Typography color="#999">g</Typography>,
          },
        }}
      />
    </Stack>
  );
}
