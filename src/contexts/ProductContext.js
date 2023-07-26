import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import useFetch from "../hooks/useFetch";
import { SNACKBAR_ACTIONS, SnackbarContext } from "./SnackbarContext";

const ProductContext = createContext({ loading: true, data: {} });
const ProductDispatchContext = createContext(null);

// Product reducer actions
const PRODUCT_ACTIONS = {
  EDIT: "edit",
  DELETE: "delete",
};

const ProductProvider = ({ children }) => {
  // Get random product data
  const randomId = useMemo(() => Math.ceil(Math.random() * 100), []);
  const { loading, data } = useFetch(
    `https://dummyjson.com/products/${randomId}`
  );

  const editProduct = useCallback(async (formData) => {
    const { id, title, brand, price } = formData;
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, brand, price }),
      });
      return response.json();
    } catch (err) {
      console.error(
        err?.message || `Unexpected error while editing product ${id}`
      );
      return null;
    }
  }, []);

  const deleteProduct = useCallback(async (formData) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${formData.id}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    } catch (err) {
      console.error(
        err?.message || `Unexpected error while editing product ${formData.id}`
      );
      return null;
    }
  }, []);

  // Dispatch function for snackbar component
  const snackbarDispatch = useContext(SnackbarContext);

  // Product reducer function
  const productReducer = async (state, action) => {
    switch (action.type) {
      case PRODUCT_ACTIONS.EDIT:
        {
          const json = await editProduct(action.payload);
          if (json) {
            snackbarDispatch({
              type: SNACKBAR_ACTIONS.EDIT,
              payload: json?.title,
            });
            // Log response data on edit successful
            console.log(json);
          } else
            snackbarDispatch({
              type: SNACKBAR_ACTIONS.EDIT_ERROR,
              payload: json?.title,
            });
        }
        break;
      case PRODUCT_ACTIONS.DELETE:
        {
          const json = await deleteProduct(action.payload);
          if (json) {
            snackbarDispatch({
              type: SNACKBAR_ACTIONS.DELETE,
              payload: json?.title,
            });
            // Log response data on delete successful
            console.log(json);
          } else
            snackbarDispatch({
              type: SNACKBAR_ACTIONS.DELETE_ERROR,
              payload: json?.title,
            });
        }
        break;
      default: {
        return state;
      }
    }
  };

  // Product reducer
  const [product, dispatch] = useReducer(productReducer, {
    loading,
    data,
  });

  return (
    <ProductContext.Provider value={{ loading, data }}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductContext.Provider>
  );
};

export {
  ProductContext,
  ProductProvider,
  ProductDispatchContext,
  PRODUCT_ACTIONS,
};
