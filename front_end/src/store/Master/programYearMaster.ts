
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IProgramYearMaster } from "../../interfaces/Master";

interface ProgramYearMaster {
    getAllProgramYearMasterData: IProgramYearMaster[];
    getByIDProgramYearMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteProgramYearMaster: any;
    deleteProgramYearMaster: any;
    getOptionProgramYearMasterData: IProgramYearMaster[];
}
const initialState: ProgramYearMaster = {
    getAllProgramYearMasterData: [],
    getByIDProgramYearMaster: null,
    status: "idle",
    saveUpdadteProgramYearMaster: null,
    deleteProgramYearMaster: null,
    getOptionProgramYearMasterData: [],
};

export const slice = createSlice({
    name: "ProgramYearMaster",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        loadOptions: () => {
            //load  nothing
          },
        setLoadGetAllProgramYearMaster: (state, action: PayloadAction<any>) => {
            state.getAllProgramYearMasterData = action.payload;
        },
        loadGetByIdProgramYearMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdProgramYearMaster: (state, action: PayloadAction<any>) => {
            state.getByIDProgramYearMaster = action.payload;
        },
        loadSaveUpdateProgramYearMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateProgramYearMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteProgramYearMaster = action.payload;
        },
        loadDeleteProgramYearMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteProgramYearMaster: (state, action: PayloadAction<any>) => {
            state.deleteProgramYearMaster = action.payload;
        },
        setLoadGetOptionProgramYearMaster: (state, action: PayloadAction<any>) => {
            state.getOptionProgramYearMasterData = action.payload;
        },
    },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProgramYearMaster = (state: RootState) => state.programYearMaster;

export const getAllProgramYearMaster = createSelector(
    selectProgramYearMaster,
    (ProgramYear) => ProgramYear.getAllProgramYearMasterData
);
export const getbyIdProgramYearMaster = createSelector(
    selectProgramYearMaster,
    (ProgramYear) => ProgramYear.getByIDProgramYearMaster
);
export const getSaveUpdateProgramYearMaster = createSelector(
    selectProgramYearMaster,
    (ProgramYear) => ProgramYear.saveUpdadteProgramYearMaster
);
export const getDeleteProgramYearMaster = createSelector(
    selectProgramYearMaster,
    (ProgramYear) => ProgramYear.deleteProgramYearMaster
);
export const getOptionProgramYearMaster = createSelector(
    selectProgramYearMaster,
    (ProgramYear) => ProgramYear.getOptionProgramYearMasterData
);

