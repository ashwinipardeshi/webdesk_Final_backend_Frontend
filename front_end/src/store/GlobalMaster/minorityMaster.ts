/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IMinorityMaster } from "../../interfaces/GlobalMaster/IMinorityMaster";

interface minorityMaster {
  getAllMinorityMasterData: IMinorityMaster[];
  getByIDMinorityMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateMinorityMaster: any;
  deleteMinorityMaster: any;
  getOptionMinorityMasterData: IMinorityMaster[];
}
const initialState: minorityMaster = {
  getAllMinorityMasterData: [],
  getByIDMinorityMaster: null,
  status: "idle",
  saveUpdateMinorityMaster: null,
  deleteMinorityMaster: null,
  getOptionMinorityMasterData: [],
};

export const slice = createSlice({
  name: "MinorityMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionMinorityMaster: () => {
      //load  nothing
    },
    setLoadGetAllMinorityMaster: (state, action: PayloadAction<any>) => {
      state.getAllMinorityMasterData = action.payload;
    },
    loadGetByIdMinorityMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdMinorityMaster: (state, action: PayloadAction<any>) => {
      state.getByIDMinorityMaster = action.payload;
    },
    loadSaveUpdateMinorityMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateMinorityMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateMinorityMaster = action.payload;
    },
    loadDeleteMinorityMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteMinorityMaster: (state, action: PayloadAction<any>) => {
      state.deleteMinorityMaster = action.payload;
    },
    setLoadGetOptionMinorityMaster: (state, action: PayloadAction<any>) => {
      state.getOptionMinorityMasterData = action.payload;
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
export const selectMinorityMaster = (state: RootState) => state.minorityMaster;

export const getAllMinorityMaster = createSelector(
  selectMinorityMaster,
  (Minority) => Minority.getAllMinorityMasterData
);
export const getbyIdMinorityMaster = createSelector(
  selectMinorityMaster,
  (Minority) => Minority.getByIDMinorityMaster
);
export const getSaveUpdateMinorityMaster = createSelector(
  selectMinorityMaster,
  (Minority) => Minority.saveUpdateMinorityMaster
);
export const getDeleteMinorityMaster = createSelector(
  selectMinorityMaster,
  (Minority) => Minority.deleteMinorityMaster
);
export const getOptionMinorityMaster = createSelector(
  selectMinorityMaster,
  (Minority) => Minority.getOptionMinorityMasterData
);
export const selectStatus = createSelector(
  selectMinorityMaster,
  (Minority) => Minority.status
);
