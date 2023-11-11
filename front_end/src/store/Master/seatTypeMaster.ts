import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ISeatTypeMaster } from "../../interfaces/Master/ISeatTypeMaster";

interface SeatTypeMaster {
  getAllSeatTypeMasterData: ISeatTypeMaster[];
  getByIDSeatTypeMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdadteSeatTypeMaster: any;
  deleteSeatTypeMaster: any;
  getOptionSeatTypeMasterData: ISeatTypeMaster[];
}
const initialState: SeatTypeMaster = {
  getAllSeatTypeMasterData: [],
  getByIDSeatTypeMaster: null,
  status: "idle",
  saveUpdadteSeatTypeMaster: null,
  deleteSeatTypeMaster: null,
  getOptionSeatTypeMasterData: [],
};

export const slice = createSlice({
  name: "SeatTypeMaster",
  initialState,
  reducers: {
    load: () => {
    
    },
    loadOptions: () => {
      //load  nothing
    },
    setLoadGetAllSeatTypeMaster: (state, action: PayloadAction<any>) => {
      state.getAllSeatTypeMasterData = action.payload;
    },
    loadGetByIdSeatTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdSeatTypeMaster: (state, action: PayloadAction<any>) => {
      state.getByIDSeatTypeMaster = action.payload;
    },
    loadSaveUpdateSeatTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateSeatTypeMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteSeatTypeMaster = action.payload;
    },
    loadDeleteSeatTypeMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteSeatTypeMaster: (state, action: PayloadAction<any>) => {
      state.deleteSeatTypeMaster = action.payload;
    },
    setLoadGetOptionSeatTypeMaster: (state, action: PayloadAction<any>) => {
      state.getOptionSeatTypeMasterData = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectSeatTypeMaster = (state: RootState) => state.seatTypeMaster;

export const getAllSeatTypeMaster = createSelector(
  selectSeatTypeMaster,
  (SeatType) => SeatType.getAllSeatTypeMasterData
);
export const getbyIdSeatTypeMaster = createSelector(
  selectSeatTypeMaster,
  (SeatType) => SeatType.getByIDSeatTypeMaster
);
export const getSaveUpdateSeatTypeMaster = createSelector(
  selectSeatTypeMaster,
  (SeatType) => SeatType.saveUpdadteSeatTypeMaster
);
export const getDeleteSeatTypeMaster = createSelector(
  selectSeatTypeMaster,
  (SeatType) => SeatType.deleteSeatTypeMaster
);
export const getOptionSeatTypeMaster = createSelector(
  selectSeatTypeMaster,
  (SeatType) => SeatType.getOptionSeatTypeMasterData
);
export const selectStatus = createSelector(
  selectSeatTypeMaster,
  (state) => state.status
);
