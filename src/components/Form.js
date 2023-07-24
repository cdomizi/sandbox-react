import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

// Project import
import { SnackbarContext, SNACKBAR_ACTIONS } from "../contexts/SnackbarContext";
import useFetch from "../hooks/useFetch";
import Log from "./Log";

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

const SubmitButton = ({ name, loading }) => (
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

const Form = () => {
  // Dispatch function for snackbar component
  const dispatch = useContext(SnackbarContext);

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
      console.error(
        err?.message || `Unexpected error while editing product ${id}`
      );
      return null;
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
      console.error(
        err?.message || `Unexpected error while editing product ${formData.id}`
      );
      return null;
    }
  }, []);

  const onSubmit = useCallback(
    async (formData, event) => {
      // Check if edit or delete based on button `id` property
      const checkEdit = event.nativeEvent.submitter.id === "editButton";

      // Edit or delete the product accordingly
      const json = await (checkEdit
        ? editProduct(formData)
        : deleteProduct(formData));

      // Dispatch the appropriate action
      if (json) {
        checkEdit
          ? dispatch({ type: SNACKBAR_ACTIONS.EDIT, payload: json?.title })
          : dispatch({
              type: SNACKBAR_ACTIONS.EDIT_ERROR,
              payload: json?.title,
            });
        // Log response payload on success
        console.log(json);
      } else {
        checkEdit
          ? dispatch({ type: SNACKBAR_ACTIONS.DELETE })
          : dispatch({ type: SNACKBAR_ACTIONS.DELETE_ERROR });
      }
    },
    [deleteProduct, dispatch, editProduct]
  );

  // Reset form fields on submit
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [dispatch, isSubmitSuccessful, reset]);

  // Display disabled form fields on load
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

  // Display active form fields and populate them
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

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      width={"24rem"}
      spacing={2}
    >
      {loading ? loadingForm : formFields}
      <Stack direction="row" spacing={2}>
        <SubmitButton name="edit" loading={loading} />
        <SubmitButton name="delete" loading={loading} />
      </Stack>
      <Log value={watch()} />
    </Stack>
  );
};

export default Form;

SubmitButton.propTypes = {
  name: PropTypes.oneOf(["edit", "delete"]),
};
