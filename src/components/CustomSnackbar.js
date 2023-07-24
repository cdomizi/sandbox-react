import PropTypes from "prop-types";
import { useContext } from "react";
import { SnackbarContext, SNACKBAR_ACTIONS } from "../contexts/SnackbarContext";

// MUI components & icons
import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const CustomSnackbar = ({
  open,
  vertical = "top",
  horizontal = "center",
  success,
  message,
}) => {
  const dispatch = useContext(SnackbarContext);

  const handleClose = (event, reason) => {
    dispatch({ type: SNACKBAR_ACTIONS.CLOSE, payload: reason });
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical,
        horizontal,
      }}
      onClose={handleClose}
    >
      <Alert
        severity={success ? "success" : "error"}
        variant="filled"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;

CustomSnackbar.propTypes = {
  open: PropTypes.bool,
  vertical: PropTypes.oneOf(["top", "bottom"]),
  horizontal: PropTypes.oneOf(["left", "center", "right"]),
  success: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
};
