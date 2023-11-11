import React, { FC, ReactElement } from "react";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";
import { ReactComponent as Logo } from "../assets/logo.svg";

const DialogBox: FC<{
  open: boolean;
  title?: string;
  closeHandler?: Function;
  actions?: ReactElement;
  showClose?: boolean;
  disableEscape?: boolean;
  disableBackdropClick?: boolean;
  fullScreen?: boolean;
  className?: any;
  children?: any;
  alignActionButton?: "left" | "right" | "center";
}> = ({
  open,
  title,
  actions,
  showClose = true,
  closeHandler = () => {
    // do nothing.
  },
  disableEscape = false,
  disableBackdropClick = false,
  children,
  fullScreen = false,
  className,
  alignActionButton = "center",
}) => (
  <Dialog
    onClose={(_event, reason) => {
      if (disableBackdropClick && reason && reason === "backdropClick") return;
      closeHandler();
    }}
    open={open}
    maxWidth="sm"
    fullWidth
    disableEscapeKeyDown={disableEscape}
    fullScreen={fullScreen}
    className={className}
  >
    {fullScreen && (
      <Box paddingY={2}>
        <Logo width="100%" />
      </Box>
    )}
    {showClose && (
      <IconButton
        sx={{ position: "absolute", top: "8px", right: "10px" }}
        onClick={() => closeHandler()}
      >
        <Close />
      </IconButton>
    )}
    {title && (
      <DialogTitle
        sx={(theme) => ({
          textAlign: fullScreen ? "left" : "center",
          ...theme.typography.h6,
          paddingTop: 3,
        })}
      >
        {title}
      </DialogTitle>
    )}
    <DialogContent sx={{ overflow: "hidden" }}>{children}</DialogContent>
    <DialogActions sx={{ justifyContent: alignActionButton }}>
      <Box sx={{ my: 2, mt: 2, textAlign: "center" }}>{actions}</Box>
    </DialogActions>
  </Dialog>
);

export default DialogBox;
