import { SnackbarProvider } from "./contexts/SnackbarContext";
import { ProductProvider } from "./contexts/ProductContext";
import ProductFetch from "./components/ProductFetch";
import CustomAppBar from "./components/CustomAppBar";
import Form from "./components/Form";
import YupForm from "./components/YupForm";
import TestForm from "./components/TestForm";

import {
  Box,
  Divider,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const App = () => {
  const theme = useTheme();

  return (
    <Box>
      <CustomAppBar />
      <Toolbar />
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        m={4}
        className="App"
      >
        <SnackbarProvider>
          <ProductProvider>
            <Form />
          </ProductProvider>
        </SnackbarProvider>
        <Divider
          orientation={
            useMediaQuery(theme.breakpoints.down("md"))
              ? "horizontal"
              : "vertical"
          }
          flexItem
        />
        <ProductFetch />
        <Divider
          orientation={
            useMediaQuery(theme.breakpoints.down("md"))
              ? "horizontal"
              : "vertical"
          }
          flexItem
        />
        <YupForm />
        <Divider
          orientation={
            useMediaQuery(theme.breakpoints.down("md"))
              ? "horizontal"
              : "vertical"
          }
          flexItem
        />
        <TestForm/>
      </Stack>
    </Box>
  );
};

export default App;
