import {Controller, useForm} from "react-hook-form";

import {Button, Stack, TextField} from "@mui/material"

const Form = () => {

  return <Stack maxWidth={"24rem"} spacing={2}>
    <TextField label="Title" margin="normal" InputLabelProps={{shrink: true}}/>
    <Button variant="contained">Submit</Button>
  </Stack>
}

export default Form;