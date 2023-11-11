
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IFeeheadMaster } from "../../interfaces/Master/IFeeHeadMaster";

interface FeeHeadMaster {
    getAllFeeHeadMasterData: IFeeheadMaster[];
    getByIDFeeHeadMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteFeeHeadMaster: any;
    deleteFeeHeadMaster: any;
    getOptionFeeHeadMasterData: IFeeheadMaster[];
}
const initialState: FeeHeadMaster = {
    getAllFeeHeadMasterData: [],
    getByIDFeeHeadMaster: null,
    status: "idle",
    saveUpdadteFeeHeadMaster: null,
    deleteFeeHeadMaster: null,
    getOptionFeeHeadMasterData: [],
};

export const slice = createSlice({
    name: "FeeHeadMaster",
    initialState,
    reducers: {
        load: (state, action: PayloadAction<number>) => {
            //load  nothing
        },
        loadOptions: (state, action: PayloadAction<number>) => {
            //load  nothing
          },
        setLoadGetAllFeeHeadMaster: (state, action: PayloadAction<any>) => {
            state.getAllFeeHeadMasterData = action.payload;
        },
        loadGetByIdFeeHeadMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdFeeHeadMaster: (state, action: PayloadAction<any>) => {
            state.getByIDFeeHeadMaster = action.payload;
        },
        loadSaveUpdateFeeHeadMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateFeeHeadMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteFeeHeadMaster = action.payload;
        },
        loadDeleteFeeHeadMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteFeeHeadMaster: (state, action: PayloadAction<any>) => {
            state.deleteFeeHeadMaster = action.payload;
        },
        setLoadGetOptionFeeHeadMaster: (state, action: PayloadAction<any>) => {
            state.getOptionFeeHeadMasterData = action.payload;
        },

    },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFeeHeadMaster = (state: RootState) => state.feeheadMaster;

export const getAllFeeHeadMaster = createSelector(
    selectFeeHeadMaster,
    (FeeHead) => FeeHead.getAllFeeHeadMasterData
);
export const getbyIdFeeHeadMaster = createSelector(
    selectFeeHeadMaster,
    (FeeHead) => FeeHead.getByIDFeeHeadMaster
);
export const getSaveUpdateFeeHeadMaster = createSelector(
    selectFeeHeadMaster,
    (FeeHead) => FeeHead.saveUpdadteFeeHeadMaster
);
export const getDeleteFeeHeadMaster = createSelector(
    selectFeeHeadMaster,
    (FeeHead) => FeeHead.deleteFeeHeadMaster
);
export const getOptionFeeHeadMaster = createSelector(
    selectFeeHeadMaster,
    (FeeHead) => FeeHead.getOptionFeeHeadMasterData
);
