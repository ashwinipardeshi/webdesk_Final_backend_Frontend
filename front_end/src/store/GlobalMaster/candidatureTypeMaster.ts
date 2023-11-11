import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICandidatureTypeMaster } from "../../interfaces/GlobalMaster/ICandidatureTypeMaster";

interface CandidatureTypeMaster {
  getAllCandidatureTypeMasterData: ICandidatureTypeMaster[];
  getByIDCandidatureTypeMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateCandidatureTypeMaster: any;
  deleteCandidatureTypeMaster: any;
  getOptionCandidatureTypeMasterData: ICandidatureTypeMaster[];
}
const initialState: CandidatureTypeMaster = {
  getAllCandidatureTypeMasterData: [],
  getByIDCandidatureTypeMaster: null,
  status: "idle",
  saveUpdateCandidatureTypeMaster: null,
  deleteCandidatureTypeMaster: null,
  getOptionCandidatureTypeMasterData: [],
};

export const slice = createSlice({
  name: "CandidatureTypeMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadCandidatureType: () => {
      //load  nothing
    },
    setLoadGetAllCandidatureTypeMaster: (state, action: PayloadAction<any>) => {
      state.getAllCandidatureTypeMasterData = action.payload;
    },
    loadGetByIdCandidatureTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdCandidatureTypeMaster: (state, action: PayloadAction<any>) => {
      state.getByIDCandidatureTypeMaster = action.payload;
    },
    loadSaveUpdateCandidatureTypeMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setSaveUpdateCandidatureTypeMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateCandidatureTypeMaster = action.payload;
    },
    loadDeleteCandidatureTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteCandidatureTypeMaster: (state, action: PayloadAction<any>) => {
      state.deleteCandidatureTypeMaster = action.payload;
    },
    setLoadGetOptionCandidatureTypeMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.getOptionCandidatureTypeMasterData = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectCandidatureTypeMaster = (state: RootState) =>
  state.candidatureTypeMaster;

export const getAllCandidatureTypeMaster = createSelector(
  selectCandidatureTypeMaster,
  (CandidatureType) => CandidatureType.getAllCandidatureTypeMasterData
);
export const getbyIdCandidatureTypeMaster = createSelector(
  selectCandidatureTypeMaster,
  (CandidatureType) => CandidatureType.getByIDCandidatureTypeMaster
);
export const getSaveUpdateCandidatureTypeMaster = createSelector(
  selectCandidatureTypeMaster,
  (CandidatureType) => CandidatureType.saveUpdateCandidatureTypeMaster
);
export const getDeleteCandidatureTypeMaster = createSelector(
  selectCandidatureTypeMaster,
  (CandidatureType) => CandidatureType.deleteCandidatureTypeMaster
);
export const getOptionCandidatureTypeMaster = createSelector(
  selectCandidatureTypeMaster,
  (CandidatureType) => CandidatureType.getOptionCandidatureTypeMasterData
);
export const selectStatus = createSelector(
  selectCandidatureTypeMaster,
  (state) => state.status
);
