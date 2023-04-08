import { useEffect, useReducer } from "react";

const useFetch = (url) => {
  const initialState = { loading: false, error: undefined, data: undefined };

  // Reducer function
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case "loading": {
        return { ...initialState, loading: true };
      }
      case "success": {
        return {
          ...initialState,
          data: action.payload,
        };
      }
      case "error": {
        return {
          ...initialState,
          error: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // If the url is not provided, do nothing
    if (!url) return;
    // Initialize AbortController for cleanup
    const abortController = new AbortController();

    // Fetch data
    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(url, { signal: abortController.signal });

        // Throw an error if the request failed
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const json = await response.json();
        dispatch({
          type: "success",
          payload: json,
        });
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error(`Error while fetching data: ${error.message}`);
          dispatch({
            type: "error",
            payload: error,
          });
        }
      }
    };
    url && fetchData();

    return function cleanup() {
      abortController.abort();
    };
  }, [url]);
  return state;
};

export default useFetch;
