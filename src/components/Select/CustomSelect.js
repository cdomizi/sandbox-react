import { useEffect, useState } from "react";

import { Typography, TextField, MenuItem, Button, Stack } from "@mui/material";

const CustomSelect = () => {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");

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

    console.log(selectedProduct);

    // reset form fields on submit
    setSelectedProduct("");
  };

  const handleOnChange = (event) => {
    event.stopPropagation();
    setSelectedProduct(event.target.value);
  };

  return (
    <Stack
      component="form"
      onSubmit={(event) => handleSubmit(event)}
      spacing={3}
      sx={{ maxWidth: 400 }}
    >
      <Typography variant="h3">Select</Typography>
      <TextField
        select
        name="product"
        value={selectedProduct}
        onChange={handleOnChange}
        label="Product"
        margin="dense"
        size="small"
        sx={{ mb: 3 }}
        fullWidth
      >
        {(products &&
          products.map((product) => {
            return (
              <MenuItem key={product.id} value={product.title}>
                {product.title}
              </MenuItem>
            );
          })) ?? <MenuItem>No data.</MenuItem>}
      </TextField>
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <pre>
        <code>
          Selected Product:
          <br />
          {JSON.stringify(selectedProduct, null, 2)}
        </code>
      </pre>
    </Stack>
  );
};

export default CustomSelect;
