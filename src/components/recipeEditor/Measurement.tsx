import { Typography } from '@mui/material';
import {
  selectFlourWeight,
  selectTotalFlourParts,
} from '../../state/editorSlice';
import { useAppSelector } from '../../state/hooks';
import { round } from '../../utils/round';
import type { RecipeIngredientCategory } from '../../model';

function IngredientMeasurement({ percentage }: { percentage: number }) {
  const whole = useAppSelector(selectFlourWeight);

  return <Typography>{round((percentage * whole) / 100)}g</Typography>;
}

function FlourMeasurement({ parts }: { parts: number }) {
  const wholeWeight = useAppSelector(selectFlourWeight);
  const totalParts = useAppSelector(selectTotalFlourParts);

  return <Typography>{round((parts * wholeWeight) / totalParts)}g</Typography>;
}

export default function Measurement({
  measure,
  category,
}: {
  measure: number;
  category: RecipeIngredientCategory;
}) {
  switch (category) {
    case 'flours':
      return <FlourMeasurement parts={measure} />;
    case 'others':
      return <IngredientMeasurement percentage={measure} />;
  }
}
