import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAnnualIncomeMaster } from "../../interfaces/GlobalMaster/IAnnualIncomeMaster";

interface AnnualIncomeMaster {
  getAllAnnualIncomeMasterData: IAnnualIncomeMaster[];
  getByIDAnnualIncomeMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateAnnualIncomeMaster: any;
  deleteAnnualIncomeMaster: any;
  getOptionAnnualIncomeMasterData: IAnnualIncomeMaster[];
}
const initialState: AnnualIncomeMaster = {
  getAllAnnualIncomeMasterData: [],
  getByIDAnnualIncomeMaster: null,
  status: "idle",
  saveUpdateAnnualIncomeMaster: null,
  deleteAnnualIncomeMaster: null,
  getOptionAnnualIncomeMasterData: [],
};

export const slice = createSlice({
  name: "AnnualIncomeMaster",
  initialState,
  reducers: {
    load: () => {

    },
    loadOptionsAnnualIncome: () => {

    },
    setLoadGetAllAnnualIncomeMaster: (state, action: PayloadAction<any>) => {
      state.getAllAnnualIncomeMasterData = action.payload;
    },
    loadGetByIdAnnualIncomeMaster: (state, action: PayloadAction<any>) => {},
    setGetByIdAnnualIncomeMaster: (state, action: PayloadAction<any>) => {
      state.getByIDAnnualIncomeMaster = action.payload;
    },
    loadSaveUpdateAnnualIncomeMaster: (state, action: PayloadAction<any>) => {},
    setSaveUpdateAnnualIncomeMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateAnnualIncomeMaster = action.payload;
    },
    loadDeleteAnnualIncomeMaster: (state, action: PayloadAction<any>) => {},
    setDeleteAnnualIncomeMaster: (state, action: PayloadAction<any>) => {
      state.deleteAnnualIncomeMaster = action.payload;
    },
    setLoadGetOptionAnnualIncomeMaster: (state, action: PayloadAction<any>) => {
      state.getOptionAnnualIncomeMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectAnnualIncomeMaster = (state: RootState) =>
  state.annualIncomeMaster;

export const getAllAnnualIncomeMaster = createSelector(
  selectAnnualIncomeMaster,
  (AnnualIncome) => AnnualIncome.getAllAnnualIncomeMasterData
);
export const getbyIdAnnualIncomeMaster = createSelector(
  selectAnnualIncomeMaster,
  (AnnualIncome) => AnnualIncome.getByIDAnnualIncomeMaster
);
export const getSaveUpdateAnnualIncomeMaster = createSelector(
  selectAnnualIncomeMaster,
  (AnnualIncome) => AnnualIncome.saveUpdateAnnualIncomeMaster
);
export const getDeleteAnnualIncomeMaster = createSelector(
  selectAnnualIncomeMaster,
  (AnnualIncome) => AnnualIncome.deleteAnnualIncomeMaster
);
export const getOptionAnnualIncomeMaster = createSelector(
  selectAnnualIncomeMaster,
  (AnnualIncome) => AnnualIncome.getOptionAnnualIncomeMasterData
);
export const selectStatus = createSelector(
  selectAnnualIncomeMaster,
  (state) => state.status
);
