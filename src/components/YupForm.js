import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Project import
import useValidation from "../hooks/useValidation";
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

// Display form fields
const FormFields = ({ control, loading }) => (
  <>
    <Controller
      control={control}
      name="username"
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          id={field.name}
          inputRef={field.ref}
          label={capitalize(field.name)}
          error={!!fieldState?.error}
          helperText={fieldState?.error?.message}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            ...(loading && {
              endAdornment: (
                <InputAdornment position="end">
                  <CircularProgress color="inherit" size={20} />
                </InputAdornment>
              ),
            }),
          }}
          disabled={loading}
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
          InputProps={{
            ...(loading && {
              endAdornment: (
                <InputAdornment position="end">
                  <CircularProgress color="inherit" size={20} />
                </InputAdornment>
              ),
            }),
          }}
          disabled={loading}
          margin="normal"
        />
      )}
    />
    <Controller
      control={control}
      name="age"
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          id={field.name}
          inputRef={field.ref}
          label={capitalize(field.name)}
          error={!!fieldState?.error}
          helperText={fieldState?.error?.message}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            ...(loading && {
              endAdornment: (
                <InputAdornment position="end">
                  <CircularProgress color="inherit" size={20} />
                </InputAdornment>
              ),
            }),
          }}
          disabled={loading}
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
          InputProps={{
            ...(loading && {
              endAdornment: (
                <InputAdornment position="end">
                  <CircularProgress color="inherit" size={20} />
                </InputAdornment>
              ),
            }),
          }}
          disabled={loading}
          type="password"
          margin="normal"
        />
      )}
    />
  </>
);

const YupForm = () => {
  const schema = useValidation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback((formData) => {
    console.log(formData);
  }, []);

  // Reset form fields on submit
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  // Fill form with random data
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
      <FormFields control={control} loading={loading} />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !!Object.keys(errors).length}
        endIcon={loading && <CircularProgress color="inherit" size={20} />}
      >
        Submit
      </Button>
      <Log value={watch()} />
    </Stack>
  );
};

export default YupForm;
