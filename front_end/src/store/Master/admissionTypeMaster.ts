import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAdmissionTypeMaster } from "../../interfaces/Master/IAdmissionTypeMaster";

interface AdmissionTypeMaster {
    getAllAdmissionTypeMasterData: IAdmissionTypeMaster[];
    getByIDAdmissionTypeMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteAdmissionTypeMaster: any;
    deleteAdmissionTypeMaster: any;
    getOptionAdmissionTypeMasterData: IAdmissionTypeMaster[];
  }

  const initialState: AdmissionTypeMaster = {
    getAllAdmissionTypeMasterData: [],
    getByIDAdmissionTypeMaster: null,
    status: "idle",
    saveUpdadteAdmissionTypeMaster: null,
    deleteAdmissionTypeMaster: null,
    getOptionAdmissionTypeMasterData: [],
  };

  export const slice = createSlice({
    name: "AdmissionTypeMaster",
    initialState,
    reducers: {
      load: () => {
        //load  nothing
      },
      loadOptionsAdmissionType: () => {
        //load  nothing
      },
      setLoadGetAllAdmissionTypeMaster: (state, action: PayloadAction<any>) => {
        state.getAllAdmissionTypeMasterData = action.payload;
      },
      loadGetByIdAdmissionTypeMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdAdmissionTypeMaster: (state, action: PayloadAction<any>) => {
        state.getByIDAdmissionTypeMaster = action.payload;
      },
      loadSaveUpdateAdmissionTypeMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateAdmissionTypeMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteAdmissionTypeMaster = action.payload;
      },
      loadDeleteAdmissionTypeMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteAdmissionTypeMaster: (state, action: PayloadAction<any>) => {
        state.deleteAdmissionTypeMaster = action.payload;
      },
      setLoadGetOptionAdmissionTypeMaster: (state, action: PayloadAction<any>) => {
        state.getOptionAdmissionTypeMasterData = action.payload;
      },
  
      setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
        state.status = action.payload;
      },
    },
  });

  export const { reducer, actions } = slice;

  export const selectAdmissionTypeMaster = (state: RootState) => state.admissionTypeMaster;

  export const getAllAdmissionTypeMaster= createSelector(
    selectAdmissionTypeMaster,
    (AdmissionType) => AdmissionType.getAllAdmissionTypeMasterData
  );
  export const getbyIdAdmissionTypeMaster= createSelector(
    selectAdmissionTypeMaster,
    (AdmissionType) => AdmissionType.getByIDAdmissionTypeMaster
  );
  export const getSaveUpdateAdmissionTypeMaster= createSelector(
    selectAdmissionTypeMaster,
    (AdmissionType) => AdmissionType.saveUpdadteAdmissionTypeMaster
  );
  export const getDeleteAdmissionTypeMaster= createSelector(
    selectAdmissionTypeMaster,
    (AdmissionType) => AdmissionType.deleteAdmissionTypeMaster
  );
  export const getOptionAdmissionTypeMaster= createSelector(
    selectAdmissionTypeMaster,
    (AdmissionType) => AdmissionType.getOptionAdmissionTypeMasterData
  );
  export const selectStatus = createSelector(
    selectAdmissionTypeMaster,
    (state) => state.status
  );
  