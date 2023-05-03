import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// project import
import menuItems from '../menu-items';
import NavGroup from './NavGroup';

function Navbar() {
  const navGroups = menuItems.map(menuItem => {
    return (
    <NavGroup
      key={menuItem.id}
      id={menuItem.id}
      children={menuItem.children}
    />
    )
  });

  return (
    <Box>
      <Toolbar>
        <Typography variant="h6" component="div">
          MyDashboard
        </Typography>
      </Toolbar>
      {navGroups}
    </Box>
  );
}

export default Navbar;
