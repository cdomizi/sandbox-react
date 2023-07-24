import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// Project import
import useFetch from "../hooks/useFetch";
import Log from "./Log";
import CustomSnackbar from "./CustomSnackbar";

// MUI components
import {
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";

// MUI icons
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const Form = () => {
  // Set snackbar state
  const [open, setOpen] = useState(false);

  // Get random product data
  const randomId = useMemo(() => Math.ceil(Math.random() * 100), []);
  const { loading, data } = useFetch(
    `https://dummyjson.com/products/${randomId}`
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
    watch,
  } = useForm({
    // Populate form fields with random product data
    defaultValues: {
      id: data?.id,
      title: data?.title,
      brand: data?.brand,
      price: data?.price,
    },
  });

  const editProduct = useCallback(async (formData) => {
    const { id, title, brand, price } = formData;
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, brand, price }),
      });
      return response.json();
    } catch (err) {
      return err?.message || `Unexpected error while editing product ${id}`;
    }
  }, []);

  const deleteProduct = useCallback(async (formData) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${formData.id}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    } catch (err) {
      return (
        err?.message || `Unexpected error while editing product ${formData.id}`
      );
    }
  }, []);

  const onSubmit = useCallback(
    async (formData, event) => {
      const json = await (event.nativeEvent.submitter.id === "editButton"
        ? editProduct(formData)
        : deleteProduct(formData));
      console.log(json);
    },
    [deleteProduct, editProduct]
  );

  // Reset form fields on submit
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setOpen(true);
    }
  }, [isSubmitSuccessful, reset]);

  const loadingForm = useMemo(
    () =>
      ["ID", "Title", "Brand", "Price"].map((field) => (
        <TextField
          key={field}
          label={field}
          margin="normal"
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CircularProgress color="inherit" size={20} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
        />
      )),
    []
  );

  const formFields = useMemo(
    () => (
      <>
        <Controller
          control={control}
          name="id"
          defaultValue={data?.id}
          render={({ field }) => (
            <TextField
              {...field}
              label="ID"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          control={control}
          name="title"
          defaultValue={data?.title}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          control={control}
          name="brand"
          defaultValue={data?.brand}
          render={({ field }) => (
            <TextField
              {...field}
              label="Brand"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          defaultValue={data?.price}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </>
    ),
    [control, data?.brand, data?.id, data?.price, data?.title]
  );

  const SubmitButton = ({ name }) => (
    <Button
      type="submit"
      id={`${name}Button`}
      variant="outlined"
      size="large"
      fullWidth
      endIcon={
        loading ? (
          <CircularProgress color="inherit" size={20} />
        ) : name === "edit" ? (
          <EditIcon />
        ) : (
          <DeleteIcon />
        )
      }
      disabled={loading}
      color={name === "edit" ? "primary" : "error"}
      sx={{
        "&, & .MuiButtonBase-root": { alignItems: "normal" },
      }}
    >
      {name}
    </Button>
  );

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      width={"24rem"}
      spacing={2}
    >
      {loading ? loadingForm : formFields}
      <Stack direction="row" spacing={2}>
        <SubmitButton name="edit" />
        <SubmitButton name="delete" />
      </Stack>
      <Log value={watch()} />
      <CustomSnackbar
        open={open}
        message="Note archived"
        onClose={() => setOpen(false)}
        success={true}
      />
    </Stack>
  );
};

export default Form;
