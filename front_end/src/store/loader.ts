import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

interface loaderStatus {
  status: "idle" | "loading" | "error" | "tokenExpired";
}
const initialState: loaderStatus = {
  status: "idle",
};

export const slice = createSlice({
  name: "loaderStatus",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<any>) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;
export const selectLoaderStatus = (state: RootState) => state.loaderStatus;

export const selectStatus = createSelector(
  selectLoaderStatus,
  (state) => state.status
);
