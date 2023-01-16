import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// project import
import NavGroup from './NavGroup';

function Navbar() {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div">
          MyDashboard
        </Typography>
      </Toolbar>
      <NavGroup />
    </div>
  );
}

export default Navbar;
