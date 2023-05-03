import { useState } from "react";

import { Button, Stack, Typography } from "@mui/material";

function Counter() {
  const [count, setCount] = useState(0);

  function subtract() {
    setCount((count) => count - 1);
  }
  function add() {
    setCount((count) => count + 1);
  }

  return (
    <>
      <Typography variant="h3">Counter</Typography>
      <Stack direction="row" spacing={2} my={3}>
        <Button variant="outlined" onClick={subtract}>
          -
        </Button>
        <Button variant="outlined" onClick={add}>
          +
        </Button>
      </Stack>
      <Typography>
        Count: <strong>{count}</strong>
      </Typography>
    </>
  );
}

export default Counter;
