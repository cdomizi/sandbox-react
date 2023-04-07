import { useEffect, useReducer } from "react";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "loading": {
      return { ...state, loading: true };
    }
    case "success": {
      return {
        ...state,
        data: action.payload,
      };
    }
    case "error": {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const useGet = ({ url }) => {
  const initialState = { type: null, loading: false, error: false, data: null };
  const [state, dispatch] = useReducer(dataReducer, initialState);
  console.log(url);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: abortController.signal });
        const json = await res.json();
        dispatch({
          ...state,
          type: "success",
          payload: json,
        });
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error(`Error while fetching data: ${error}`);
          dispatch({
            ...state,
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
  }, [url, state]);
  return state;
};

export default useGet;
