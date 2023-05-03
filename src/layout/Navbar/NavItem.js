import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function NavItem(props) {
  const Icon = props.icon;
  const itemIcon = props.icon ? <Icon /> : false;
  
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          {itemIcon}
        </ListItemIcon>
        <ListItemText primary={props.title} />
      </ListItemButton>
    </ListItem>
  );
}

export default NavItem;
