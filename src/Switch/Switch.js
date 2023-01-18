import { useState } from "react";

function Switch() {
  const [ mySwitch, setMySwitch ] = useState(true)
  function toggle() {
    setMySwitch(prevMySwitch => !prevMySwitch)
  }

  return (
    <>
      <h1>Switch</h1>
      <button onClick={toggle}>Toggle</button>
      <p>{mySwitch ? "ON" : "OFF"}</p>
    </>
  );
}

export default Switch;
