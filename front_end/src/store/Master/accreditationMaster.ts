import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAccreditationMaster } from "../../interfaces/Master/IAccreditationMaster";

interface AccreditationMaster {
  getAllAccreditationMasterData: IAccreditationMaster[];
  getByIDAccreditationMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdadteAccreditationMaster: any;
  deleteAccreditationMaster: any;
  getOptionAccreditationMasterData: IAccreditationMaster[];
}
const initialState: AccreditationMaster = {
  getAllAccreditationMasterData: [],
  getByIDAccreditationMaster: null,
  status: "idle",
  saveUpdadteAccreditationMaster: null,
  deleteAccreditationMaster: null,
  getOptionAccreditationMasterData: [],
};

export const slice = createSlice({
  name: "AccreditationMaster",
  initialState,
  reducers: {

    load: (state, action: PayloadAction<number>) => {
      //load  nothing
    },
    loadOptionsAccrediationMaster: (state, action: PayloadAction<number>) => {
        //load  nothing
    },
    setLoadGetAllAccreditationMaster: (state, action: PayloadAction<any>) => {
      state.getAllAccreditationMasterData = action.payload;
    },
    loadGetByIdAccreditationMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdAccreditationMaster: (state, action: PayloadAction<any>) => {
      state.getByIDAccreditationMaster = action.payload;
    },
    loadSaveUpdateAccreditationMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateAccreditationMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteAccreditationMaster = action.payload;
    },
    loadDeleteAccreditationMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteAccreditationMaster: (state, action: PayloadAction<any>) => {
      state.deleteAccreditationMaster = action.payload;
    },
    setLoadGetOptionAccreditationMaster: (state, action: PayloadAction<any>) => {
      state.getOptionAccreditationMasterData = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectAccreditationMaster = (state: RootState) => state.accreditationMaster;

export const getAllAccreditationMaster = createSelector(
  selectAccreditationMaster,
  (Accreditation) => Accreditation.getAllAccreditationMasterData
);
export const getbyIdAccreditationMaster = createSelector(
  selectAccreditationMaster,
  (Accreditation) => Accreditation.getByIDAccreditationMaster
);
export const getSaveUpdateAccreditationMaster = createSelector(
  selectAccreditationMaster,
  (Accreditation) => Accreditation.saveUpdadteAccreditationMaster
);
export const getDeleteAccreditationMaster = createSelector(
  selectAccreditationMaster,
  (Accreditation) => Accreditation.deleteAccreditationMaster
);
export const getOptionAccreditationMaster = createSelector(
  selectAccreditationMaster,
  (Accreditation) => Accreditation.getOptionAccreditationMasterData
);
export const selectStatus = createSelector(
  selectAccreditationMaster,
  (state) => state.status
);
