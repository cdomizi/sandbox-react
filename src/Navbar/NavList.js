import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

// project import
import NavItem from './NavItem';

function NavList(props) {
  return (
    <Box>
      <Divider/>
      <List>
        {(props.items).map((text, index) => (
          <NavItem text={text} index={index}/>
        ))}
      </List>
    </Box>
  );
}

export default NavList;
