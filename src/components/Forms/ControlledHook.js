import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button, Stack, TextField, Typography } from "@mui/material";

const ControlledHook = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      user: "",
      name: "",
      age: 0,
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);
  };

  // Reset the form on submit
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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
      <Typography variant="h3">Controlled Hook</Typography>
      <Controller
        control={control}
        name="user"
        render={({ field }) => (
          <TextField {...field} id="user" label="User" required />
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField {...field} id="name" label="Name" required />
        )}
      />
      <Controller
        control={control}
        name="age"
        render={({ field }) => (
          <TextField {...field} id="age" label="Age" required />
        )}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <FormValues />
    </Stack>
  );
};

export default ControlledHook;
