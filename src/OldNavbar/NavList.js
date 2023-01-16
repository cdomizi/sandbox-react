import NavItem from "./NavItem";

function NavList(props) {
  const listItems = props.items.map(item =>
    <NavItem
      key={item.id}
      title={item.title}
      icon={item.icon}
      url={item.url}
    />
  );
  return (
    <ul>
      {listItems}
    </ul>
  )
}

export default NavList;
