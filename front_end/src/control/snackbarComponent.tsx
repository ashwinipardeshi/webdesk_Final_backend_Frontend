import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions, getSnackbarStatus } from "../store/snackbarToster";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SnackbarComponent: FC<any> = () => {
  const dispatch = useDispatch();
  const getSnackbar = useSelector(getSnackbarStatus);

  const closeSnackbar = (e: any) => {
    dispatch(
      actions.setSnackbarStatus({
        message: "",
        severity: "success",
        open: false,
      })
    );
  };
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={getSnackbar ? getSnackbar.open : false}
        autoHideDuration={4000}
        onClose={(e) => closeSnackbar(e)}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          onClose={(e) => closeSnackbar(e)}
          severity={getSnackbar ? getSnackbar.severity : "success"}
          sx={{ width: "100%" }}
        >
          {getSnackbar ? getSnackbar.message : ""}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
export default SnackbarComponent;
