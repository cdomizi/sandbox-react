import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

//projects imports
import Header from './Header/Header';
import ResponsiveDrawer from './Navbar/ResponsiveDrawer';
import MainLayout from './MainLayout/MainLayout';

function App() {
  return (
    <div className="App">
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <ResponsiveDrawer />
      <MainLayout />
    </Box>
    </div>
  );
}

export default App;
