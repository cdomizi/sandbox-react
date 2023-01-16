function NavTitle(props) {
  const formatTitle = (title) => {
    return title[6].toUpperCase() + title.slice(7)
  };
  return <h3>{formatTitle(props.name)}</h3>
}

export default NavTitle;
