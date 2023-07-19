import { useCallback } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Delete as DeleteIcon } from "@mui/icons-material";

export default function App() {
  // Fetch product data
  const {
    loading: productsLoading,
    error: productsError,
    data: products,
  } = useFetch("https://dummyjson.com/products");

  const { register, control, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: { products: [{ product: "", quantity: 1 }], invoice: false },
  });

  // Products array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = useCallback(
    (formData) => {
      // Process form data for submit
      const submitData = {
        products: formData.products?.map((product) => ({
          id: parseInt(product.product.id, 10),
          quantity: parseInt(product.quantity, 10),
        })),
      };

      console.log(submitData);
      // Reset form and remove all product fields on submit
      reset();
      remove();
    },
    [remove, reset]
  );

  return (
    <Box className="App" mx={3} sx={{ width: "24rem" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack id="products" mt={2}>
          <Typography variant="h4" mb={2}>
            Array Form
          </Typography>
          {fields?.map((item, index) => (
            <Stack key={item.id} direction="row" spacing={2} useFlexGap>
              <Controller
                control={control}
                name={`products.${index}.product`}
                render={({ field }) => (
                  <Autocomplete
                    {...register(`products.${index}.product`)}
                    id={`products.${index}.product`}
                    value={field.value || null}
                    onChange={(event, value) => {
                      field.onChange(value);
                    }}
                    options={products?.products ?? []}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(product) =>
                      `${product?.id && "#" + product.id} ${product?.title}`
                    }
                    noOptionsText={"No products"}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id={`products.${index}.product-input`}
                        label={`Product #${index + 1}`}
                        error={
                          !!(formState.errors["products"] || productsError)
                        }
                        helperText={
                          (formState.errors["products"] &&
                            formState.errors["products"]?.message) ||
                          productsError?.message
                        }
                        InputLabelProps={{ shrink: true }}
                        disabled={
                          formState.isLoading ||
                          formState.isSubmitting ||
                          productsLoading
                        }
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {formState.isLoading ||
                              formState.isSubmitting ||
                              productsLoading ? (
                                <InputAdornment position="end">
                                  <CircularProgress color="inherit" size={20} />
                                </InputAdornment>
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                        margin="normal"
                        sx={{ width: "16rem" }}
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name={`products.${index}.quantity`}
                render={({ params }) => (
                  <FormControl margin="normal">
                    <TextField
                      {...params}
                      {...register(`products.${index}.quantity`)}
                      id={`products.${index}.quantity`}
                      label={`Qty. #${index + 1}`}
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: "4rem" }}
                    />
                  </FormControl>
                )}
              />
              <IconButton onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={() => append({ product: "", quantity: 1 })}
            sx={{ mt: 1 }}
          >
            Add Product
          </Button>
        </Stack>
        <FormControlLabel
          label="Generate invoice"
          sx={{ width: "100%", my: 1 }}
          control={
            <Controller
              control={control}
              id="invoice"
              name="invoice"
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onChange={field.onChange}
                />
              )}
            />
          }
        />
        <Button variant="contained" type="submit" mb={1} fullWidth>
          Submit
        </Button>
      </form>
      <pre id="form-values">
        <code>
          {JSON.stringify(
            Object.fromEntries(
              Object.entries(watch()).map(([key, val]) => [
                key,
                key === "products"
                  ? val.map((prod) => ({
                      ...prod,
                      product: {
                        id: prod.product.id,
                        title: prod.product.title,
                      },
                    }))
                  : val,
              ])
            ),
            null,
            2
          )}
        </code>
      </pre>
    </Box>
  );
}
