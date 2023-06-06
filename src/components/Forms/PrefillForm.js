import { useEffect, useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// MUI components
import { Button, Stack, TextField, Typography } from "@mui/material";

const PrefillForm = () => {
  const defaultValues = useMemo(
    () => ({ title: "", brand: "", price: "" }),
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
        <Typography variant="h3">Populate Fields</Typography>
        <Controller
          control={control}
          name="title"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              id="title"
              label="Title"
              error={!!errors.title}
              helperText={errors.title && errors.title.message}
              InputLabelProps={{ required: true }}
            />
          )}
        />
        <Controller
          control={control}
          name="brand"
          render={({ field }) => (
            <TextField
              {...field}
              id="brand"
              label="Brand"
              error={!!errors.brand}
              helperText={errors.brand && "Enter a valid brand."}
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          rules={{
            valueAsNumber: true,
          }}
          render={({ field }) => (
            <>
              <TextField {...field} id="price" label="Price" type="number" />
            </>
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
