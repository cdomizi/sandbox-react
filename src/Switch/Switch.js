import { useState } from "react";

import { Button, Typography } from "@mui/material";

function Switch() {
  const [mySwitch, setMySwitch] = useState(true);
  function toggle() {
    setMySwitch((prevMySwitch) => !prevMySwitch);
  }

  return (
    <>
      <Typography variant="h3">Switch</Typography>
      <Button variant="outlined" onClick={toggle} sx={{ my: 3 }}>
        Toggle
      </Button>
      <Typography>{mySwitch ? "ON" : "OFF"}</Typography>
    </>
  );
}

export default Switch;
