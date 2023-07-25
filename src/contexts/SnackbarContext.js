import { createContext, useReducer } from "react";
import CustomSnackbar from "../components/CustomSnackbar";

const SnackbarContext = createContext(null);

// Snackbar initial state
const initialState = {
  open: false,
  success: true,
  message: "",
};

// Snackbar reducer actions
const SNACKBAR_ACTIONS = {
  EDIT: "edit",
  EDIT_ERROR: "edit error",
  DELETE: "delete",
  DELETE_ERROR: "delete error",
  CLOSE: "close",
};

// Snackbar reducer function
const snackbarReducer = (state, action) => {
  switch (action.type) {
    case SNACKBAR_ACTIONS.EDIT: {
      return {
        ...initialState,
        open: true,
        success: true,
        message: `${
          action.payload.length ? action.payload : "Product"
        } edited successfully!`,
      };
    }
    case SNACKBAR_ACTIONS.EDIT_ERROR: {
      console.error(
        `Error while editing the product": ${action.payload.state} - ${action.payload.stateText}`
      );
      return {
        ...initialState,
        open: true,
        success: false,
        message: "Sorry! Unable to edit the product.",
      };
    }
    case SNACKBAR_ACTIONS.DELETE: {
      return {
        ...initialState,
        open: true,
        success: true,
        message: `${
          action.payload.length ? action.payload : "Product"
        } deleted successfully!`,
      };
    }
    case SNACKBAR_ACTIONS.DELETE_ERROR: {
      console.error(
        `Error while deleting the product": ${action.payload.state} - ${action.payload.stateText}`
      );
      return {
        ...initialState,
        open: true,
        success: false,
        message: "Sorry! Unable to delete the product.",
      };
    }
    case SNACKBAR_ACTIONS.CLOSE: {
      // Do not close the snackbar if the user just clicked away
      if (action.payload === "clickaway") {
        return state;
      }
      return initialState;
    }
    default: {
      return state;
    }
  }
};

const SnackbarProvider = ({ children }) => {
  // Snackbar reducer
  const [snackbarState, dispatch] = useReducer(snackbarReducer, initialState);

  return (
    <SnackbarContext.Provider value={dispatch}>
      {children}
      <CustomSnackbar {...snackbarState} />
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarProvider, SNACKBAR_ACTIONS };
