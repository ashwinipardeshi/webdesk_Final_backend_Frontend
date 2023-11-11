import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { ICastCategoryGMaster } from "../../interfaces/GlobalMaster/ICastCategoryGMaster";
import { RootState } from "..";

interface CasteCategoryMaster {
  getAllCasteCategoryMasterData: ICastCategoryGMaster[];
  getByIDCasteCategoryMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateCasteCategoryMaster: any;
  deleteCasteCategoryMaster: any;
  getOptionCasteCategoryMasterData: ICastCategoryGMaster[];
}
const initialState: CasteCategoryMaster = {
  getAllCasteCategoryMasterData: [],
  getByIDCasteCategoryMaster: null,
  status: "idle",
  saveUpdateCasteCategoryMaster: null,
  deleteCasteCategoryMaster: null,
  getOptionCasteCategoryMasterData: [],
};

export const slice = createSlice({
  name: "casteCategory",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionCasteCategory: () => {
      //load  nothing
    },
    setLoadGetAllCasteCategoryMaster: (state, action: PayloadAction<any>) => {
      state.getAllCasteCategoryMasterData = action.payload;
    },
    loadGetByIdCasteCategoryMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdCasteCategoryMaster: (state, action: PayloadAction<any>) => {
      state.getByIDCasteCategoryMaster = action.payload;
    },
    loadSaveUpdateCasteCategoryMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateCasteCategoryMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateCasteCategoryMaster = action.payload;
    },
    loadDeleteCasteCategoryMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteCasteCategoryMaster: (state, action: PayloadAction<any>) => {
      state.deleteCasteCategoryMaster = action.payload;
    },
    setLoadGetOptionCasteCategoryMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.getOptionCasteCategoryMasterData = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectCasteCategoryMaster = (state: RootState) =>
  state.casteCategoryMaster;

export const getAllCasteCategoryMaster = createSelector(
  selectCasteCategoryMaster,
  (CasteCategory) => CasteCategory.getAllCasteCategoryMasterData
);
export const getbyIdCasteCategoryMaster = createSelector(
  selectCasteCategoryMaster,
  (CasteCategory) => CasteCategory.getByIDCasteCategoryMaster
);
export const getSaveUpdateCasteCategoryMaster = createSelector(
  selectCasteCategoryMaster,
  (CasteCategory) => CasteCategory.saveUpdateCasteCategoryMaster
);
export const getDeleteCasteCategoryMaster = createSelector(
  selectCasteCategoryMaster,
  (CasteCategory) => CasteCategory.deleteCasteCategoryMaster
);
export const getOptionCasteCategoryMaster = createSelector(
  selectCasteCategoryMaster,
  (CasteCategory) => CasteCategory.getOptionCasteCategoryMasterData
);
export const selectStatus = createSelector(
  selectCasteCategoryMaster,
  (state) => state.status
);
