import { useCallback, useRef, useState } from "react";

import { Button, Stack, TextField, Typography } from "@mui/material";

const TestForm = () => {
  const formRef = useRef(null);
  const [formErrors, setFormErrors] = useState({})

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    // Create FormData object
    const formData = new FormData(formRef.current)

    // Set errors for each empty field
    formData?.forEach((value, key) => {
      !value?.length && setFormErrors(prevErrors => ({...prevErrors, [key]: true}))
    });

    const formFields = [...formData.entries()];
    const currentErrors = formFields?.filter(([key, value]) => !value?.length)

    if (currentErrors?.length) {
      // On error, log the list of missing fields to the console
      return console.error(
        "Missing fields:", currentErrors?.map(([key, value]) => key)?.join(", ")
      );
    } 
    else {
      // On no error, log form data to the console
      console.log(({formData}));
      // Cleanup after submit
      return formRef.current?.reset();
    }

  }, [])

  return (
  <Stack component="form" onSubmit={handleSubmit} ref={formRef} autoComplete="off">
    <Typography variant="h3">Test Form</Typography>
    <TextField
      id="username"
      name="username"
      label="Username"
      onChange={(event) => {
        // Set error if field is empty
        setFormErrors(prevErrors => ({...prevErrors, username: !event.target?.value?.length}));
      }}
      InputLabelProps={{required: true}}
      error={formErrors?.username}
      helperText={formErrors?.username && "Please enter your username"}
      fullWidth
      margin="normal"
    />
    <TextField
      id="password"
      name="password"
      label="Password"
      type="password"
      onChange={(event) => {
        // Set error if field is empty
        setFormErrors(prevErrors => ({...prevErrors, password: !event.target?.value?.length}));
      }}
      InputLabelProps={{required: true}}
      error={formErrors?.password}
      helperText={formErrors?.password && "Please enter your password"}
      fullWidth
      margin="normal"
    />
    <Button variant="contained" type="submit">Submit</Button>
  </Stack>)
}

export default TestForm;
