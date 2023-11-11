/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ISemesterMaster } from "../../interfaces/GlobalMaster/ISemesterMaster";

interface SemesterMaster {
  getAllSemesterMasterData: ISemesterMaster[];
  getByIDSemesterMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateSemesterMaster: any;
  deleteSemesterMaster: any;
  getOptionSemesterMasterData: ISemesterMaster[];
}

const initialState: SemesterMaster = {
  getAllSemesterMasterData: [],
  getByIDSemesterMaster: null,
  status: "idle",
  saveUpdateSemesterMaster: null,
  deleteSemesterMaster: null,
  getOptionSemesterMasterData: [],
};

export const slice = createSlice({
  name: "SemesterMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionSemester: () => {
      //load  nothing
    },
    setLoadGetAllSemesterMaster: (state, action: PayloadAction<any>) => {
      state.getAllSemesterMasterData = action.payload;
    },
    loadGetByIdSemesterMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdSemesterMaster: (state, action: PayloadAction<any>) => {
      state.getByIDSemesterMaster = action.payload;
    },
    loadSaveUpdateSemesterMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateSemesterMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateSemesterMaster = action.payload;
    },
    loadDeleteSemesterMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteSemesterMaster: (state, action: PayloadAction<any>) => {
      state.deleteSemesterMaster = action.payload;
    },
    setLoadGetOptionSemesterMaster: (state, action: PayloadAction<any>) => {
      state.getOptionSemesterMasterData = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectSemesterMaster = (state: RootState) => state.semesterMaster;

export const getAllSemesterMaster = createSelector(
  selectSemesterMaster,
  (Semester) => Semester.getAllSemesterMasterData
);
export const getbyIdSemesterMaster = createSelector(
  selectSemesterMaster,
  (Semester) => Semester.getByIDSemesterMaster
);
export const getSaveUpdateSemesterMaster = createSelector(
  selectSemesterMaster,
  (Semester) => Semester.saveUpdateSemesterMaster
);
export const getDeleteSemesterMaster = createSelector(
  selectSemesterMaster,
  (Semester) => Semester.deleteSemesterMaster
);
export const getOptionSemesterMaster = createSelector(
  selectSemesterMaster,
  (Semester) => Semester.getOptionSemesterMasterData
);
export const selectStatus = createSelector(
  selectSemesterMaster,
  (state) => state.status
);
