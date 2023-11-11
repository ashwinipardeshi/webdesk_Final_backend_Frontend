/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IReligionMaster } from "../../interfaces/GlobalMaster/IReligionMaster";

interface religionMaster {
  getAllReligionMasterData: IReligionMaster[];
  getByIDReligionMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateReligionMaster: any;
  deleteReligionMaster: any;
  getOptionReligionMasterData: IReligionMaster[];
}
const initialState: religionMaster = {
  getAllReligionMasterData: [],
  getByIDReligionMaster: null,
  status: "idle",
  saveUpdateReligionMaster: null,
  deleteReligionMaster: null,
  getOptionReligionMasterData: [],
};

export const slice = createSlice({
  name: "ReligionMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionReligion: () => {
      //load  nothing
    },
    setLoadGetAllReligionMaster: (state, action: PayloadAction<any>) => {
      state.getAllReligionMasterData = action.payload;
    },
    loadGetByIdReligionMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdReligionMaster: (state, action: PayloadAction<any>) => {
      state.getByIDReligionMaster = action.payload;
    },
    loadSaveUpdateReligionMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateReligionMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateReligionMaster = action.payload;
    },
    loadDeleteReligionMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteReligionMaster: (state, action: PayloadAction<any>) => {
      state.deleteReligionMaster = action.payload;
    },
    setLoadGetOptionReligionMaster: (state, action: PayloadAction<any>) => {
      state.getOptionReligionMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReligionMaster = (state: RootState) => state.religionMaster;

export const getAllReligionMaster = createSelector(
  selectReligionMaster,
  (Religion) => Religion.getAllReligionMasterData
);
export const getbyIdReligionMaster = createSelector(
  selectReligionMaster,
  (Religion) => Religion.getByIDReligionMaster
);
export const getSaveUpdateReligionMaster = createSelector(
  selectReligionMaster,
  (Religion) => Religion.saveUpdateReligionMaster
);
export const getDeleteReligionMaster = createSelector(
  selectReligionMaster,
  (Religion) => Religion.deleteReligionMaster
);
export const getOptionReligionMaster = createSelector(
  selectReligionMaster,
  (Religion) => Religion.getOptionReligionMasterData
);
export const selectStatus = createSelector(
  selectReligionMaster,
  (state) => state.status
);
