import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ISMTPConfigMaster } from "../../interfaces/Master/ISMTPConfigMaster";

interface SMTPConfigMaster {
    getAllSMTPConfigMasterData: ISMTPConfigMaster[];
    getByIDSMTPConfigMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteSMTPConfigMaster: any;
    deleteSMTPConfigMaster: any;
    getOptionSMTPConfigMasterData: ISMTPConfigMaster[];
  }
  const initialState: SMTPConfigMaster = {
    getAllSMTPConfigMasterData: [],
    getByIDSMTPConfigMaster: null,
    status: "idle",
    saveUpdadteSMTPConfigMaster: null,
    deleteSMTPConfigMaster: null,
    getOptionSMTPConfigMasterData: [],
  };

  export const slice = createSlice({
    name: "SMTPConfigMaster",
    initialState,
    reducers: {
      load: () => {
      
      },
      loadOptions: () => {
        //load  nothing
      },
      setLoadGetAllSMTPConfigMaster: (state, action: PayloadAction<any>) => {
        state.getAllSMTPConfigMasterData = action.payload;
      },
      loadGetByIdSMTPConfigMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdSMTPConfigMaster: (state, action: PayloadAction<any>) => {
        state.getByIDSMTPConfigMaster = action.payload;
      },
      loadSaveUpdateSMTPConfigMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateSMTPConfigMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteSMTPConfigMaster = action.payload;
      },
      loadDeleteSMTPConfigMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteSMTPConfigMaster: (state, action: PayloadAction<any>) => {
        state.deleteSMTPConfigMaster = action.payload;
      },
      setLoadGetOptionSMTPConfigMaster: (state, action: PayloadAction<any>) => {
        state.getOptionSMTPConfigMasterData = action.payload;
      },
  
      setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
        state.status = action.payload;
      },
    },
  });

  export const { reducer, actions } = slice;

  export const selectSMTPConfigMaster = (state: RootState) => state.smtpConfigMaster;

  export const getAllSMTPConfigMaster = createSelector(
    selectSMTPConfigMaster,
    (SMTPConfig) => SMTPConfig.getAllSMTPConfigMasterData
  );
  export const getbyIdSMTPConfigMaster = createSelector(
    selectSMTPConfigMaster,
    (SMTPConfig) => SMTPConfig.getByIDSMTPConfigMaster
  );
  export const getSaveUpdateSMTPConfigMaster = createSelector(
    selectSMTPConfigMaster,
    (SMTPConfig) => SMTPConfig.saveUpdadteSMTPConfigMaster
  );
  export const getDeleteSMTPConfigMaster = createSelector(
    selectSMTPConfigMaster,
    (SMTPConfig) => SMTPConfig.deleteSMTPConfigMaster
  );
  export const getOptionSMTPConfigMaster = createSelector(
    selectSMTPConfigMaster,
    (SMTPConfig) => SMTPConfig.getOptionSMTPConfigMasterData
  );
  export const selectStatus = createSelector(
    selectSMTPConfigMaster,
    (state) => state.status
  );
  
  