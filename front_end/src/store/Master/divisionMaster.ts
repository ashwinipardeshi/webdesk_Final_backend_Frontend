import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IDivisionMaster } from "../../interfaces/Master/IDivisionMaster";


interface DivisionMaster {
    getAllDivisionMasterData: IDivisionMaster[];
    getByIDDivisionMaster: any;
    saveUpdadteDivisionMaster: any;
    deleteDivisionMaster: any;
    getOptionDivisionMasterData: IDivisionMaster[];
  }


  const initialState: DivisionMaster = {
    getAllDivisionMasterData: [],
    getByIDDivisionMaster: null,
    saveUpdadteDivisionMaster: null,
    deleteDivisionMaster: null,
    getOptionDivisionMasterData: [],
  };


  export const slice = createSlice({
    name: "divisionMaster",
    initialState,
    reducers: {
      load: () => {
      
      },
      loadOptions: () => {
        //load  nothing
      },
      setLoadGetAllDivisionMaster: (state, action: PayloadAction<any>) => {
        state.getAllDivisionMasterData = action.payload;
      },
      loadGetByIdDivisionMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdDivisionMaster: (state, action: PayloadAction<any>) => {
        state.getByIDDivisionMaster = action.payload;
      },
      loadSaveUpdateDivisionMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateDivisionMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteDivisionMaster = action.payload;
      },
      loadDeleteDivisionMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteDivisionMaster: (state, action: PayloadAction<any>) => {
        state.deleteDivisionMaster = action.payload;
      },
      setLoadGetOptionDivisionMaster: (state, action: PayloadAction<any>) => {
        state.getOptionDivisionMasterData = action.payload;
      },
  
    },
  });


export const { reducer, actions } = slice;
export const selectDivisionMaster = (state: RootState) => state.divisionMasterReducer;


export const getAllDivisionMaster = createSelector(
    selectDivisionMaster,
    (state) => state.getAllDivisionMasterData
  );
  export const getbyIdDivisionMaster = createSelector(
    selectDivisionMaster,
    (state) => state.getByIDDivisionMaster
  );
  export const getSaveUpdateDivisionMaster = createSelector(
    selectDivisionMaster,
    (state) => state.saveUpdadteDivisionMaster
  );
  export const getDeleteDivisionMaster = createSelector(
    selectDivisionMaster,
    (state) => state.deleteDivisionMaster
  );
  export const getOptionDivisionMaster = createSelector(
    selectDivisionMaster,
    (state) => state.getOptionDivisionMasterData
  );

  