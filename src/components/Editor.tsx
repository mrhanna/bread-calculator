import Box from '@mui/material/Box';
import RecipeEditorPane from './recipeEditor/RecipeEditorPane';
import Drawer from '@mui/material/Drawer';
import RecipeListPanel from './recipeListPanel/RecipeListPanel';

export default function Editor() {
  return (
    <Box sx={{ display: 'flex', flex: 'row', flexShrink: 0 }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <RecipeListPanel />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <RecipeEditorPane />
      </Box>
    </Box>
  );
}
