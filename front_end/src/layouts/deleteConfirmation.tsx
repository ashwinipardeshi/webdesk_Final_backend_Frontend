/* eslint-disable no-unused-vars */

import React, { ReactNode } from "react";
import { Button, Typography } from "@mui/material";
import DialogBox from "./dialog";

interface Props {
  openDialog: boolean;
  closeToggleDeleteDialog: (rowData?: any) => void;
  actionToggleDeleteDialog: (rowData?: any) => void;
  rowParam: any;
  page?: string;
  actions?: Array<{
    type: string;
    onClick: Function;
    icon: ReactNode;
    hideAction?: Function;
  }>;
}
function DeleteConfirmation(props: Props) {
  const {
    openDialog,
    closeToggleDeleteDialog,
    actionToggleDeleteDialog,
    rowParam,
    actions,
    page,
  } = props;
  return (
    <DialogBox
      open={openDialog}
      showClose={false}
      title="Confirm Delete"
      closeHandler={closeToggleDeleteDialog}
      actions={
        <>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              closeToggleDeleteDialog();
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: "16px",
            }}
            onClick={() => {
              actionToggleDeleteDialog();
            }}
          >
            Yes
          </Button>
        </>
      }
    >
      <Typography variant="h6" align="center">
        Are you sure you want to delete {rowParam ? rowParam.name : ""} {page}?
      </Typography>
    </DialogBox>
  );
}

export default DeleteConfirmation;
