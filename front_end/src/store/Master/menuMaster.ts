import { IMenuMaster } from "../../interfaces/Master/IMenuMaster";
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
interface MenuMaster {
    getAllMenuMasterData: IMenuMaster[];
    getByIDMenuMaster: any;
    saveUpdadteMenuMaster: any;
    deleteMenuMaster: any;
    getOptionMenuMasterData: IMenuMaster[];
  }

  const initialState: MenuMaster = {
    getAllMenuMasterData: [],
    getByIDMenuMaster: null,
    saveUpdadteMenuMaster: null,
    deleteMenuMaster: null,
    getOptionMenuMasterData: [],
  };


  export const slice = createSlice({
    name: "MenuMaster",
    initialState,
    reducers: {
      load: () => {
      
      },
      loadOptions: () => {
        //load  nothing
      },
      setLoadGetAllMenuMaster: (state, action: PayloadAction<any>) => {
        state.getAllMenuMasterData = action.payload;
      },
      loadGetByIdMenuMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdMenuMaster: (state, action: PayloadAction<any>) => {
        state.getByIDMenuMaster = action.payload;
      },
      loadSaveUpdateMenuMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateMenuMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteMenuMaster = action.payload;
      },
      loadDeleteMenuMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteMenuMaster: (state, action: PayloadAction<any>) => {
        state.deleteMenuMaster = action.payload;
      },
      setLoadGetOptionMenuMaster: (state, action: PayloadAction<any>) => {
        state.getOptionMenuMasterData = action.payload;
      },
  
    },
  });
  
  export const { reducer, actions } = slice;
  
  export const selectMenuMaster = (state: RootState) => state.menuMaster;
  
  export const getAllMenuMaster = createSelector(
    selectMenuMaster,
    (State) => State.getAllMenuMasterData
  );
  export const getbyIdMenuMaster = createSelector(
    selectMenuMaster,
    (State) => State.getByIDMenuMaster
  );
  export const getSaveUpdateMenuMaster = createSelector(
    selectMenuMaster,
    (State) => State.saveUpdadteMenuMaster
  );
  export const getDeleteMenuMaster = createSelector(
    selectMenuMaster,
    (State) => State.deleteMenuMaster
  );
  export const getOptionMenuMaster = createSelector(
    selectMenuMaster,
    (State) => State.getOptionMenuMasterData
  );
  