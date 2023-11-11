import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICountryMaster } from "../../interfaces/GlobalMaster/ICountryMaster";

interface CountryMaster {
  getAllCountryMasterData: ICountryMaster[];
  getByIDCountryMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateCountryMaster: any;
  deleteCountryMaster: any;
  getOptionCountryMasterData: ICountryMaster[];
}
const initialState: CountryMaster = {
  getAllCountryMasterData: [],
  getByIDCountryMaster: null,
  status: "idle",
  saveUpdateCountryMaster: null,
  deleteCountryMaster: null,
  getOptionCountryMasterData: [],
};

export const slice = createSlice({
  name: "CountryMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionCountry: () => {
      //load  nothing
    },
    setLoadGetAllCountryMaster: (state, action: PayloadAction<any>) => {
      state.getAllCountryMasterData = action.payload;
    },
    loadGetByIdCountryMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdCountryMaster: (state, action: PayloadAction<any>) => {
      state.getByIDCountryMaster = action.payload;
    },
    loadSaveUpdateCountryMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateCountryMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateCountryMaster = action.payload;
    },
    loadDeleteCountryMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteCountryMaster: (state, action: PayloadAction<any>) => {
      state.deleteCountryMaster = action.payload;
    },
    setLoadGetOptionCountryMaster: (state, action: PayloadAction<any>) => {
      state.getOptionCountryMasterData = action.payload;
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
export const selectCountryMaster = (state: RootState) => state.countryMaster;

export const getAllCountryMaster = createSelector(
  selectCountryMaster,
  (Country) => Country.getAllCountryMasterData
);
export const getbyIdCountryMaster = createSelector(
  selectCountryMaster,
  (Country) => Country.getByIDCountryMaster
);
export const getSaveUpdateCountryMaster = createSelector(
  selectCountryMaster,
  (Country) => Country.saveUpdateCountryMaster
);
export const getDeleteCountryMaster = createSelector(
  selectCountryMaster,
  (Country) => Country.deleteCountryMaster
);
export const getOptionCountryMaster = createSelector(
  selectCountryMaster,
  (Country) => Country.getOptionCountryMasterData
);
export const selectStatus = createSelector(
  selectCountryMaster,
  (state) => state.status
);
