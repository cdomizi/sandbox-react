import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// project import
import NavList from './NavList';
import NavTitle from './NavTitle';

function NavGroup(props) {

  return (
    <Box>
      <Divider/>
      <NavTitle name={props.id}></NavTitle>
      <NavList
        key={props.id}
        items={props.children}
      />
    </Box>
  );
}

export default NavGroup;
