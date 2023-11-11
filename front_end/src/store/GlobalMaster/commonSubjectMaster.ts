import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICommonSubjectMaster } from "../../interfaces/GlobalMaster/ICommonSubjectMaster";

interface CommonSubjectMaster {
  getAllCommonSubjectMasterData: ICommonSubjectMaster[];
  getByIDCommonSubjectMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateCommonSubjectMaster: any;
  deleteCommonSubjectMaster: any;
  getOptionCommonSubjectMasterData: ICommonSubjectMaster[];
}
const initialState: CommonSubjectMaster = {
  getAllCommonSubjectMasterData: [],
  getByIDCommonSubjectMaster: null,
  status: "idle",
  saveUpdateCommonSubjectMaster: null,
  deleteCommonSubjectMaster: null,
  getOptionCommonSubjectMasterData: [],
};

export const slice = createSlice({
  name: "CommonSubjectMaster",
  initialState,
  reducers: {
    load: () => {},
    loadOptionCommon: () => {},
    setLoadGetAllCommonSubjectMaster: (state, action: PayloadAction<any>) => {
      state.getAllCommonSubjectMasterData = action.payload;
    },
    loadGetByIdCommonSubjectMaster: (state, action: PayloadAction<any>) => {},
    setGetByIdCommonSubjectMaster: (state, action: PayloadAction<any>) => {
      state.getByIDCommonSubjectMaster = action.payload;
    },
    loadSaveUpdateCommonSubjectMaster: (
      state,
      action: PayloadAction<any>
    ) => {},
    setSaveUpdateCommonSubjectMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateCommonSubjectMaster = action.payload;
    },
    loadDeleteCommonSubjectMaster: (state, action: PayloadAction<any>) => {},
    setDeleteCommonSubjectMaster: (state, action: PayloadAction<any>) => {
      state.deleteCommonSubjectMaster = action.payload;
    },
    setLoadGetOptionCommonSubject: (state, action: PayloadAction<any>) => {
      state.getOptionCommonSubjectMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectCommonSubjectMaster = (state: RootState) =>
  state.commonSubjectMaster;

export const getAllCommonSubjectMaster = createSelector(
  selectCommonSubjectMaster,
  (CommonSubject) => CommonSubject.getAllCommonSubjectMasterData
);
export const getbyIdCommonSubjectMaster = createSelector(
  selectCommonSubjectMaster,
  (CommonSubject) => CommonSubject.getByIDCommonSubjectMaster
);
export const getSaveUpdateCommonSubjectMaster = createSelector(
  selectCommonSubjectMaster,
  (CommonSubject) => CommonSubject.saveUpdateCommonSubjectMaster
);
export const getDeleteCommonSubjectMaster = createSelector(
  selectCommonSubjectMaster,
  (CommonSubject) => CommonSubject.deleteCommonSubjectMaster
);
export const getOptionCommonSubjectMaster = createSelector(
  selectCommonSubjectMaster,
  (State) => State.getOptionCommonSubjectMasterData
);
export const selectStatus = createSelector(
  selectCommonSubjectMaster,
  (state) => state.status
);
