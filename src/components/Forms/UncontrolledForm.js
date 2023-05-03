import { useRef } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

const UncontrolledForm = () => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    // prevent redirecting, reloading
    event.preventDefault();
    // create FormData object, ready to use in a HTTP request
    const data = new FormData(formRef.current);
    // reset form fields on submit
    event.target?.reset();

    console.log(data);
  };

  return (
    <Stack
      component="form"
      ref={formRef}
      onSubmit={(event) => handleSubmit(event)}
      spacing={3}
      sx={{ maxWidth: 400 }}
    >
      <Typography variant="h3">Uncontrolled Form</Typography>
      <TextField id="title" name="title" label="Title" />
      <TextField id="brand" name="brand" label="Brand" />
      <TextField id="price" name="price" label="Price" />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Stack>
  );
};

export default UncontrolledForm;
