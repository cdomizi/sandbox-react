import { useEffect, useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// MUI components
import { Button, Stack, TextField, Typography } from "@mui/material";

const PrefillForm = () => {
  const defaultValues = useMemo(
    () => ({ title: "test1", brand: "hi", price: "44" }),
    []
  );
  const [randomData, setRandomData] = useState(defaultValues);

  // Get random data from external API
  const getRandomData = useCallback(async () => {
    const randomId = Math.ceil(Math.random() * 100);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${randomId}`,
        {}
      );
      if (response.ok) {
        const { title, brand, price } = await response.json();
        setRandomData({ ...randomData, title, brand, price });
      }
    } catch (error) {
      console.error(error);
    }
  }, [randomData]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues });

  const onSubmit = useCallback(
    (formData) => {
      console.log(formData);
      setRandomData(defaultValues);
      reset(defaultValues);
    },
    [defaultValues, reset]
  );

  // Fill form fields with random data on button click
  useEffect(() => {
    if (randomData) reset(randomData, { keepDefaultValues: true });
  }, [randomData, reset]);

  return (
    <>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
        <Typography variant="h3">Pre-fill-Form</Typography>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField
              {...field}
              {...register("title", { required: "This field is required" })}
              error={!!errors.title}
              helperText={errors.title && errors.message}
              id="title"
              label="Title"
              required
            />
          )}
        />
        <Controller
          control={control}
          name="brand"
          render={({ field }) => (
            <TextField
              {...field}
              {...register("brand")}
              error={!!errors.title}
              helperText={errors.title && errors.message}
              id="brand"
              label="Brand"
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <TextField
              {...field}
              {...register("price", {
                number: (v) => Number.isInteger(v),
                positive: (v) => parseInt(v) > 0,
                message: <>Enter a valid price.</>,
              })}
              error={!!errors.title}
              helperText={errors.title && errors.message}
              id="price"
              label="Price"
              type="number"
            />
          )}
        />
        <Button
          type="button"
          variant="outlined"
          size="small"
          onClick={getRandomData}
        >
          Fill with random data
        </Button>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
      <pre>
        <code>{JSON.stringify(watch(), null, 2)}</code>
      </pre>
    </>
  );
};

export default PrefillForm;
