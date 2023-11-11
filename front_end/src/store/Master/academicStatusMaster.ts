import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAcademicStatusMaster } from "../../interfaces/Master/IAcademicStatusMaster";

interface AcademicStatusMaster {
    getAllAcademicStatusMasterData: IAcademicStatusMaster[];
    getByIDAcademicStatusMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteAcademicStatusMaster: any;
    deleteAcademicStatusMaster: any;
    getOptionAcademicStatusMasterData: IAcademicStatusMaster[];
  }

  const initialState: AcademicStatusMaster = {
    getAllAcademicStatusMasterData: [],
    getByIDAcademicStatusMaster: null,
    status: "idle",
    saveUpdadteAcademicStatusMaster: null,
    deleteAcademicStatusMaster: null,
    getOptionAcademicStatusMasterData: [],
  };

export const slice = createSlice({
    name: "AcademicStatusMaster",
    initialState,
    reducers: {
      load: () => {
        //load  nothing
      },
      loadOptionsAcademicStatus: () => {
        //load  nothing
      },
      setLoadGetAllAcademicStatusMaster: (state, action: PayloadAction<any>) => {
        state.getAllAcademicStatusMasterData = action.payload;
      },
      loadGetByIdAcademicStatusMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdAcademicStatusMaster: (state, action: PayloadAction<any>) => {
        state.getByIDAcademicStatusMaster = action.payload;
      },
      loadSaveUpdateAcademicStatusMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateAcademicStatusMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteAcademicStatusMaster = action.payload;
      },
      loadDeleteAcademicStatusMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteAcademicStatusMaster: (state, action: PayloadAction<any>) => {
        state.deleteAcademicStatusMaster = action.payload;
      },
      setLoadGetOptionAcademicStatusMaster: (state, action: PayloadAction<any>) => {
        state.getOptionAcademicStatusMasterData = action.payload;
      },
  
      setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
        state.status = action.payload;
      },
    },
});

  export const { reducer, actions } = slice;

  export const selectAcademicStatusMaster = (state: RootState) => state.academicStatusMaster;

  
  export const getAllAcademicStatusMaster= createSelector(
    selectAcademicStatusMaster,
    (AcademicStatus) => AcademicStatus.getAllAcademicStatusMasterData
  );
  export const getbyIdAcademicStatusMaster= createSelector(
    selectAcademicStatusMaster,
    (AcademicStatus) => AcademicStatus.getByIDAcademicStatusMaster
  );
  export const getSaveUpdateAcademicStatusMaster= createSelector(
    selectAcademicStatusMaster,
    (AcademicStatus) => AcademicStatus.saveUpdadteAcademicStatusMaster
  );
  export const getDeleteAcademicStatusMaster= createSelector(
    selectAcademicStatusMaster,
    (AcademicStatus) => AcademicStatus.deleteAcademicStatusMaster
  );
  export const getOptionAcademicStatusMaster= createSelector(
    selectAcademicStatusMaster,
    (AcademicStatus) => AcademicStatus.getOptionAcademicStatusMasterData
  );
  export const selectStatus = createSelector(
    selectAcademicStatusMaster,
    (state) => state.status
  );
 
