import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IDocumentMaster } from "../../interfaces/Master/IDocumentMaster";


interface DocumentMaster {
  getAllDocumentMasterData: IDocumentMaster[];
  getByIDDocumentMaster: any;
  saveUpdadteDocumentMaster: any;
  deleteDocumentMaster: any;
  getOptionDocumentMasterData: IDocumentMaster[];
}
const initialState: DocumentMaster = {
  getAllDocumentMasterData: [],
  getByIDDocumentMaster: null,
  saveUpdadteDocumentMaster: null,
  deleteDocumentMaster: null,
  getOptionDocumentMasterData: [],
};

export const slice = createSlice({
  name: "DocumentMaster",
  initialState,
  reducers: {
    load: () => {
    
    },
    loadOptions: () => {
      //load  nothing
    },
    setLoadGetAllDocumentMaster: (state, action: PayloadAction<any>) => {
      state.getAllDocumentMasterData = action.payload;
    },
    loadGetByIdDocumentMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdDocumentMaster: (state, action: PayloadAction<any>) => {
      state.getByIDDocumentMaster = action.payload;
    },
    loadSaveUpdateDocumentMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateDocumentMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteDocumentMaster = action.payload;
    },
    loadDeleteDocumentMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteDocumentMaster: (state, action: PayloadAction<any>) => {
      state.deleteDocumentMaster = action.payload;
    },
    setLoadGetOptionDocumentMaster: (state, action: PayloadAction<any>) => {
      state.getOptionDocumentMasterData = action.payload;
    },

  },
});

export const { reducer, actions } = slice;

export const selectDocumentMaster = (state: RootState) => state.documentMaster;

export const getAllDocumentMaster = createSelector(
  selectDocumentMaster,
  (State) => State.getAllDocumentMasterData
);
export const getbyIdDocumentMaster = createSelector(
  selectDocumentMaster,
  (State) => State.getByIDDocumentMaster
);
export const getSaveUpdateDocumentMaster = createSelector(
  selectDocumentMaster,
  (State) => State.saveUpdadteDocumentMaster
);
export const getDeleteDocumentMaster = createSelector(
  selectDocumentMaster,
  (State) => State.deleteDocumentMaster
);
export const getOptionDocumentMaster = createSelector(
  selectDocumentMaster,
  (State) => State.getOptionDocumentMasterData
);

