import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IBloodGroupMaster } from "../../interfaces/GlobalMaster/IBloodGroupMaster";

interface BloodGroupMaster {
  getAllBloodGroupMasterData: IBloodGroupMaster[];
  getByIDBloodGroupMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateBloodGroupMaster: any;
  deleteBloodGroupMaster: any;
  getOptionBloodGroupMasterData: IBloodGroupMaster[];
}
const initialState: BloodGroupMaster = {
  getAllBloodGroupMasterData: [],
  getByIDBloodGroupMaster: null,
  status: "idle",
  saveUpdateBloodGroupMaster: null,
  deleteBloodGroupMaster: null,
  getOptionBloodGroupMasterData: [],
};

export const slice = createSlice({
  name: "BloodGroupMaster",
  initialState,
  reducers: {
    load: () => {},
    loadOptionOptionBloodGroup: () => {
      //load  nothing
    },
    setLoadGetAllBloodGroupMaster: (state, action: PayloadAction<any>) => {
      state.getAllBloodGroupMasterData = action.payload;
    },
    loadGetByIdBloodGroupMaster: (state, action: PayloadAction<any>) => {},
    setGetByIdBloodGroupMaster: (state, action: PayloadAction<any>) => {
      state.getByIDBloodGroupMaster = action.payload;
    },
    loadSaveUpdateBloodGroupMaster: (state, action: PayloadAction<any>) => {},
    setSaveUpdateBloodGroupMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateBloodGroupMaster = action.payload;
    },
    loadDeleteBloodGroupMaster: (state, action: PayloadAction<any>) => {},
    setDeleteBloodGroupMaster: (state, action: PayloadAction<any>) => {
      state.deleteBloodGroupMaster = action.payload;
    },
    setLoadGetOptionBloodGroupMaster: (state, action: PayloadAction<any>) => {
      state.getOptionBloodGroupMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectBloodGroupMaster = (state: RootState) =>
  state.bloodGroupMaster;

export const getAllBloodGroupMaster = createSelector(
  selectBloodGroupMaster,
  (BloodGroup) => BloodGroup.getAllBloodGroupMasterData
);
export const getbyIdBloodGroupMaster = createSelector(
  selectBloodGroupMaster,
  (BloodGroup) => BloodGroup.getByIDBloodGroupMaster
);
export const getSaveUpdateBloodGroupMaster = createSelector(
  selectBloodGroupMaster,
  (BloodGroup) => BloodGroup.saveUpdateBloodGroupMaster
);
export const getDeleteBloodGroupMaster = createSelector(
  selectBloodGroupMaster,
  (BloodGroup) => BloodGroup.deleteBloodGroupMaster
);
export const getOptionBloodGroupMaster = createSelector(
  selectBloodGroupMaster,
  (State) => State.getOptionBloodGroupMasterData
);
export const selectStatus = createSelector(
  selectBloodGroupMaster,
  (state) => state.status
);
