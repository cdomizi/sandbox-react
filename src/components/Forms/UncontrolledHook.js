import { Button, Stack, TextField, Typography } from "@mui/material";

const UncontrolledHook = () => {
  return (
    <Stack component="form" spacing={3}>
      <Typography variant="h3">Uncontrolled Hook</Typography>
      <TextField id="title" name="title" label="Title" required />
      <TextField id="brand" name="brand" label="Brand" />
      <TextField id="price" name="price" label="Price" />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Stack>
  );
};

export default UncontrolledHook;
