import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IStudyMaster } from "../../interfaces/Master/IStudyMaster";

interface StudyMaster {
  getAllStudyMasterData: IStudyMaster[];
  getByIDStudyMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdadteStudyMaster: any;
  deleteStudyMaster: any;
  getOptionStudyMasterData: IStudyMaster[];
}
const initialState: StudyMaster = {
  getAllStudyMasterData: [],
  getByIDStudyMaster: null,
  status: "idle",
  saveUpdadteStudyMaster: null,
  deleteStudyMaster: null,
  getOptionStudyMasterData: [],
};

export const slice = createSlice({
  name: "StudyMaster",
  initialState,
  reducers: {
    load: () => {
    
    },
    loadOptions: () => {
      //load  nothing
    },
    setLoadGetAllStudyMaster: (state, action: PayloadAction<any>) => {
      state.getAllStudyMasterData = action.payload;
    },
    loadGetByIdStudyMaster: (state, action: PayloadAction<any>) => {
      
    },
    setGetByIdStudyMaster: (state, action: PayloadAction<any>) => {
      state.getByIDStudyMaster = action.payload;
    },
    loadSaveUpdateStudyMaster: (state, action: PayloadAction<any>) => {
      
    },
    setSaveUpdateStudyMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteStudyMaster = action.payload;
    },
    loadDeleteStudyMaster: (state, action: PayloadAction<any>) => {
      
    },
    setDeleteStudyMaster: (state, action: PayloadAction<any>) => {
      state.deleteStudyMaster = action.payload;
    },
    setLoadGetOptionStudyMaster: (state, action: PayloadAction<any>) => {
      state.getOptionStudyMasterData = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectStudyMaster = (state: RootState) => state.studyMaster;

export const getAllStudyMaster = createSelector(
  selectStudyMaster,
  (Study) => Study.getAllStudyMasterData
);
export const getbyIdStudyMaster = createSelector(
  selectStudyMaster,
  (Study) => Study.getByIDStudyMaster
);
export const getSaveUpdateStudyMaster = createSelector(
  selectStudyMaster,
  (Study) => Study.saveUpdadteStudyMaster
);
export const getDeleteStudyMaster = createSelector(
  selectStudyMaster,
  (Study) => Study.deleteStudyMaster
);
export const getOptionStudyMaster = createSelector(
  selectStudyMaster,
  (Study) => Study.getOptionStudyMasterData
);
export const selectStatus = createSelector(
  selectStudyMaster,
  (state) => state.status
);
