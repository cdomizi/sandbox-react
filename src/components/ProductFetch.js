import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Log from "./Log";

import { Button, Stack, Typography } from "@mui/material";

const ProductFetch = () => {
  const [product, setProduct] = useState({});
  const [url, setUrl] = useState(null);

  // fetch product data
  const { loading, error, data } = useFetch(url);

  // send fetch request on button click
  const handleFetchData = () => {
    const randomId = Math.ceil(Math.random() * 100);
    setUrl(`https://dummyjson.com/products/${randomId}`);
  };

  // update product upon fetching data
  useEffect(() => setProduct(data), [data]);

  return (
    <Stack className="App" width={"24rem"} spacing={4}>
      <Button variant="contained" onClick={handleFetchData}>
        Fetch Product Data
      </Button>
      {error ? (
        <Typography>{`Error: ${error.message}`}</Typography>
      ) : loading ? (
        <Typography>loading...</Typography>
      ) : (
        <Log value={product} />
      )}
    </Stack>
  );
};

export default ProductFetch;
