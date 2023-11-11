import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IStreamMaster } from "../../interfaces/Master/IStreamMaster";

interface StreamMaster {
  getAllStreamMasterData: IStreamMaster[];
  getByIDStreamMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdadteStreamMaster: any;
  deleteStreamMaster: any;
  getOptionStreamMasterData: IStreamMaster[];
}
const initialState: StreamMaster = {
  getAllStreamMasterData: [],
  getByIDStreamMaster: null,
  status: "idle",
  saveUpdadteStreamMaster: null,
  deleteStreamMaster: null,
  getOptionStreamMasterData: [],
};

export const slice = createSlice({
  name: "StreamMaster",
  initialState,
  reducers: {
    load: () => {
    
    },
    loadOptions: () => {
      //load  nothing
    },
    setLoadGetAllStreamMaster: (state, action: PayloadAction<any>) => {
      state.getAllStreamMasterData = action.payload;
    },
    loadGetByIdStreamMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdStreamMaster: (state, action: PayloadAction<any>) => {
      state.getByIDStreamMaster = action.payload;
    },
    loadSaveUpdateStreamMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateStreamMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteStreamMaster = action.payload;
    },
    loadDeleteStreamMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteStreamMaster: (state, action: PayloadAction<any>) => {
      state.deleteStreamMaster = action.payload;
    },
    setLoadGetOptionStreamMaster: (state, action: PayloadAction<any>) => {
      state.getOptionStreamMasterData = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectStreamMaster = (state: RootState) => state.streamMaster;

export const getAllStreamMaster = createSelector(
  selectStreamMaster,
  (Stream) => Stream.getAllStreamMasterData
);
export const getbyIdStreamMaster = createSelector(
  selectStreamMaster,
  (Stream) => Stream.getByIDStreamMaster
);
export const getSaveUpdateStreamMaster = createSelector(
  selectStreamMaster,
  (Stream) => Stream.saveUpdadteStreamMaster
);
export const getDeleteStreamMaster = createSelector(
  selectStreamMaster,
  (Stream) => Stream.deleteStreamMaster
);
export const getOptionStreamMaster = createSelector(
  selectStreamMaster,
  (Stream) => Stream.getOptionStreamMasterData
);
export const selectStatus = createSelector(
  selectStreamMaster,
  (state) => state.status
);
