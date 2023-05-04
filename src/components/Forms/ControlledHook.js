import { Button, Stack, TextField, Typography } from "@mui/material";

const ControlledHook = () => {
  return (
    <Stack component="form" spacing={3}>
      <Typography variant="h3">Controlled Hook</Typography>
      <TextField id="title" name="title" label="User" required />
      <TextField id="brand" name="brand" label="Name" />
      <TextField id="price" name="price" label="Age" type="number" />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Stack>
  );
};

export default ControlledHook;
