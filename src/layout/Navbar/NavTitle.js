function NavTitle(props) {
  return <h3>
    {props.name[0].toUpperCase() + props.name.slice(1)}
  </h3>
}

export default NavTitle;
