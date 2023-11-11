import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAcademicYearMaster } from "../../interfaces/Master/IAcademicYearMaster";

interface AcademicYearMaster {
  getAllAcademicYearMasterData: IAcademicYearMaster[];
  getByIDAcademicYearMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdadteAcademicYearMaster: any;
  deleteAcademicYearMaster: any;
  getOptionAcademicYearMasterData: IAcademicYearMaster[];
  getSignOptionAcademicYearMasterData: IAcademicYearMaster[];
}
const initialState: AcademicYearMaster = {
  getAllAcademicYearMasterData: [],
  getByIDAcademicYearMaster: null,
  status: "idle",
  saveUpdadteAcademicYearMaster: null,
  deleteAcademicYearMaster: null,
  getOptionAcademicYearMasterData: [],
  getSignOptionAcademicYearMasterData: [],
};

export const slice = createSlice({
  name: "AcademicYearMaster",
  initialState,
  reducers: {
    load: () => {

    },
    loadOptionsAcademicYear: () => {

    },
    loadSignOptions: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setLoadGetAllAcademicYearMaster: (state, action: PayloadAction<any>) => {
      state.getAllAcademicYearMasterData = action.payload;
    },
    loadGetByIdAcademicYearMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdAcademicYearMaster: (state, action: PayloadAction<any>) => {
      state.getByIDAcademicYearMaster = action.payload;
    },
    loadSaveUpdateAcademicYearMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateAcademicYearMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteAcademicYearMaster = action.payload;
    },
    loadDeleteAcademicYearMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteAcademicYearMaster: (state, action: PayloadAction<any>) => {
      state.deleteAcademicYearMaster = action.payload;
    },
    setLoadGetOptionAcademicYearMaster: (state, action: PayloadAction<any>) => {
      state.getOptionAcademicYearMasterData = action.payload;
    },
    setLoadGetSignOptionAcademicYearMaster: (state, action: PayloadAction<any>) => {
      state.getSignOptionAcademicYearMasterData = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectAcademicYearMaster = (state: RootState) => state.academicYearMaster;

export const getAllAcademicYearMaster = createSelector(
  selectAcademicYearMaster,
  (AcademicYear) => AcademicYear.getAllAcademicYearMasterData
);
export const getbyIdAcademicYearMaster = createSelector(
  selectAcademicYearMaster,
  (AcademicYear) => AcademicYear.getByIDAcademicYearMaster
);
export const getSaveUpdateAcademicYearMaster = createSelector(
  selectAcademicYearMaster,
  (AcademicYear) => AcademicYear.saveUpdadteAcademicYearMaster
);
export const getDeleteAcademicYearMaster = createSelector(
  selectAcademicYearMaster,
  (AcademicYear) => AcademicYear.deleteAcademicYearMaster
);
export const getOptionAcademicYearMaster = createSelector(
  selectAcademicYearMaster,
  (AcademicYear) => AcademicYear.getOptionAcademicYearMasterData
);
export const getSignOptionAcademicYearMaster = createSelector(
  selectAcademicYearMaster,
  (AcademicYear) => AcademicYear.getSignOptionAcademicYearMasterData
);
export const selectStatus = createSelector(
  selectAcademicYearMaster,
  (state) => state.status
);
