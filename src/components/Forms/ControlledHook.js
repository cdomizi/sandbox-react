import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button, Stack, TextField, Typography } from "@mui/material";

const ControlledHook = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful, errors },
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
          <TextField
            {...field}
            {...register("user", {
              required: "This field is required.",
            })}
            id="user"
            label="User"
            error={!!errors.user}
            helperText={errors.user && errors.user.message}
            InputLabelProps={{ required: true }}
          />
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField
            {...field}
            {...register("name", {
              minLength: {
                value: 3,
                message: <>Name should be 3 characters long.</>,
              },
            })}
            id="name"
            label="Name"
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />
        )}
      />
      <Controller
        control={control}
        name="age"
        render={({ field }) => (
          <TextField
            {...field}
            {...register("age", {
              min: {
                value: 0,
                message: <>Provide a valid age.</>,
              },
            })}
            id="age"
            label="Age"
            type="number"
            error={!!errors.age}
            helperText={errors.age && errors.age.message}
          />
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
