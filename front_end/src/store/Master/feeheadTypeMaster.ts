
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IFeeHeadTypeMaster } from "../../interfaces/Master/IFeeHeadTypeMaster";

interface FeeHeadTypeMaster {
    getAllFeeHeadTypeMasterData: IFeeHeadTypeMaster[];
    getByIDFeeHeadTypeMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteFeeHeadTypeMaster: any;
    deleteFeeHeadTypeMaster: any;
    getOptionFeeHeadTypeMasterData: IFeeHeadTypeMaster[];
}
const initialState: FeeHeadTypeMaster = {
    getAllFeeHeadTypeMasterData: [],
    getByIDFeeHeadTypeMaster: null,
    status: "idle",
    saveUpdadteFeeHeadTypeMaster: null,
    deleteFeeHeadTypeMaster: null,
    getOptionFeeHeadTypeMasterData: [],
};

export const slice = createSlice({
    name: "FeeHeadTypeMaster",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        loadOptions: () => {
            //load  nothing
          },
        setLoadGetAllFeeHeadTypeMaster: (state, action: PayloadAction<any>) => {
            state.getAllFeeHeadTypeMasterData = action.payload;
        },
        loadGetByIdFeeHeadTypeMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdFeeHeadTypeMaster: (state, action: PayloadAction<any>) => {
            state.getByIDFeeHeadTypeMaster = action.payload;
        },
        loadSaveUpdateFeeHeadTypeMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateFeeHeadTypeMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteFeeHeadTypeMaster = action.payload;
        },
        loadDeleteFeeHeadTypeMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteFeeHeadTypeMaster: (state, action: PayloadAction<any>) => {
            state.deleteFeeHeadTypeMaster = action.payload;
        },
        setLoadGetOptionFeeHeadTypeMaster: (state, action: PayloadAction<any>) => {
            state.getOptionFeeHeadTypeMasterData = action.payload;
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
export const selectFeeHeadTypeMaster = (state: RootState) => state.feeheadTypeMaster;

export const getAllFeeHeadTypeMaster = createSelector(
    selectFeeHeadTypeMaster,
    (FeeHeadType) => FeeHeadType.getAllFeeHeadTypeMasterData
);
export const getbyIdFeeHeadTypeMaster = createSelector(
    selectFeeHeadTypeMaster,
    (FeeHeadType) => FeeHeadType.getByIDFeeHeadTypeMaster
);
export const getSaveUpdateFeeHeadTypeMaster = createSelector(
    selectFeeHeadTypeMaster,
    (FeeHeadType) => FeeHeadType.saveUpdadteFeeHeadTypeMaster
);
export const getDeleteFeeHeadTypeMaster = createSelector(
    selectFeeHeadTypeMaster,
    (FeeHeadType) => FeeHeadType.deleteFeeHeadTypeMaster
);
export const getOptionFeeHeadTypeMaster = createSelector(
    selectFeeHeadTypeMaster,
    (FeeHeadType) => FeeHeadType.getOptionFeeHeadTypeMasterData
);
export const selectStatus = createSelector(
    selectFeeHeadTypeMaster,
    (state) => state.status
);
