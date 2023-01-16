import List from '@mui/material/List';

// project import
import NavItem from './NavItem';

function NavList(props) {
  const listItems = props.items.map(item =>
    <NavItem
      key={item.id}
      title={item.title}
      icon={item.icon}
      url={item.url}
      disablePadding
    />
  );

  return (
    <List>
      {listItems}
    </List>
  );
}

export default NavList;
