import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Typography,
  MenuItem,
  Button,
  Stack,
  TextField,
  FormControl,
} from "@mui/material";

const SelectHook = () => {
  const [products, setProducts] = useState(null);

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

  const { control, register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: { products: [] },
  });

  const onSubmit = (formData) => {
    console.log(formData.products);
  };

  // reset form fields on submit
  useEffect(() => {
    if (formState.isSubmitSuccessful) reset();
  }, [formState.isSubmitSuccessful, reset]);

  const selectedProducts = watch().products;

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      sx={{ maxWidth: 400 }}
    >
      <Typography variant="h3">Select Hook</Typography>
      <Controller
        control={control}
        name="products"
        render={({ field }) => (
          <FormControl>
            <TextField
              {...field}
              {...register("products", {
                required: "This field is required.",
              })}
              select
              multiple
              fullWidth
              label="Products"
              variant="outlined"
              size="small"
              margin="dense"
              SelectProps={{
                multiple: true,
              }}
              error={!!formState.errors.products}
              helperText={
                formState.errors.products && formState.errors.products.message
              }
            >
              {products?.length ? (
                products.map((product) => (
                  <MenuItem key={product.id} value={product.title}>
                    {product.title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value>No data.</MenuItem>
              )}
            </TextField>
          </FormControl>
        )}
      />
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

export default SelectHook;
