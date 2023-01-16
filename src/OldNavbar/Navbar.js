import menuItems from '../menu-items';
import NavGroup from './NavGroup';
import Log from '../utils/Log';

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
    <div>
      <Log value={menuItems}/>
    </div>
  );
}

export default Navbar;
