import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IModuleMaster } from "../../interfaces/Master/IModuleMaster";



interface ModuleMaster {
  getAllModuleMasterData: IModuleMaster[];
  getByIDModuleMaster: any;
  saveUpdadteModuleMaster: any;
  deleteModuleMaster: any;
  getOptionModuleMasterData: IModuleMaster[];
}
const initialState: ModuleMaster = {
  getAllModuleMasterData: [],
  getByIDModuleMaster: null,
  saveUpdadteModuleMaster: null,
  deleteModuleMaster: null,
  getOptionModuleMasterData: [],
};

export const slice = createSlice({
  name: "ModuleMaster",
  initialState,
  reducers: {
    load: () => {
    
    },
    loadOptions: () => {
      //load  nothing
    },
    setLoadGetAllModuleMaster: (state, action: PayloadAction<any>) => {
      state.getAllModuleMasterData = action.payload;
    },
    loadGetByIdModuleMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdModuleMaster: (state, action: PayloadAction<any>) => {
      state.getByIDModuleMaster = action.payload;
    },
    loadSaveUpdateModuleMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateModuleMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteModuleMaster = action.payload;
    },
    loadDeleteModuleMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteModuleMaster: (state, action: PayloadAction<any>) => {
      state.deleteModuleMaster = action.payload;
    },
    setLoadGetOptionModuleMaster: (state, action: PayloadAction<any>) => {
      state.getOptionModuleMasterData = action.payload;
    },

  },
});

export const { reducer, actions } = slice;

export const selectModuleMaster = (state: RootState) => state.moduleMaster;

export const getAllModuleMaster = createSelector(
  selectModuleMaster,
  (State) => State.getAllModuleMasterData
);
export const getbyIdModuleMaster = createSelector(
  selectModuleMaster,
  (State) => State.getByIDModuleMaster
);
export const getSaveUpdateModuleMaster = createSelector(
  selectModuleMaster,
  (State) => State.saveUpdadteModuleMaster
);
export const getDeleteModuleMaster = createSelector(
  selectModuleMaster,
  (State) => State.deleteModuleMaster
);
export const getOptionModuleMaster = createSelector(
  selectModuleMaster,
  (State) => State.getOptionModuleMasterData
);

