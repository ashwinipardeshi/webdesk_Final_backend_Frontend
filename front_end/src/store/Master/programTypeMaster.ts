import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IProgramTypeMaster } from "../../interfaces/Master/IProgramTypeMaster";

interface ProgramTypeMaster {
  getAllProgramTypeMasterData: IProgramTypeMaster[];
  getByIDProgramTypeMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdadteProgramTypeMaster: any;
  deleteProgramTypeMaster: any;
  getOptionProgramTypeMasterData: IProgramTypeMaster[];
}
const initialState: ProgramTypeMaster = {
  getAllProgramTypeMasterData: [],
  getByIDProgramTypeMaster: null,
  status: "idle",
  saveUpdadteProgramTypeMaster: null,
  deleteProgramTypeMaster: null,
  getOptionProgramTypeMasterData: [],
};

export const slice = createSlice({
  name: "ProgramTypeMaster",
  initialState,
  reducers: {
    load: () => {
    
    },
    loadOptions: () => {
      //load  nothing
    },
    setLoadGetAllProgramTypeMaster: (state, action: PayloadAction<any>) => {
      state.getAllProgramTypeMasterData = action.payload;
    },
    loadGetByIdProgramTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdProgramTypeMaster: (state, action: PayloadAction<any>) => {
      state.getByIDProgramTypeMaster = action.payload;
    },
    loadSaveUpdateProgramTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateProgramTypeMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteProgramTypeMaster = action.payload;
    },
    loadDeleteProgramTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteProgramTypeMaster: (state, action: PayloadAction<any>) => {
      state.deleteProgramTypeMaster = action.payload;
    },
    setLoadGetOptionProgramTypeMaster: (state, action: PayloadAction<any>) => {
      state.getOptionProgramTypeMasterData = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectProgramTypeMaster = (state: RootState) => state.programTypeMaster;

export const getAllProgramTypeMaster = createSelector(
  selectProgramTypeMaster,
  (ProgramType) => ProgramType.getAllProgramTypeMasterData
);
export const getbyIdProgramTypeMaster = createSelector(
  selectProgramTypeMaster,
  (ProgramType) => ProgramType.getByIDProgramTypeMaster
);
export const getSaveUpdateProgramTypeMaster = createSelector(
  selectProgramTypeMaster,
  (ProgramType) => ProgramType.saveUpdadteProgramTypeMaster
);
export const getDeleteProgramTypeMaster = createSelector(
  selectProgramTypeMaster,
  (ProgramType) => ProgramType.deleteProgramTypeMaster
);
export const getOptionProgramTypeMaster = createSelector(
  selectProgramTypeMaster,
  (ProgramType) => ProgramType.getOptionProgramTypeMasterData
);
export const selectStatus = createSelector(
  selectProgramTypeMaster,
  (state) => state.status
);
