import { AppBar, Button, Toolbar } from "@mui/material";

const CustomAppBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary.contrastText",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "primary.contrastText",
              color: "primary.dark",
            },
            marginLeft: "auto",
          }}
        >
          Log In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
