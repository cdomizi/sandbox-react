import { useState } from "react";
import useGet from "./hooks/useGet";
import Log from "./components/Log";

function App() {
  const [url, setUrl] = useState(`https://dummyjson.com/products/1`);
  const [product, setProduct] = useState({});
  const { type, loading, error, data } = useGet(url);
  const handleFetchData = () => {
    const id = Math.ceil(Math.random() * 100);
    setUrl(`https://dummyjson.com/products/${id}`);
    setProduct(data);
  };

  return (
    <div className="App">
      <button onClick={handleFetchData}>Fetch Product Data</button>
      {error ? (
        `Error ${data?.status}: ${data?.message}`
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <Log value={product} />
      )}
    </div>
  );
}

export default App;
