
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICollegeMaster } from "../../interfaces/Master/ICollegeMaster";

interface CollegeMaster {
  getAllCollegeMasterData: ICollegeMaster[];
  getByIDCollegeMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdadteCollegeMaster: any;
  deleteCollegeMaster: any;
  getOptionCollegeMasterData: ICollegeMaster[];
}
const initialState: CollegeMaster = {
  getAllCollegeMasterData: [],
  getByIDCollegeMaster: null,
  status: "idle",
  saveUpdadteCollegeMaster: null,
  deleteCollegeMaster: null,
  getOptionCollegeMasterData: [],
};

export const slice = createSlice({
  name: "CollegeMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptions: () => {
      //load  nothing
    },
    setLoadGetAllCollegeMaster: (state, action: PayloadAction<any>) => {
      state.getAllCollegeMasterData = action.payload;
    },
    loadGetByIdCollegeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdCollegeMaster: (state, action: PayloadAction<any>) => {
      state.getByIDCollegeMaster = action.payload;
    },
    loadSaveUpdateCollegeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateCollegeMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteCollegeMaster = action.payload;
    },
    loadDeleteCollegeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteCollegeMaster: (state, action: PayloadAction<any>) => {
      state.deleteCollegeMaster = action.payload;
    },
    setLoadGetOptionCollegeMaster: (state, action: PayloadAction<any>) => {
      state.getOptionCollegeMasterData = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectCollegeMaster = (state: RootState) => state.collegeMaster;

export const getAllCollegeMaster = createSelector(
  selectCollegeMaster,
  (College) => College.getAllCollegeMasterData
);
export const getbyIdCollegeMaster = createSelector(
  selectCollegeMaster,
  (College) => College.getByIDCollegeMaster
);
export const getSaveUpdateCollegeMaster = createSelector(
  selectCollegeMaster,
  (College) => College.saveUpdadteCollegeMaster
);
export const getDeleteCollegeMaster = createSelector(
  selectCollegeMaster,
  (College) => College.deleteCollegeMaster
);
export const getOptionCollegeMaster = createSelector(
  selectCollegeMaster,
  (College) => College.getOptionCollegeMasterData
);
export const selectStatus = createSelector(
  selectCollegeMaster,
  (state) => state.status
);
