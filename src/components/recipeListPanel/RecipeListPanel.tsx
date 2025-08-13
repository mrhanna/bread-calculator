import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useAppSelector } from '../../state/hooks';
import { selectRecipeList } from '../../state/editorSlice';
import ListItemButton from '@mui/material/ListItemButton';

export default function RecipeListPanel() {
  const recipes = useAppSelector(selectRecipeList);

  return (
    <List>
      {recipes.map((recipe) => (
        <ListItem>
          <ListItemButton>{recipe.name || 'Unnamed Recipe'}</ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
