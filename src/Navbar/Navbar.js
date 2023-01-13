import menuItems from '../menu-items';

function Log({ value, replacer=null, space=2 }) {
  return (
    <pre>
      <code>
        {JSON.stringify(value, replacer, space)}
      </code>
    </pre>
  );
}

function Item(props) {
  return (
    <li>
      <span>{props.title}</span>
    </li>
  )
}

function List(props) {
  const listItems = props.items.map(item =>
    <Item
      id={item.id}
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

function Group(props) {
  return (
    <div>
      <h3>{props.id}</h3>
      <List items={props.children}/>
    </div>
  );
}

function Navbar() {
  console.clear();
  const navGroups = menuItems.map(menuItem => {
    return (
    <Group
      id={menuItem.id}
      children={menuItem.children}
    />
    )
  });
  return (
    <div>
      {navGroups}
      <Log value={menuItems}/>
    </div>
  );
}

export default Navbar;
