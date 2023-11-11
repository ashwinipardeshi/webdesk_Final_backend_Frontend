import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICasteMaster } from "../../interfaces/GlobalMaster/ICasteMaster";

interface CasteMaster {
  getAllCasteMasterData: ICasteMaster[];
  getByIDCasteMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateCasteMaster: any;
  deleteCasteMaster: any;
  getOptionCasteMasterData: ICasteMaster[];
}
const initialState: CasteMaster = {
  getAllCasteMasterData: [],
  getByIDCasteMaster: null,
  status: "idle",
  saveUpdateCasteMaster: null,
  deleteCasteMaster: null,
  getOptionCasteMasterData: [],
};

export const slice = createSlice({
  name: "CasteMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionCaste: () => {
      //load  nothing
    },
    setLoadGetAllCasteMaster: (state, action: PayloadAction<any>) => {
      state.getAllCasteMasterData = action.payload;
    },
    loadGetByIdCasteMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdCasteMaster: (state, action: PayloadAction<any>) => {
      state.getByIDCasteMaster = action.payload;
    },
    loadSaveUpdateCasteMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateCasteMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateCasteMaster = action.payload;
    },
    loadDeleteCasteMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteCasteMaster: (state, action: PayloadAction<any>) => {
      state.deleteCasteMaster = action.payload;
    },
    setLoadGetOptionCasteMaster: (state, action: PayloadAction<any>) => {
      state.getOptionCasteMasterData = action.payload;
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
export const selectCasteMaster = (state: RootState) => state.casteMaster;

export const getAllCasteMaster = createSelector(
  selectCasteMaster,
  (Caste) => Caste.getAllCasteMasterData
);
export const getbyIdCasteMaster = createSelector(
  selectCasteMaster,
  (Caste) => Caste.getByIDCasteMaster
);
export const getSaveUpdateCasteMaster = createSelector(
  selectCasteMaster,
  (Caste) => Caste.saveUpdateCasteMaster
);
export const getDeleteCasteMaster = createSelector(
  selectCasteMaster,
  (Caste) => Caste.deleteCasteMaster
);
export const getOptionCasteMaster = createSelector(
  selectCasteMaster,
  (Caste) => Caste.getOptionCasteMasterData
);

export const selectStatus = createSelector(
  selectCasteMaster,
  (state) => state.status
);
