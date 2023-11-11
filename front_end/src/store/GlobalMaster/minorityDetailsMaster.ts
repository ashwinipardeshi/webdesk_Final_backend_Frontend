import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IMinorityDetailsMaster } from "../../interfaces/GlobalMaster/IMinorityDetailsMaster";

interface MinorityDetailsMaster {
  getAllMinorityDetailsMasterData: IMinorityDetailsMaster[];
  getByIDMinorityDetailsMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateMinorityDetailsMaster: any;
  deleteMinorityDetailsMaster: any;
  getOptionMinorityDetailsMasterData: IMinorityDetailsMaster[];
}
const initialState: MinorityDetailsMaster = {
  getAllMinorityDetailsMasterData: [],
  getByIDMinorityDetailsMaster: null,
  status: "idle",
  saveUpdateMinorityDetailsMaster: null,
  deleteMinorityDetailsMaster: null,
  getOptionMinorityDetailsMasterData: [],
};

export const slice = createSlice({
  name: "MinorityDetailsMaster",
  initialState,
  reducers: {
    load: () => {},
    loadOptionMinority: () => {},
    setLoadGetAllMinorityDetailsMaster: (state, action: PayloadAction<any>) => {
      state.getAllMinorityDetailsMasterData = action.payload;
    },
    loadGetByIdMinorityDetailsMaster: (state, action: PayloadAction<any>) => {},
    setGetByIdMinorityDetailsMaster: (state, action: PayloadAction<any>) => {
      state.getByIDMinorityDetailsMaster = action.payload;
    },
    loadSaveUpdateMinorityDetailsMaster: (
      state,
      action: PayloadAction<any>
    ) => {},
    setSaveUpdateMinorityDetailsMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateMinorityDetailsMaster = action.payload;
    },
    loadDeleteMinorityDetailsMaster: (state, action: PayloadAction<any>) => {},
    setDeleteMinorityDetailsMaster: (state, action: PayloadAction<any>) => {
      state.deleteMinorityDetailsMaster = action.payload;
    },
    setLoadGetOptionMinorityDetailsMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.getOptionMinorityDetailsMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectMinorityDetailsMaster = (state: RootState) =>
  state.minorityDetailsMaster;

export const getAllMinorityDetailsMaster = createSelector(
  selectMinorityDetailsMaster,
  (MinorityDetails) => MinorityDetails.getAllMinorityDetailsMasterData
);
export const getbyIdMinorityDetailsMaster = createSelector(
  selectMinorityDetailsMaster,
  (MinorityDetails) => MinorityDetails.getByIDMinorityDetailsMaster
);
export const getSaveUpdateMinorityDetailsMaster = createSelector(
  selectMinorityDetailsMaster,
  (MinorityDetails) => MinorityDetails.saveUpdateMinorityDetailsMaster
);
export const getDeleteMinorityDetailsMaster = createSelector(
  selectMinorityDetailsMaster,
  (MinorityDetails) => MinorityDetails.deleteMinorityDetailsMaster
);
export const getOptionMinorityDetailsMaster = createSelector(
  selectMinorityDetailsMaster,
  (MinorityDetails) => MinorityDetails.getOptionMinorityDetailsMasterData
);
export const selectStatus = createSelector(
  selectMinorityDetailsMaster,
  (MinorityDetails) => MinorityDetails.status
);
