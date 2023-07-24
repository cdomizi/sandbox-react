import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const CustomSnackbar = ({
  open,
  vertical = "top",
  horizontal = "center",
  onClose,
  success,
  message,
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    return onClose();
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
