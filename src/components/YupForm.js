import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// Project import
import Log from "./Log";

// MUI components
import {
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";

const defaultValues = {
  username: "",
  email: "",
  age: "",
  password: "",
};

const YupForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
    watch,
  } = useForm({
    defaultValues,
  });

  const onSubmit = useCallback((formData) => {
    console.log(formData);
  }, []);

  // Reset form fields on submit
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const getRandomId = useCallback(() => Math.ceil(Math.random() * 10), []);

  const getRandomData = useCallback(async () => {
    try {
      // Disable "Fill with random data" button
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/users/${getRandomId()}`,
        {}
      );
      const randomData = await response.json();

      if (response.ok) {
        reset(
          {
            username: randomData?.username,
            email: randomData?.email,
            age: randomData?.age,
            password: randomData?.password,
          },
          { keepDefaultValues: true }
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [getRandomId, reset]);

  // Display disabled form fields on load
  const loadingForm = useMemo(
    () =>
      ["username", "email", "age", "password"].map((field) => (
        <TextField
          key={field}
          label={capitalize(field)}
          type={
            field === "password"
              ? "password"
              : field === "age"
              ? "number"
              : "string"
          }
          margin="normal"
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
          name="username"
          rules={{ required: "Please enter a username" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id={field.name}
              inputRef={field.ref}
              label={capitalize(field.name)}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id={field.name}
              inputRef={field.ref}
              label={capitalize(field.name)}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
          )}
        />
        <Controller
          control={control}
          name="age"
          rules={{
            min: { value: 18, message: "You must be at least 18 to register" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id={field.name}
              inputRef={field.ref}
              label={capitalize(field.name)}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              InputLabelProps={{ shrink: true }}
              type="number"
              margin="normal"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id={field.name}
              inputRef={field.ref}
              label={capitalize(field.name)}
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
              InputLabelProps={{ shrink: true }}
              type="password"
              margin="normal"
            />
          )}
        />
      </>
    ),
    [control]
  );

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      width={"24rem"}
      spacing={2}
    >
      <Typography variant="h3">Yup Validation</Typography>
      <Button
        type="button"
        variant="outlined"
        size="small"
        disabled={loading}
        onClick={getRandomData}
        endIcon={loading && <CircularProgress color="inherit" size={20} />}
      >
        Fill with random data
      </Button>
      {loading ? loadingForm : formFields}
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        endIcon={loading && <CircularProgress color="inherit" size={20} />}
      >
        Submit
      </Button>
      <Log value={watch()} />
    </Stack>
  );
};

export default YupForm;
