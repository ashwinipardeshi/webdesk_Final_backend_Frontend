/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IEmployeeTypeMaster } from "../../interfaces/GlobalMaster/IEmployeeTypeMaster";

interface EmployeeTypeMaster {
  getAllEmployeeTypeMasterData: IEmployeeTypeMaster[];
  getByIDEmployeeTypeMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateEmployeeTypeMaster: any;
  deleteEmployeeTypeMaster: any;
  getOptionEmployeeTypeMasterData: IEmployeeTypeMaster[];
}
const initialState: EmployeeTypeMaster = {
  getAllEmployeeTypeMasterData: [],
  getByIDEmployeeTypeMaster: null,
  status: "idle",
  saveUpdateEmployeeTypeMaster: null,
  deleteEmployeeTypeMaster: null,
  getOptionEmployeeTypeMasterData: [],
};

export const slice = createSlice({
  name: "EmployeeTypeMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionEmployee: () => {
      //load  nothing
    },
    setLoadGetAllEmployeeTypeMaster: (state, action: PayloadAction<any>) => {
      state.getAllEmployeeTypeMasterData = action.payload;
    },
    loadGetByIdEmployeeTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdEmployeeTypeMaster: (state, action: PayloadAction<any>) => {
      state.getByIDEmployeeTypeMaster = action.payload;
    },
    loadSaveUpdateEmployeeTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateEmployeeTypeMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateEmployeeTypeMaster = action.payload;
    },
    loadDeleteEmployeeTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteEmployeeTypeMaster: (state, action: PayloadAction<any>) => {
      state.deleteEmployeeTypeMaster = action.payload;
    },
    setLoadGetOptionEmployeeTypeMaster: (state, action: PayloadAction<any>) => {
      state.getOptionEmployeeTypeMasterData = action.payload;
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
export const selectEmployeeTypeMaster = (state: RootState) =>
  state.employeeTypeMaster;

export const getAllEmployeeTypeMaster = createSelector(
  selectEmployeeTypeMaster,
  (EmployeeType) => EmployeeType.getAllEmployeeTypeMasterData
);
export const getbyIdEmployeeTypeMaster = createSelector(
  selectEmployeeTypeMaster,
  (EmployeeType) => EmployeeType.getByIDEmployeeTypeMaster
);
export const getSaveUpdateEmployeeTypeMaster = createSelector(
  selectEmployeeTypeMaster,
  (EmployeeType) => EmployeeType.saveUpdateEmployeeTypeMaster
);
export const getDeleteEmployeeTypeMaster = createSelector(
  selectEmployeeTypeMaster,
  (EmployeeType) => EmployeeType.deleteEmployeeTypeMaster
);
export const getOptionEmployeeTypeMaster = createSelector(
  selectEmployeeTypeMaster,
  (EmployeeType) => EmployeeType.getOptionEmployeeTypeMasterData
);
export const selectStatus = createSelector(
  selectEmployeeTypeMaster,
  (state) => state.status
);
