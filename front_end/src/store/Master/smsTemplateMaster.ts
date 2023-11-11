import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ISMSTemplateMaster } from "../../interfaces/Master";

interface SMSTemplateMaster {
  getAllSMSTemplateMasterData: ISMSTemplateMaster[];
  getByIDSMSTemplateMaster: any;
  saveUpdadteSMSTemplateMaster: any;
  deleteSMSTemplateMaster: any;
  getOptionSMSTemplateMasterData: ISMSTemplateMaster[];
}
const initialState: SMSTemplateMaster = {
  getAllSMSTemplateMasterData: [],
  getByIDSMSTemplateMaster: null,
  saveUpdadteSMSTemplateMaster: null,
  deleteSMSTemplateMaster: null,
  getOptionSMSTemplateMasterData: [],
};

export const slice = createSlice({
  name: "SMSTemplateMaster",
  initialState,
  reducers: {
    load: () => {
    
    },
    loadOptions: () => {
      //load  nothing
    },
    setLoadGetAllSMSTemplateMaster: (state, action: PayloadAction<any>) => {
      state.getAllSMSTemplateMasterData = action.payload;
    },
    loadGetByIdSMSTemplateMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdSMSTemplateMaster: (state, action: PayloadAction<any>) => {
      state.getByIDSMSTemplateMaster = action.payload;
    },
    loadSaveUpdateSMSTemplateMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateSMSTemplateMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteSMSTemplateMaster = action.payload;
    },
    loadDeleteSMSTemplateMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteSMSTemplateMaster: (state, action: PayloadAction<any>) => {
      state.deleteSMSTemplateMaster = action.payload;
    },
    setLoadGetOptionSMSTemplateMaster: (state, action: PayloadAction<any>) => {
      state.getOptionSMSTemplateMasterData = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectSMSTemplateMaster = (state: RootState) => state.smsTemplateMaster;

export const getAllSMSTemplateMaster = createSelector(
  selectSMSTemplateMaster,
  (SMSTemplate) => SMSTemplate.getAllSMSTemplateMasterData
);
export const getbyIdSMSTemplateMaster = createSelector(
  selectSMSTemplateMaster,
  (SMSTemplate) => SMSTemplate.getByIDSMSTemplateMaster
);
export const getSaveUpdateSMSTemplateMaster = createSelector(
  selectSMSTemplateMaster,
  (SMSTemplate) => SMSTemplate.saveUpdadteSMSTemplateMaster
);
export const getDeleteSMSTemplateMaster = createSelector(
  selectSMSTemplateMaster,
  (SMSTemplate) => SMSTemplate.deleteSMSTemplateMaster
);
export const getOptionSMSTemplateMaster = createSelector(
  selectSMSTemplateMaster,
  (SMSTemplate) => SMSTemplate.getOptionSMSTemplateMasterData
);
