import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IDesignationMaster } from "../../interfaces/Master/IDesignationMaster";

interface DesignationMaster {
    getAllDesignationMasterData: IDesignationMaster[];
    getByIDDesignationMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteDesignationMaster: any;
    deleteDesignationMaster: any;
    getOptionDesignationMasterData: IDesignationMaster[];
  }

  const initialState: DesignationMaster = {
    getAllDesignationMasterData: [],
    getByIDDesignationMaster: null,
    status: "idle",
    saveUpdadteDesignationMaster: null,
    deleteDesignationMaster: null,
    getOptionDesignationMasterData: [],
  };
  
  export const slice = createSlice({
    name: "DesignationMaster",
    initialState,
    reducers: {
      load: () => {
      
      },
      loadOptions: () => {
        //load  nothing
      },
      setLoadGetAllDesignationMaster: (state, action: PayloadAction<any>) => {
        state.getAllDesignationMasterData = action.payload;
      },
      loadGetByIdDesignationMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdDesignationMaster: (state, action: PayloadAction<any>) => {
        state.getByIDDesignationMaster = action.payload;
      },
      loadSaveUpdateDesignationMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateDesignationMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteDesignationMaster = action.payload;
      },
      loadDeleteDesignationMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteDesignationMaster: (state, action: PayloadAction<any>) => {
        state.deleteDesignationMaster = action.payload;
      },
      setLoadGetOptionDesignationMaster: (state, action: PayloadAction<any>) => {
        state.getOptionDesignationMasterData = action.payload;
      },
  
      setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
        state.status = action.payload;
      },
    },
  });

export const { reducer, actions } = slice;

export const selectDesignationMaster = (state: RootState) => state.designationMaster;

export const getAllDesignationMaster = createSelector(
    selectDesignationMaster,
    (Designation) => Designation.getAllDesignationMasterData
  );
  export const getbyIdDesignationMaster = createSelector(
    selectDesignationMaster,
    (Designation) => Designation.getByIDDesignationMaster
  );
  export const getSaveUpdateDesignationMaster = createSelector(
    selectDesignationMaster,
    (Designation) => Designation.saveUpdadteDesignationMaster
  );
  export const getDeleteDesignationMaster = createSelector(
    selectDesignationMaster,
    (Designation) => Designation.deleteDesignationMaster
  );
  export const getOptionDesignationMaster = createSelector(
    selectDesignationMaster,
    (Designation) => Designation.getOptionDesignationMasterData
  );
  export const selectStatus = createSelector(
    selectDesignationMaster,
    (state) => state.status
  );
  