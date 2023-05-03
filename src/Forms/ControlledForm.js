import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

const ControlledForm = () => {
  // form state
  const initialFormState = {
    title: "",
    brand: "",
    price: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  // update form state on type
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    // prevent redirecting, reloading
    event.preventDefault();
    // reset form fields on submit
    setFormData(initialFormState);

    console.log(formData);
  };

  return (
    <>
      <Stack component="form" onSubmit={handleSubmit} spacing={3}>
        <Typography variant="h3">Controlled Form</Typography>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          id="brand"
          name="brand"
          label="Brand"
          value={formData.brand}
          onChange={handleChange}
        />
        <TextField
          id="price"
          name="price"
          label="Price"
          value={formData.price}
          onChange={handleChange}
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
