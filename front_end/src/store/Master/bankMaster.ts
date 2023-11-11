
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IBankMaster } from "../../interfaces/Master";

interface BankMaster {
    getAllBankMasterData: IBankMaster[];
    getByIDBankMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteBankMaster: any;
    deleteBankMaster: any;
    getOptionBankMasterData: IBankMaster[];
}
const initialState: BankMaster = {
    getAllBankMasterData: [],
    getByIDBankMaster: null,
    status: "idle",
    saveUpdadteBankMaster: null,
    deleteBankMaster: null,
    getOptionBankMasterData: [],
};

export const slice = createSlice({
    name: "BankMaster",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        loadOptions: () => {
            //load  nothing
        },
        setLoadGetAllBankMaster: (state, action: PayloadAction<any>) => {
            state.getAllBankMasterData = action.payload;
        },
        loadGetByIdBankMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdBankMaster: (state, action: PayloadAction<any>) => {
            state.getByIDBankMaster = action.payload;
        },
        loadSaveUpdateBankMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateBankMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteBankMaster = action.payload;
        },
        loadDeleteBankMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteBankMaster: (state, action: PayloadAction<any>) => {
            state.deleteBankMaster = action.payload;
        },
        setLoadGetOptionBankMaster: (state, action: PayloadAction<any>) => {
            state.getOptionBankMasterData = action.payload;
        },
    },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBankMaster = (state: RootState) => state.bankMaster;

export const getAllBankMaster = createSelector(
    selectBankMaster,
    (BankMaster) => BankMaster.getAllBankMasterData
);
export const getbyIdBankMaster = createSelector(
    selectBankMaster,
    (BankMaster) => BankMaster.getByIDBankMaster
);
export const getSaveUpdateBankMaster = createSelector(
    selectBankMaster,
    (BankMaster) => BankMaster.saveUpdadteBankMaster
);
export const getDeleteBankMaster = createSelector(
    selectBankMaster,
    (BankMaster) => BankMaster.deleteBankMaster
);
export const getOptionBankMaster = createSelector(
    selectBankMaster,
    (BankMaster) => BankMaster.getOptionBankMasterData
);

