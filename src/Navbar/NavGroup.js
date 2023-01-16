import Box from '@mui/material/Box';

// project import
import NavList from './NavList';

function NavGroup(props) {
  const items1 = ['Inbox', 'Starred', 'Send email', 'Drafts'];
  const items2 = ['All mail', 'Trash', 'Spam'];

  return (
    <Box>
      <NavList items={items1}/>
      <NavList items={items2}/>
    </Box>
  );
}

export default NavGroup;
