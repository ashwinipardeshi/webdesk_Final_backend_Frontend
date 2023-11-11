import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IMotherTongueMaster } from "../../interfaces/GlobalMaster/IMotherTongueMaster";

interface MotherTongueMaster {
  getAllMotherTongueMasterData: IMotherTongueMaster[];
  getByIDMotherTongueMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateMotherTongueMaster: any;
  deleteMotherTongueMaster: any;
  getOptionMotherTongueMasterData: IMotherTongueMaster[];
}
const initialState: MotherTongueMaster = {
  getAllMotherTongueMasterData: [],
  getByIDMotherTongueMaster: null,
  status: "idle",
  saveUpdateMotherTongueMaster: null,
  deleteMotherTongueMaster: null,
  getOptionMotherTongueMasterData: [],
};

export const slice = createSlice({
  name: "MotherTongueMaster",
  initialState,
  reducers: {
    load: () => {},
    loadOptionMotherTongue: () => {},
    setLoadGetAllMotherTongueMaster: (state, action: PayloadAction<any>) => {
      state.getAllMotherTongueMasterData = action.payload;
    },
    loadGetByIdMotherTongueMaster: (state, action: PayloadAction<any>) => {},
    setGetByIdMotherTongueMaster: (state, action: PayloadAction<any>) => {
      state.getByIDMotherTongueMaster = action.payload;
    },
    loadSaveUpdateMotherTongueMaster: (state, action: PayloadAction<any>) => {},
    setSaveUpdateMotherTongueMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateMotherTongueMaster = action.payload;
    },
    loadDeleteMotherTongueMaster: (state, action: PayloadAction<any>) => {},
    setDeleteMotherTongueMaster: (state, action: PayloadAction<any>) => {
      state.deleteMotherTongueMaster = action.payload;
    },
    setLoadGetOptionMotherTongueMaster: (state, action: PayloadAction<any>) => {
      state.getOptionMotherTongueMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectMotherTongueMaster = (state: RootState) =>
  state.motherTongueMaster;

export const getAllMotherTongueMaster = createSelector(
  selectMotherTongueMaster,
  (MotherTongue) => MotherTongue.getAllMotherTongueMasterData
);
export const getbyIdMotherTongueMaster = createSelector(
  selectMotherTongueMaster,
  (MotherTongue) => MotherTongue.getByIDMotherTongueMaster
);
export const getSaveUpdateMotherTongueMaster = createSelector(
  selectMotherTongueMaster,
  (MotherTongue) => MotherTongue.saveUpdateMotherTongueMaster
);
export const getDeleteMotherTongueMaster = createSelector(
  selectMotherTongueMaster,
  (MotherTongue) => MotherTongue.deleteMotherTongueMaster
);
export const getOptionMotherTongueMaster = createSelector(
  selectMotherTongueMaster,
  (State) => State.getOptionMotherTongueMasterData
);
export const selectStatus = createSelector(
  selectMotherTongueMaster,
  (state) => state.status
);
