import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  BarChart, QueryStats, Storage, ViewKanban, Chat, CalendarMonth, Headphones
} from '@mui/icons-material';

function NavItem(props) {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon>
          {React.createElement(props.icon)}
        </ListItemIcon>
        <ListItemText primary={props.title} />
      </ListItemButton>
    </ListItem>
  );
}

export default NavItem;
