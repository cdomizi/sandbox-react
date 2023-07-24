import Form from "./components/Form";
import ProductFetch from "./components/ProductFetch"

import { Divider, Stack } from "@mui/material";

const App = () => {

  return (
    <Stack spacing={4} m={4} className="App">
      <Form/>
      <Divider/>
      <ProductFetch/>
    </Stack>
  );
}

export default App;
