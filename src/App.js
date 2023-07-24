import { SnackbarProvider } from "./contexts/SnackbarContext";
import Form from "./components/Form";
import ProductFetch from "./components/ProductFetch";

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
        <Form />
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
    </Stack>
  );
};

export default App;
