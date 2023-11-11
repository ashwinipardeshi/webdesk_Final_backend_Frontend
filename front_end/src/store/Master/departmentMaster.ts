import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IDepartmentMaster } from "../../interfaces/Master/IDepartmentMaster";

interface DepartmentMaster {
    getAllDepartmentMasterData: IDepartmentMaster[];
    getByIDDepartmentMaster: any;
    saveUpdadteDepartmentMaster: any;
    deleteDepartmentMaster: any;
    getOptionDepartmentMasterData: IDepartmentMaster[];
  }

  const initialState: DepartmentMaster = {
    getAllDepartmentMasterData: [],
    getByIDDepartmentMaster: null,
    saveUpdadteDepartmentMaster: null,
    deleteDepartmentMaster: null,
    getOptionDepartmentMasterData: [],
  };

  export const slice = createSlice({
    name: "DepartmentMaster",
    initialState,
    reducers: {
      load: () => {
        //load  nothing
      },
      loadOptions: () => {
        //load  nothing
      },
      setLoadGetAllDepartmentMaster: (state, action: PayloadAction<any>) => {
        state.getAllDepartmentMasterData = action.payload;
      },
      loadGetByIdDepartmentMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdDepartmentMaster: (state, action: PayloadAction<any>) => {
        state.getByIDDepartmentMaster = action.payload;
      },
      loadSaveUpdateDepartmentMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateDepartmentMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteDepartmentMaster = action.payload;
      },
      loadDeleteDepartmentMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteDepartmentMaster: (state, action: PayloadAction<any>) => {
        state.deleteDepartmentMaster = action.payload;
      },
      setLoadGetOptionDepartmentMaster: (state, action: PayloadAction<any>) => {
        state.getOptionDepartmentMasterData = action.payload;
      },
    },
  });

  export const { reducer, actions } = slice;
  export const selectDepartmentMaster = (state: RootState) => state.departmentMaster;
  export const getAllDepartmentMaster= createSelector(
    selectDepartmentMaster,
    (Department) => Department.getAllDepartmentMasterData
  );
  export const getbyIdDepartmentMaster= createSelector(
    selectDepartmentMaster,
    (Department) => Department.getByIDDepartmentMaster
  );
  export const getSaveUpdateDepartmentMaster= createSelector(
    selectDepartmentMaster,
    (Department) => Department.saveUpdadteDepartmentMaster
  );
  export const getDeleteDepartmentMaster= createSelector(
    selectDepartmentMaster,
    (Department) => Department.deleteDepartmentMaster
  );
  export const getOptionDepartmentMaster= createSelector(
    selectDepartmentMaster,
    (Department) => Department.getOptionDepartmentMasterData
  );
  