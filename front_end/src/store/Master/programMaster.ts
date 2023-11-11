import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IProgramMaster } from "../../interfaces/Master/IProgramMaster";

interface ProgramMaster {
  getAllProgramMasterData: IProgramMaster[];
  getByIDProgramMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdadteProgramMaster: any;
  deleteProgramMaster: any;
  getOptionProgramMasterData: IProgramMaster[];
  getSignOptionProgramMasterData: IProgramMaster[];
}
const initialState: ProgramMaster = {
  getAllProgramMasterData: [],
  getByIDProgramMaster: null,
  status: "idle",
  saveUpdadteProgramMaster: null,
  deleteProgramMaster: null,
  getOptionProgramMasterData: [],
  getSignOptionProgramMasterData: [],
};

export const slice = createSlice({
  name: "ProgramMaster",
  initialState,
  reducers: {
    load: () => {

    },
    loadOptions: () => {
      //load  nothing
    },
    loadSignOptions: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setLoadGetAllProgramMaster: (state, action: PayloadAction<any>) => {
      state.getAllProgramMasterData = action.payload;
    },
    loadGetByIdProgramMaster: (state, action: PayloadAction<any>) => {
    },
    setGetByIdProgramMaster: (state, action: PayloadAction<any>) => {
      state.getByIDProgramMaster = action.payload;
    },
    loadSaveUpdateProgramMaster: (state, action: PayloadAction<any>) => {
    },
    setSaveUpdateProgramMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteProgramMaster = action.payload;
    },
    loadDeleteProgramMaster: (state, action: PayloadAction<any>) => {
    },
    setDeleteProgramMaster: (state, action: PayloadAction<any>) => {
      state.deleteProgramMaster = action.payload;
    },
    setLoadGetOptionProgramMaster: (state, action: PayloadAction<any>) => {
      state.getOptionProgramMasterData = action.payload;
    },
    setLoadGetSignOptionProgramMaster: (state, action: PayloadAction<any>) => {
      state.getSignOptionProgramMasterData = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectProgramMaster = (state: RootState) => state.programMaster;

export const getAllProgramMaster = createSelector(
  selectProgramMaster,
  (Program) => Program.getAllProgramMasterData
);
export const getbyIdProgramMaster = createSelector(
  selectProgramMaster,
  (Program) => Program.getByIDProgramMaster
);
export const getSaveUpdateProgramMaster = createSelector(
  selectProgramMaster,
  (Program) => Program.saveUpdadteProgramMaster
);
export const getDeleteProgramMaster = createSelector(
  selectProgramMaster,
  (Program) => Program.deleteProgramMaster
);
export const getOptionProgramMaster = createSelector(
  selectProgramMaster,
  (Program) => Program.getOptionProgramMasterData
);
export const getSignOptionProgramMaster = createSelector(
  selectProgramMaster,
  (Program) => Program.getSignOptionProgramMasterData
);
export const selectStatus = createSelector(
  selectProgramMaster,
  (state) => state.status
);
