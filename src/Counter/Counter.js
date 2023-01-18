import { useState } from "react";

function Counter() {
  const [ count, setCount ] = useState(0);

  return (
    <div>
      <h1>Counter</h1>
    </div>
  );
}

export default Counter;
