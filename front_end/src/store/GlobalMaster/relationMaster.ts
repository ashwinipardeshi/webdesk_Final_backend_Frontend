/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IRelationMaster } from "../../interfaces/GlobalMaster/IRelationMaster";

interface RelationMaster {
  getAllRelationMasterData: IRelationMaster[];
  getByIDRelationMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateRelationMaster: any;
  deleteRelationMaster: any;
  getOptionRelationMasterData: IRelationMaster[];
}
const initialState: RelationMaster = {
  getAllRelationMasterData: [],
  getByIDRelationMaster: null,
  status: "idle",
  saveUpdateRelationMaster: null,
  deleteRelationMaster: null,
  getOptionRelationMasterData: [],
};

export const slice = createSlice({
  name: "RelationMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionRelation: () => {
      //load  nothing
    },
    setLoadGetAllRelationMaster: (state, action: PayloadAction<any>) => {
      state.getAllRelationMasterData = action.payload;
    },
    loadGetByIdRelationMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdRelationMaster: (state, action: PayloadAction<any>) => {
      state.getByIDRelationMaster = action.payload;
    },
    loadSaveUpdateRelationMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateRelationMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateRelationMaster = action.payload;
    },
    loadDeleteRelationMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteRelationMaster: (state, action: PayloadAction<any>) => {
      state.deleteRelationMaster = action.payload;
    },
    setLoadGetOptionRelationMaster: (state, action: PayloadAction<any>) => {
      state.getOptionRelationMasterData = action.payload;
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
export const selectRelationMaster = (state: RootState) => state.relationMaster;

export const getAllRelationMaster = createSelector(
  selectRelationMaster,
  (Relation) => Relation.getAllRelationMasterData
);
export const getbyIdRelationMaster = createSelector(
  selectRelationMaster,
  (Relation) => Relation.getByIDRelationMaster
);
export const getSaveUpdateRelationMaster = createSelector(
  selectRelationMaster,
  (Relation) => Relation.saveUpdateRelationMaster
);
export const getDeleteRelationMaster = createSelector(
  selectRelationMaster,
  (Relation) => Relation.deleteRelationMaster
);
export const getOptionRelationMaster = createSelector(
  selectRelationMaster,
  (Relation) => Relation.getOptionRelationMasterData
);
export const selectStatus = createSelector(
  selectRelationMaster,
  (state) => state.status
);
