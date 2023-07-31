import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

// Project import
import {
  ProductContext,
  ProductDispatchContext,
  PRODUCT_ACTIONS,
} from "../contexts/ProductContext";
import Log from "./Log";

// MUI components
import {
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
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
  // Get random product data
  const { data, loading } = useContext(ProductContext);

  // Product dispatch function
  const dispatch = useContext(ProductDispatchContext);

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

  const onSubmit = useCallback(
    async (formData, event) => {
      // Check if edit or delete based on button `id` property
      const checkEdit = event.nativeEvent.submitter.id === "editButton";

      // Edit or delete the product accordingly
      checkEdit
        ? dispatch({
            type: PRODUCT_ACTIONS.EDIT,
            payload: formData,
          })
        : dispatch({
            type: PRODUCT_ACTIONS.DELETE,
            payload: formData,
          });
    },
    [dispatch]
  );

  // Reset form fields on submit
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

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
      <Typography variant="h3">Context Form</Typography>
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
