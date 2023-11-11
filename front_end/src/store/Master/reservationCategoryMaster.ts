import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IReservationCategoryMaster } from "../../interfaces/Master/IReservationCategoryMaster";

interface ReservationCategoryMaster {
    getAllReservationCategoryMasterData: IReservationCategoryMaster[];
    getByIDReservationCategoryMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteReservationCategoryMaster: any;
    deleteReservationCategoryMaster: any;
    getOptionReservationCategoryMasterData: IReservationCategoryMaster[];
  }
  const initialState: ReservationCategoryMaster = {
    getAllReservationCategoryMasterData: [],
    getByIDReservationCategoryMaster: null,
    status: "idle",
    saveUpdadteReservationCategoryMaster: null,
    deleteReservationCategoryMaster: null,
    getOptionReservationCategoryMasterData: [],
  };
  
  export const slice = createSlice({
    name: "ReservationCategoryMaster",
    initialState,
    reducers: {
      load: () => {
      
      },
      loadOptions: () => {
        //load  nothing
      },
      setLoadGetAllReservationCategoryMaster: (state, action: PayloadAction<any>) => {
        state.getAllReservationCategoryMasterData = action.payload;
      },
      loadGetByIdReservationCategoryMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdReservationCategoryMaster: (state, action: PayloadAction<any>) => {
        state.getByIDReservationCategoryMaster = action.payload;
      },
      loadSaveUpdateReservationCategoryMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateReservationCategoryMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteReservationCategoryMaster = action.payload;
      },
      loadDeleteReservationCategoryMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteReservationCategoryMaster: (state, action: PayloadAction<any>) => {
        state.deleteReservationCategoryMaster = action.payload;
      },
      setLoadGetOptionReservationCategoryMaster: (state, action: PayloadAction<any>) => {
        state.getOptionReservationCategoryMasterData = action.payload;
      },
  
      setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
        state.status = action.payload;
      },
    },
  });

export const { reducer, actions } = slice;


export const selectReservationCategoryMaster = (state: RootState) => state.reservationCategoryMaster;

export const getAllReservationCategoryMaster = createSelector(
    selectReservationCategoryMaster,
    (ReservationCategory) => ReservationCategory.getAllReservationCategoryMasterData
  );
  export const getbyIdReservationCategoryMaster = createSelector(
    selectReservationCategoryMaster,
    (ReservationCategory) => ReservationCategory.getByIDReservationCategoryMaster
  );
  export const getSaveUpdateReservationCategoryMaster = createSelector(
    selectReservationCategoryMaster,
    (ReservationCategory) => ReservationCategory.saveUpdadteReservationCategoryMaster
  );
  export const getDeleteReservationCategoryMaster = createSelector(
    selectReservationCategoryMaster,
    (ReservationCategory) => ReservationCategory.deleteReservationCategoryMaster
  );
  export const getOptionReservationCategoryMaster = createSelector(
    selectReservationCategoryMaster,
    (ReservationCategory) => ReservationCategory.getOptionReservationCategoryMasterData
  );
  export const selectStatus = createSelector(
    selectReservationCategoryMaster,
    (state) => state.status
  );
  
