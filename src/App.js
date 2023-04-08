import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import Log from "./components/Log";

function App() {
  const [product, setProduct] = useState({});
  const [url, setUrl] = useState(null);

  // fetch product data
  const { loading, error, data } = useFetch(url);

  // send fetch request on button click
  const handleFetchData = () => {
    const id = Math.ceil(Math.random() * 100);
    setUrl(`https://dummyjson.com/products/${id}`);
  };

  // update product upon fetching data
  useEffect(() => setProduct(data), [data]);

  return (
    <div className="App">
      <button onClick={handleFetchData}>Fetch Product Data</button>
      {error ? (
        <p>{`Error: ${error.message}`}</p>
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <Log value={product} />
      )}
    </div>
  );
}

export default App;
