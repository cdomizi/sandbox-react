import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// project import
import Api from '../api/Api';

// duplicate code!!
const drawerWidth = 240;

function MainLayout() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      <Api />
    </Box>
  );
}

export default MainLayout;
