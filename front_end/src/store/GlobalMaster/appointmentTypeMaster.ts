/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAppointmentTypeMaster } from "../../interfaces/GlobalMaster/IAppointmentTypeMaster";

interface AppointmentTypeMaster {
  getAllAppointmentTypeMasterData: IAppointmentTypeMaster[];
  getByIDAppointmentTypeMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateAppointmentTypeMaster: any;
  deleteAppointmentTypeMaster: any;
  getOptionAppointmentTypeMasterData: IAppointmentTypeMaster[];
}
const initialState: AppointmentTypeMaster = {
  getAllAppointmentTypeMasterData: [],
  getByIDAppointmentTypeMaster: null,
  status: "idle",
  saveUpdateAppointmentTypeMaster: null,
  deleteAppointmentTypeMaster: null,
  getOptionAppointmentTypeMasterData: [],
};

export const slice = createSlice({
  name: "AppointmentTypeMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionAppointmentType: () => {
      //load  nothing
    },
    setLoadGetAllAppointmentTypeMaster: (state, action: PayloadAction<any>) => {
      state.getAllAppointmentTypeMasterData = action.payload;
    },
    loadGetByIdAppointmentTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdAppointmentTypeMaster: (state, action: PayloadAction<any>) => {
      state.getByIDAppointmentTypeMaster = action.payload;
    },
    loadSaveUpdateAppointmentTypeMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setSaveUpdateAppointmentTypeMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateAppointmentTypeMaster = action.payload;
    },
    loadDeleteAppointmentTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteAppointmentTypeMaster: (state, action: PayloadAction<any>) => {
      state.deleteAppointmentTypeMaster = action.payload;
    },
    setLoadGetOptionAppointmentTypeMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.getOptionAppointmentTypeMasterData = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAppointmentTypeMaster = (state: RootState) =>
  state.appointmentTypeMaster;

export const getAllAppointmentTypeMaster = createSelector(
  selectAppointmentTypeMaster,
  (AppointmentType) => AppointmentType.getAllAppointmentTypeMasterData
);
export const getbyIdAppointmentTypeMaster = createSelector(
  selectAppointmentTypeMaster,
  (AppointmentType) => AppointmentType.getByIDAppointmentTypeMaster
);
export const getSaveUpdateAppointmentTypeMaster = createSelector(
  selectAppointmentTypeMaster,
  (AppointmentType) => AppointmentType.saveUpdateAppointmentTypeMaster
);
export const getDeleteAppointmentTypeMaster = createSelector(
  selectAppointmentTypeMaster,
  (AppointmentType) => AppointmentType.deleteAppointmentTypeMaster
);
export const getOptionAppointmentTypeMaster = createSelector(
  selectAppointmentTypeMaster,
  (AppointmentType) => AppointmentType.getOptionAppointmentTypeMasterData
);
export const selectStatus = createSelector(
  selectAppointmentTypeMaster,
  (state) => state.status
);
