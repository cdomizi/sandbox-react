import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function NavItem(props) {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          {`icon`}
        </ListItemIcon>
        <ListItemText primary={props.title} />
      </ListItemButton>
    </ListItem>
  );
}

export default NavItem;
