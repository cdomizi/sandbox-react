import NavTitle from './NavTitle';
import NavList from './NavList';

function NavGroup(props) {
  return (
    <div>
      <NavTitle name={props.id}></NavTitle>
      <NavList
        key={props.id}
        items={props.children}
      />
    </div>
  );
}

export default NavGroup;
