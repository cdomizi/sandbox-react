import { useEffect, useReducer } from "react";

const useFetch = (url, options) => {
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
    // If no url is provided, do nothing
    if (!url) return;
    // Initialize AbortController for cleanup
    const abortController = new AbortController();

    // Fetch data
    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });

        // Throw an error if the request failed
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        dispatch({
          type: "success",
          payload: data,
        });
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error(`Error while fetching data: ${error.message}`);
        }
        dispatch({
          type: "error",
          payload: error,
        });
      }
    };
    fetchData();

    return function cleanup() {
      abortController.abort();
    };
  }, [url, options]);
  return state;
};

export default useFetch;
