import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IBranchMaster } from "../../interfaces/Master";

interface BranchMaster {
  getAllBranchMasterData: IBranchMaster[];
  getByIDBranchMaster: any;
  saveUpdadteBranchMaster: any;
  deleteBranchMaster: any;
  getOptionBranchMasterData: IBranchMaster[];
}
const initialState: BranchMaster = {
  getAllBranchMasterData: [],
  getByIDBranchMaster: null,
  saveUpdadteBranchMaster: null,
  deleteBranchMaster: null,
  getOptionBranchMasterData: [],
};

export const slice = createSlice({
  name: "BranchMaster",
  initialState,
  reducers: {
    load: (state, action: PayloadAction<number>) => {},
    loadOptionsBranchMaster: (state, action: PayloadAction<number>) => {},
    setLoadGetAllBranchMaster: (state, action: PayloadAction<any>) => {
      state.getAllBranchMasterData = action.payload;
    },
    loadGetByIdBranchMaster: (state, action: PayloadAction<any>) => {},
    setGetByIdBranchMaster: (state, action: PayloadAction<any>) => {
      state.getByIDBranchMaster = action.payload;
    },
    loadSaveUpdateBranchMaster: (state, action: PayloadAction<any>) => {},
    setSaveUpdateBranchMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdadteBranchMaster = action.payload;
    },
    loadDeleteBranchMaster: (state, action: PayloadAction<any>) => {},
    setDeleteBranchMaster: (state, action: PayloadAction<any>) => {
      state.deleteBranchMaster = action.payload;
    },
    setLoadGetOptionBranchMaster: (state, action: PayloadAction<any>) => {
      state.getOptionBranchMasterData = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectBranchMaster = (state: RootState) => state.branchMaster;

export const getAllBranchMaster = createSelector(
  selectBranchMaster,
  (Branch) => Branch.getAllBranchMasterData
);
export const getbyIdBranchMaster = createSelector(
  selectBranchMaster,
  (Branch) => Branch.getByIDBranchMaster
);
export const getSaveUpdateBranchMaster = createSelector(
  selectBranchMaster,
  (Branch) => Branch.saveUpdadteBranchMaster
);
export const getDeleteBranchMaster = createSelector(
  selectBranchMaster,
  (Branch) => Branch.deleteBranchMaster
);
export const getOptionBranchMaster = createSelector(
  selectBranchMaster,
  (Branch) => Branch.getOptionBranchMasterData
);
