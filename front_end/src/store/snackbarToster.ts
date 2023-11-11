import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";
import { ISnackbar } from "../interfaces/GlobalMaster/ISnackbar";

interface ISnackbarDetails {
  snackbardata: ISnackbar;
}

const initialState: ISnackbarDetails = {
  snackbardata: {
    message: "",
    severity: "success",
    open: false,
  },
};

export const slice = createSlice({
  name: "snackbarStatus",
  initialState,
  reducers: {
    setSnackbarStatus: (state, action: PayloadAction<ISnackbar>) => {
      state.snackbardata = action.payload;
    },
  },
});

export const { reducer, actions } = slice;
export const selectSnackbarStatus = (state: RootState) => state.snackbarStatus;

export const getSnackbarStatus = createSelector(
  selectSnackbarStatus,
  (state) => state.snackbardata
);
