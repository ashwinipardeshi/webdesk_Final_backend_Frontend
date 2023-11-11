import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IBoardMaster } from "../../interfaces/GlobalMaster/IBoardMaster";

interface BoardMaster {
  getAllBoardMasterData: IBoardMaster[];
  getByIDBoardMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateBoardMaster: any;
  deleteBoardMaster: any;
  getOptionBoardMasterData: IBoardMaster[];
}
const initialState: BoardMaster = {
  getAllBoardMasterData: [],
  getByIDBoardMaster: null,
  status: "idle",
  saveUpdateBoardMaster: null,
  deleteBoardMaster: null,
  getOptionBoardMasterData: [],
};

export const slice = createSlice({
  name: "BoardMaster",
  initialState,
  reducers: {
    load: () => {},
    loadOptionBoard: () => {},
    setLoadGetAllBoardMaster: (state, action: PayloadAction<any>) => {
      state.getAllBoardMasterData = action.payload;
    },
    loadGetByIdBoardMaster: (state, action: PayloadAction<any>) => {},
    setGetByIdBoardMaster: (state, action: PayloadAction<any>) => {
      state.getByIDBoardMaster = action.payload;
    },
    loadSaveUpdateBoardMaster: (state, action: PayloadAction<any>) => {},
    setSaveUpdateBoardMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateBoardMaster = action.payload;
    },
    loadDeleteBoardMaster: (state, action: PayloadAction<any>) => {},
    setDeleteBoardMaster: (state, action: PayloadAction<any>) => {
      state.deleteBoardMaster = action.payload;
    },
    setLoadGetOptionBoardMaster: (state, action: PayloadAction<any>) => {
      state.getOptionBoardMasterData = action.payload;
    },
    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;
export const selectBoardMaster = (state: RootState) => state.boardMaster;

export const getAllBoardMaster = createSelector(
  selectBoardMaster,
  (Board) => Board.getAllBoardMasterData
);
export const getbyIdBoardMaster = createSelector(
  selectBoardMaster,
  (Board) => Board.getByIDBoardMaster
);
export const getSaveUpdateBoardMaster = createSelector(
  selectBoardMaster,
  (Board) => Board.saveUpdateBoardMaster
);
export const getDeleteBoardMaster = createSelector(
  selectBoardMaster,
  (Board) => Board.deleteBoardMaster
);
export const getOptionBoardMaster = createSelector(
  selectBoardMaster,
  (Board) => Board.getOptionBoardMasterData
);
export const selectStatus = createSelector(
  selectBoardMaster,
  (state) => state.status
);
