import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ITalukaMaster } from "../../interfaces/GlobalMaster/ITalukaMaster";

interface TalukaMaster {
  getAllTalukaMasterData: ITalukaMaster[];
  getByIDTalukaMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateTalukaMaster: any;
  deleteTalukaMaster: any;
  getOptionTalukaMasterData: ITalukaMaster[];
}
const initialState: TalukaMaster = {
  getAllTalukaMasterData: [],
  getByIDTalukaMaster: null,
  status: "idle",
  saveUpdateTalukaMaster: null,
  deleteTalukaMaster: null,
  getOptionTalukaMasterData: [],
};

export const slice = createSlice({
  name: "TalukaMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionTaluka: () => {
      //load  nothing
    },
    setLoadGetAllTalukaMaster: (state, action: PayloadAction<any>) => {
      state.getAllTalukaMasterData = action.payload;
    },
    loadGetByIdTalukaMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdTalukaMaster: (state, action: PayloadAction<any>) => {
      state.getByIDTalukaMaster = action.payload;
    },
    loadSaveUpdateTalukaMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateTalukaMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateTalukaMaster = action.payload;
    },
    loadDeleteTalukaMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteTalukaMaster: (state, action: PayloadAction<any>) => {
      state.deleteTalukaMaster = action.payload;
    },
    setLoadGetOptionTalukaMaster: (state, action: PayloadAction<any>) => {
      state.getOptionTalukaMasterData = action.payload;
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
export const selectTalukaMaster = (state: RootState) => state.talukaMaster;

export const getAllTalukaMaster = createSelector(
  selectTalukaMaster,
  (Taluka) => Taluka.getAllTalukaMasterData
);
export const getbyIdTalukaMaster = createSelector(
  selectTalukaMaster,
  (Taluka) => Taluka.getByIDTalukaMaster
);
export const getSaveUpdateTalukaMaster = createSelector(
  selectTalukaMaster,
  (Taluka) => Taluka.saveUpdateTalukaMaster
);
export const getDeleteTalukaMaster = createSelector(
  selectTalukaMaster,
  (Taluka) => Taluka.deleteTalukaMaster
);
export const getOptionTalukaMaster = createSelector(
  selectTalukaMaster,
  (Taluka) => Taluka.getOptionTalukaMasterData
);
export const selectStatus = createSelector(
  selectTalukaMaster,
  (state) => state.status
);
