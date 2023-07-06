import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Typography,
  Button,
  FormControlLabel,
  Stack,
  Checkbox,
} from "@mui/material";

const CheckboxForm = () => {
  const { control, handleSubmit, watch, formState, reset } = useForm({
    defaultValues: {
      status: false,
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);
  };

  // Reset the form on submit
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      sx={{ maxWidth: 400 }}
    >
      <Typography variant="h3">Checkbox</Typography>
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <FormControlLabel
            {...field}
            control={<Checkbox />}
            label="Required"
          />
        )}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <pre>
        <code>
          <br />
          {JSON.stringify(watch(), null, 2)}
        </code>
      </pre>
    </Stack>
  );
};

export default CheckboxForm;
