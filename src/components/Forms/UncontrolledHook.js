import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField, Typography } from "@mui/material";

const UncontrolledHook = () => {
  // Form initial state
  const initialState = useMemo(() => ({ user: "", name: "", age: "" }), []);

  const { register, handleSubmit, watch, reset, formState } =
    useForm(initialState);

  const onSubmit = (data) => {
    console.log(data);
  };
  const { errors, isSubmitSuccessful } = formState;

  // Reset the form on submit
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(initialState);
    }
  }, [reset, isSubmitSuccessful, initialState]);

  // Monitor fields values
  const watchAllValues = watch(Object.keys(initialState));
  const fieldsValues = watchAllValues.map(
    (value, index) => `${["user", "name", "age"][index]}: ${value}`
  );

  return (
    <>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
        <Typography variant="h3">Uncontrolled Hook</Typography>
        <TextField
          {...register("user", {
            required: "This field is required.",
          })}
          label="User"
          error={!!errors.user}
          helperText={errors.user ? errors.user.message : " "}
          InputLabelProps={{ required: true }}
        />
        <TextField
          {...register("name", {
            minLength: {
              value: 3,
              message: <>User should be 3 characters long.</>,
            },
          })}
          label="Name"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : " "}
        />
        <TextField
          {...register("age", {
            min: {
              value: 0,
              message: <>Provide a valid age.</>,
            },
          })}
          label="Age"
          type="number"
          error={!!errors.age}
          helperText={errors.age ? errors.age.message : " "}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
      <pre>
        <code>{JSON.stringify(fieldsValues, null, 2)}</code>
      </pre>
    </>
  );
};

export default UncontrolledHook;
