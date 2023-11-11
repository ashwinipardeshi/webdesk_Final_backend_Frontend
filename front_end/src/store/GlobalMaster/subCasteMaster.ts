import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ISubCasteMaster } from "../../interfaces/GlobalMaster/ISubCasteMaster";

interface SubCasteMaster {
  getAllSubCasteMasterData: ISubCasteMaster[];
  getByIDSubCasteMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateSubCasteMaster: any;
  deleteSubCasteMaster: any;
  getOptionSubCasteMasterData: ISubCasteMaster[];
}
const initialState: SubCasteMaster = {
  getAllSubCasteMasterData: [],
  getByIDSubCasteMaster: null,
  status: "idle",
  saveUpdateSubCasteMaster: null,
  deleteSubCasteMaster: null,
  getOptionSubCasteMasterData: [],
};

export const slice = createSlice({
  name: "SubCasteMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionSubCaste: () => {
      //load  nothing
    },
    setLoadGetAllSubCasteMaster: (state, action: PayloadAction<any>) => {
      state.getAllSubCasteMasterData = action.payload;
    },
    loadGetByIdSubCasteMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdSubCasteMaster: (state, action: PayloadAction<any>) => {
      state.getByIDSubCasteMaster = action.payload;
    },
    loadSaveUpdateSubCasteMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateSubCasteMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateSubCasteMaster = action.payload;
    },
    loadDeleteSubCasteMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteSubCasteMaster: (state, action: PayloadAction<any>) => {
      state.deleteSubCasteMaster = action.payload;
    },
    setLoadGetOptionSubCasteMaster: (state, action: PayloadAction<any>) => {
      state.getOptionSubCasteMasterData = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSubCasteMaster = (state: RootState) => state.subCasteMaster;

export const getAllSubCasteMaster = createSelector(
  selectSubCasteMaster,
  (SubCaste) => SubCaste.getAllSubCasteMasterData
);
export const getbyIdSubCasteMaster = createSelector(
  selectSubCasteMaster,
  (SubCaste) => SubCaste.getByIDSubCasteMaster
);
export const getSaveUpdateSubCasteMaster = createSelector(
  selectSubCasteMaster,
  (SubCaste) => SubCaste.saveUpdateSubCasteMaster
);
export const getDeleteSubCasteMaster = createSelector(
  selectSubCasteMaster,
  (SubCaste) => SubCaste.deleteSubCasteMaster
);
export const getOptionSubCasteMaster = createSelector(
  selectSubCasteMaster,
  (SubCaste) => SubCaste.getOptionSubCasteMasterData
);
export const selectStatus = createSelector(
  selectSubCasteMaster,
  (state) => state.status
);
