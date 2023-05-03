import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

//projects import
import Header from "./layout/Header";
import ResponsiveDrawer from "./layout/Navbar/";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <ResponsiveDrawer />
        <MainLayout />
      </Box>
    </div>
  );
}

export default App;
