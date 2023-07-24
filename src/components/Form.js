import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";

// MUI components
import { Button, Stack, TextField } from "@mui/material";

// MUI icons
import {
  Circle as CircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const Form = () => {
  const randomId = useMemo(() => Math.ceil(Math.random() * 100), []);
  const { loading, data } = useFetch(
    `https://dummyjson.com/products/${randomId}`
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      id: data?.id,
      title: data?.title,
      brand: data?.brand,
      price: data?.price,
    },
  });

  const onSubmit = useCallback((formData, event) => {
    console.log(event.nativeEvent.submitter.id);
  }, []);

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      {loading ? (
        "<Stack></>"
      ) : (
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width={"24rem"}
          spacing={2}
        >
          <Controller
            control={control}
            name="id"
            defaultValue={data?.id}
            render={({ field }) => (
              <TextField
                {...field}
                label="ID"
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Controller
            control={control}
            name="title"
            defaultValue={data?.title}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Controller
            control={control}
            name="brand"
            defaultValue={data?.brand}
            render={({ field }) => (
              <TextField
                {...field}
                label="Brand"
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Controller
            control={control}
            name="price"
            defaultValue={data?.price}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              id="editButton"
              variant="outlined"
              size="large"
              fullWidth
              endIcon={<EditIcon />}
              sx={{
                "&, & .MuiButtonBase-root": { alignItems: "normal" },
              }}
            >
              Edit
            </Button>
            <Button
              type="submit"
              id="deleteButton"
              variant="outlined"
              size="large"
              fullWidth
              endIcon={<DeleteIcon />}
              color="error"
              sx={{
                "&, & .MuiButtonBase-root": { alignItems: "normal" },
              }}
            >
              Delete
            </Button>
          </Stack>
          <pre>
            <code>
              <br />
              {JSON.stringify(watch(), null, 2)}
            </code>
          </pre>
        </Stack>
      )}
    </>
  );
};

export default Form;
