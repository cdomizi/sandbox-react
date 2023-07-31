import { SnackbarProvider } from "./contexts/SnackbarContext";
import { ProductProvider } from "./contexts/ProductContext";
import Form from "./components/Form";
import ProductFetch from "./components/ProductFetch";
import YupForm from "./components/YupForm";

import { Divider, Stack, useMediaQuery, useTheme } from "@mui/material";

const App = () => {
  const theme = useTheme();

  return (
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
      <YupForm/>
    </Stack>
  );
};

export default App;
