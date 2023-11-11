import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IHandicapType } from "../../interfaces/GlobalMaster/IHandicapType";

interface handicapType {
  getAllHandicapTypeMasterDat: IHandicapType[];
  status: "idle" | "loading" | "error" | "tokenExpired";
  getByIdHandicapTypeMaster: any;
  saveUpdateHandicapTypeMaster: any;
  deleteHandicapTypeMaster: any;
  getOptionHandicapTypeMasterData: IHandicapType[];
}

const initialState: handicapType = {
  getAllHandicapTypeMasterDat: [],
  status: "idle",
  getByIdHandicapTypeMaster: null,
  deleteHandicapTypeMaster: null,
  saveUpdateHandicapTypeMaster: null,
  getOptionHandicapTypeMasterData: [],
};

export const slice = createSlice({
  name: "handicapType",
  initialState,
  reducers: {
    load: () => {},
    loadOptionHandicap: () => {},
    setLoadGetHandicapTypeMaster: (
      state,
      action: PayloadAction<IHandicapType[]>
    ) => {
      state.getAllHandicapTypeMasterDat = action.payload;
      return state;
    },
    loadGetByIdHandicapType: (state, action: PayloadAction<any>) => {},
    setGetByIdHandicapType: (state, action: PayloadAction<any>) => {
      state.getByIdHandicapTypeMaster = action.payload;
    },
    loadSaveUpdateHandicapType: (state, action: PayloadAction<any>) => {},
    setSaveUpdateHandicapType: (state, action: PayloadAction<any>) => {
      state.saveUpdateHandicapTypeMaster = action.payload;
    },
    loadDeleteHandicapType: (state, action: PayloadAction<any>) => {},
    setDeleteHandicapType: (state, action: PayloadAction<any>) => {
      state.deleteHandicapTypeMaster = action.payload;
    },
    setLoadGetOptionHandicapTypeMaster: (state, action: PayloadAction<any>) => {
      state.getOptionHandicapTypeMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<typeof state.status>) => {
      state.status = action.payload;
      return state;
    },
  },
});

export const { reducer, actions } = slice;
export const selectHandicapType = (state: RootState) =>
  state.handicapTypeMaster;
export const getAllHandicapTypeMaster = createSelector(
  selectHandicapType,
  (state) => state.getAllHandicapTypeMasterDat
);

export const selectStatus = createSelector(
  selectHandicapType,
  (state) => state.status
);

export const getByIdHandicapTypeMaster = createSelector(
  selectHandicapType,
  (state) => state.getByIdHandicapTypeMaster
);

export const getSaveUpdateHandicapTypeMaster = createSelector(
  selectHandicapType,
  (state) => state.saveUpdateHandicapTypeMaster
);

export const getDeleteHandicapTypeMaster = createSelector(
  selectHandicapType,
  (state) => state.deleteHandicapTypeMaster
);

export const getOptionHandicapTypeMaster = createSelector(
  selectHandicapType,
  (State) => State.getOptionHandicapTypeMasterData
);
