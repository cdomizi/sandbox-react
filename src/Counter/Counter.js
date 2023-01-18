import { useState } from "react";

function Counter() {
  const [ count, setCount ] = useState(0);

  function subtract() {
    setCount(count => count - 1)
  }
  function add() {
    setCount(count => count + 1)
  }

  return (
    <>
      <h1>Counter</h1>
      <button onClick={subtract}>-</button>
      <button onClick={add}>+</button>
      <p>{count}</p>
    </>
  );
}

export default Counter;
