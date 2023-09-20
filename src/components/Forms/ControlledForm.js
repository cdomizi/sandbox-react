import { useEffect, useMemo, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

const ControlledForm = () => {
  // form state
  const initialFormState = useMemo(
    () => ({
      title: null,
      brand: null,
      price: null,
    }),
    []
  );
  const [formData, setFormData] = useState(initialFormState);

  // form error state
  const initialFormErrorState = useMemo(
    () => ({
      title: false,
      brand: false,
      price: false,
    }),
    []
  );
  const [formError, setFormError] = useState(initialFormErrorState);

  // update form state on type
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    // prevent redirecting, reloading
    event.preventDefault();

    for (const [key, value] of Object.entries(formData)) {
      key === "title" &&
        !value?.length &&
        setFormError({ ...formError, [key]: true });
    }

    console.log(formData);

    // reset form fields on submit
    setFormData(initialFormState);
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(formData)) {
      value?.length && setFormError({ ...formError, [key]: false });
    }
  }, [formData, formError]);

  return (
    <>
      <Stack component="form" onSubmit={handleSubmit} spacing={3}>
        <Typography variant="h3">Controlled Form</Typography>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={formData.title || ""}
          onChange={handleChange}
          error={!!formError?.title}
          helperText={!!formError?.title && "Please enter a title"}
          InputLabelProps={{ required: true }}
        />
        <TextField
          id="brand"
          name="brand"
          label="Brand"
          value={formData.brand || ""}
          onChange={handleChange}
          error={!!formError?.brand}
          helperText={!!formError?.brand && "Please enter a valid brand"}
        />
        <TextField
          id="price"
          name="price"
          label="Price"
          type="number"
          value={formData.price || ""}
          onChange={handleChange}
          error={!!formError?.price}
          helperText={!!formError?.price && "Please enter a valid price"}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
      <pre>
        <code>{JSON.stringify(formData, null, 2)}</code>
      </pre>
    </>
  );
};

export default ControlledForm;
