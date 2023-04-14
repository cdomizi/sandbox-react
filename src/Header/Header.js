import { useContext } from "react";
import { drawerContext } from "../Context/Contexts";

// mui import
import { Toolbar, AppBar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const handleDrawerToggle = () => {
  console.log("drawer open");
};

function Header() {
  const drawer = useContext(drawerContext);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawer.width}px)` },
        ml: { sm: `${drawer.width}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
