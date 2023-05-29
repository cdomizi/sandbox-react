import { useEffect, useState } from "react";

import {
  Typography,
  Select,
  MenuItem,
  Button,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const MultiSelect = () => {
  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch products on page load.
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://dummyjson.com/products?limit=4");
      if (response.ok) {
        const data = await response.json();
        setProducts(data?.products);
      }
    };

    getProducts();
  }, []);

  const handleSubmit = (event) => {
    // prevent redirecting, reloading
    event.preventDefault();

    console.log(selectedProducts);

    // reset form fields on submit
    setSelectedProducts([]);
  };

  const handleOnChange = (event) => {
    event.stopPropagation();
    setSelectedProducts(event.target.value);
  };

  return (
    <Stack
      component="form"
      onSubmit={(event) => handleSubmit(event)}
      spacing={3}
      sx={{ maxWidth: 400 }}
    >
      <Typography variant="h3">Multi-Select</Typography>
      <FormControl>
        <InputLabel id="myLabel" shrink={true}>
          Product
        </InputLabel>
        <Select
          multiple
          name="product"
          value={selectedProducts}
          onChange={handleOnChange}
          fullWidth
          input={
            <OutlinedInput
              label="Products"
              size="small"
              margin="dense"
              notched
            />
          }
        >
          {(products &&
            products.map((product) => {
              return (
                <MenuItem key={product.id} value={product.title}>
                  {product.title}
                </MenuItem>
              );
            })) ?? <MenuItem value>No data.</MenuItem>}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <pre>
        <code>
          Selected Product:
          <br />
          {JSON.stringify(selectedProducts, null, 2)}
        </code>
      </pre>
    </Stack>
  );
};

export default MultiSelect;
