import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IAllotmentCategoryMaster } from "../../interfaces/Master";

interface AllotmentCategoryMaster {
    getAllAllotmentCategoryMasterData: IAllotmentCategoryMaster[];
    getByIDAllotmentCategoryMaster: any;
    saveUpdadteAllotmentCategoryMaster: any;
    deleteAllotmentCategoryMaster: any;
    getOptionAllotmentCategoryMasterData: IAllotmentCategoryMaster[];
  }

  const initialState: AllotmentCategoryMaster = {
    getAllAllotmentCategoryMasterData: [],
    getByIDAllotmentCategoryMaster: null,
    saveUpdadteAllotmentCategoryMaster: null,
    deleteAllotmentCategoryMaster: null,
    getOptionAllotmentCategoryMasterData: [],
  };

  export const slice = createSlice({
    name: "AllotmentCategoryMaster",
    initialState,
    reducers: {
      load: () => {
        //load  nothing
      },
      loadOptions: () => {
        //load  nothing
      },
      setLoadGetAllAllotmentCategoryMaster: (state, action: PayloadAction<any>) => {
        state.getAllAllotmentCategoryMasterData = action.payload;
      },
      loadGetByIdAllotmentCategoryMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdAllotmentCategoryMaster: (state, action: PayloadAction<any>) => {
        state.getByIDAllotmentCategoryMaster = action.payload;
      },
      loadSaveUpdateAllotmentCategoryMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateAllotmentCategoryMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteAllotmentCategoryMaster = action.payload;
      },
      loadDeleteAllotmentCategoryMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteAllotmentCategoryMaster: (state, action: PayloadAction<any>) => {
        state.deleteAllotmentCategoryMaster = action.payload;
      },
      setLoadGetOptionAllotmentCategoryMaster: (state, action: PayloadAction<any>) => {
        state.getOptionAllotmentCategoryMasterData = action.payload;
      },
    },
});

export const { reducer, actions } = slice;

export const selectAllotmentCategoryMaster = (state: RootState) => state.allotmentCategoryMaster;

export const getAllAllotmentCategoryMaster= createSelector(
    selectAllotmentCategoryMaster,
    (AllotmentCategory) => AllotmentCategory.getAllAllotmentCategoryMasterData
  );
  export const getbyIdAllotmentCategoryMaster= createSelector(
    selectAllotmentCategoryMaster,
    (AllotmentCategory) => AllotmentCategory.getByIDAllotmentCategoryMaster
  );
  export const getSaveUpdateAllotmentCategoryMaster= createSelector(
    selectAllotmentCategoryMaster,
    (AllotmentCategory) => AllotmentCategory.saveUpdadteAllotmentCategoryMaster
  );
  export const getDeleteAllotmentCategoryMaster= createSelector(
    selectAllotmentCategoryMaster,
    (AllotmentCategory) => AllotmentCategory.deleteAllotmentCategoryMaster
  );
  export const getOptionAllotmentCategoryMaster= createSelector(
    selectAllotmentCategoryMaster,
    (AllotmentCategory) => AllotmentCategory.getOptionAllotmentCategoryMasterData
  );
 


