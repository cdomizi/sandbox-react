import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

const TestForm = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <Stack component="form" spacing={3} sx={{ maxWidth: 400 }}>
      <Typography variant="h3">Sample Form</Typography>
      <TextField
        label="Title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button variant="contained" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
    </Stack>
  );
};

export default TestForm;
