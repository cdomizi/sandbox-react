import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const CartForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful, errors },
    reset,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cart",
    rules: {
      required: "Please, add at least one item",
    },
  });

  const onSubmit = (formData) => {
    // Process form data for submit
    const submitData = {
      cart: formData.cart?.map((product) => ({
        id: parseInt(product.product.id, 10),
        quantity: parseInt(product.quantity, 10),
      })),
    };

    console.log(submitData);
  };

  // Reset the form on submit
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      remove();
    }
  }, [isSubmitSuccessful, fields, remove, reset]);

  // Log form fields values
  const formValues = watch();
  const FormValues = () => {
    return (
      <pre>
        <code>{JSON.stringify(formValues, null, 2)}</code>
      </pre>
    );
  };

  return (
    <Stack onSubmit={handleSubmit(onSubmit)} component="form" spacing={3}>
      <Typography variant="h3">Cart</Typography>
      {fields.map((item, index) => (
        <Stack key={item.id} direction="row" spacing={1}>
          <Controller
            control={control}
            name={`cart.${index}.product`}
            render={({ field }) => (
              <TextField
                {...field}
                {...register(`cart.${index}.product`, {
                  required: "This field is required.",
                })}
                id="product"
                label="Product"
                error={!!errors.cart?.[index]?.product}
                helperText={
                  errors.cart?.[index]?.product &&
                  errors.cart?.[index]?.product.message
                }
              />
            )}
          />
          <Controller
            control={control}
            name={`cart.${index}.quantity`}
            render={({ field }) => (
              <TextField
                {...field}
                {...register(`cart.${index}.quantity`, {
                  min: {
                    value: 1,
                    valueAsNumber: true,
                    message: <>Please, Add at least one product</>,
                  },
                })}
                id="quantity"
                label="Quantity"
                type="number"
                error={!!errors.quantity}
                helperText={errors.quantity && errors.quantity.message}
                InputProps={{ inputProps: { min: 1 } }}
                sx={{ maxWidth: "5rem" }}
              />
            )}
          />
          <IconButton onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Typography color="error.main">{errors.cart?.root?.message}</Typography>
      <Button
        type="button"
        variant="outlined"
        size="small"
        onClick={() => append({ product: "", quantity: 1 })}
      >
        Add Product
      </Button>
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <FormValues />
    </Stack>
  );
};

export default CartForm;
