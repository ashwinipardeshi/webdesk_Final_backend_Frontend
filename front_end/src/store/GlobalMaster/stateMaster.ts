import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IStateMaster } from "../../interfaces/GlobalMaster";

interface StateMaster {
  getAllStateMasterData: IStateMaster[];
  getByIDStateMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateStateMaster: any;
  deleteStateMaster: any;
  getOptionStateMasterData: IStateMaster[];
}
const initialState: StateMaster = {
  getAllStateMasterData: [],
  getByIDStateMaster: null,
  status: "idle",
  saveUpdateStateMaster: null,
  deleteStateMaster: null,
  getOptionStateMasterData: [],
};

export const slice = createSlice({
  name: "StateMaster",
  initialState,
  reducers: {
    load: () => {},
    loadOptionState: () => {},
    setLoadGetAllStateMaster: (state, action: PayloadAction<any>) => {
      state.getAllStateMasterData = action.payload;
    },
    loadGetByIdStateMaster: (state, action: PayloadAction<any>) => {},
    setGetByIdStateMaster: (state, action: PayloadAction<any>) => {
      state.getByIDStateMaster = action.payload;
    },
    loadSaveUpdateStateMaster: (state, action: PayloadAction<any>) => {},
    setSaveUpdateStateMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateStateMaster = action.payload;
    },
    loadDeleteStateMaster: (state, action: PayloadAction<any>) => {},
    setDeleteStateMaster: (state, action: PayloadAction<any>) => {
      state.deleteStateMaster = action.payload;
    },
    setLoadGetOptionStateMaster: (state, action: PayloadAction<any>) => {
      state.getOptionStateMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectStateMaster = (state: RootState) => state.stateMaster;

export const getAllStateMaster = createSelector(
  selectStateMaster,
  (State) => State.getAllStateMasterData
);
export const getbyIdStateMaster = createSelector(
  selectStateMaster,
  (State) => State.getByIDStateMaster
);
export const getSaveUpdateStateMaster = createSelector(
  selectStateMaster,
  (State) => State.saveUpdateStateMaster
);
export const getDeleteStateMaster = createSelector(
  selectStateMaster,
  (State) => State.deleteStateMaster
);
export const getOptionStateMaster = createSelector(
  selectStateMaster,
  (State) => State.getOptionStateMasterData
);
export const selectStatus = createSelector(
  selectStateMaster,
  (state) => state.status
);
