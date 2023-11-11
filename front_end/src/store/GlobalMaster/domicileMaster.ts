/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IDomicileMaster } from "../../interfaces/GlobalMaster/IDomicileMaster";

interface DomicileMaster {
  getAllDomicileMasterData: IDomicileMaster[];
  getByIDDomicileMaster: any;
  saveUpdateDomicileMaster: any;
  deleteDomicileMaster: any;
  getOptionDomicileMasterData: IDomicileMaster[];
}
const initialState: DomicileMaster = {
  getAllDomicileMasterData: [],
  getByIDDomicileMaster: null,
  saveUpdateDomicileMaster: null,
  deleteDomicileMaster: null,
  getOptionDomicileMasterData: [],
};

export const slice = createSlice({
  name: "DomicileMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionDomicile: () => {
      //load  nothing
    },
    setLoadGetAllDomicileMaster: (state, action: PayloadAction<any>) => {
      state.getAllDomicileMasterData = action.payload;
    },
    loadGetByIdDomicileMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdDomicileMaster: (state, action: PayloadAction<any>) => {
      state.getByIDDomicileMaster = action.payload;
    },
    loadSaveUpdateDomicileMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateDomicileMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateDomicileMaster = action.payload;
    },
    loadDeleteDomicileMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteDomicileMaster: (state, action: PayloadAction<any>) => {
      state.deleteDomicileMaster = action.payload;
    },
    setLoadGetOptionDomicileMaster: (state, action: PayloadAction<any>) => {
      state.getOptionDomicileMasterData = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDomicileMaster = (state: RootState) => state.domicileMaster;

export const getAllDomicileMaster = createSelector(
  selectDomicileMaster,
  (domicileMaster) => domicileMaster.getAllDomicileMasterData
);
export const getbyIdDomicileMaster = createSelector(
  selectDomicileMaster,
  (domicileMaster) => domicileMaster.getByIDDomicileMaster
);
export const getSaveUpdateDomicileMaster = createSelector(
  selectDomicileMaster,
  (domicileMaster) => domicileMaster.saveUpdateDomicileMaster
);
export const getDeleteDomicileMaster = createSelector(
  selectDomicileMaster,
  (domicileMaster) => domicileMaster.deleteDomicileMaster
);
export const getOptionDomicileMaster = createSelector(
  selectDomicileMaster,
  (domicileMaster) => domicileMaster.getOptionDomicileMasterData
);
