
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ISyllabusPatternMaster } from "../../interfaces/Master";

interface SyllabusPatternMaster {
    getAllSyllabusPatternMasterData: ISyllabusPatternMaster[];
    getByIDSyllabusPatternMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteSyllabusPatternMaster: any;
    deleteSyllabusPatternMaster: any;
    getOptionSyllabusPatternMasterData: ISyllabusPatternMaster[];
}
const initialState: SyllabusPatternMaster = {
    getAllSyllabusPatternMasterData: [],
    getByIDSyllabusPatternMaster: null,
    status: "idle",
    saveUpdadteSyllabusPatternMaster: null,
    deleteSyllabusPatternMaster: null,
    getOptionSyllabusPatternMasterData: [],
};

export const slice = createSlice({
    name: "SyllabusPatternMaster",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        loadOptions: () => {
            //load  nothing
          },
        setLoadGetAllSyllabusPatternMaster: (state, action: PayloadAction<any>) => {
            state.getAllSyllabusPatternMasterData = action.payload;
        },
        loadGetByIdSyllabusPatternMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdSyllabusPatternMaster: (state, action: PayloadAction<any>) => {
            state.getByIDSyllabusPatternMaster = action.payload;
        },
        loadSaveUpdateSyllabusPatternMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateSyllabusPatternMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteSyllabusPatternMaster = action.payload;
        },
        loadDeleteSyllabusPatternMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteSyllabusPatternMaster: (state, action: PayloadAction<any>) => {
            state.deleteSyllabusPatternMaster = action.payload;
        },
        setLoadGetOptionSyllabusPatternMaster: (state, action: PayloadAction<any>) => {
            state.getOptionSyllabusPatternMasterData = action.payload;
        },
    },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSyllabusPatternMaster = (state: RootState) => state.syllabusPatternMaster;

export const getAllSyllabusPatternMaster = createSelector(
    selectSyllabusPatternMaster,
    (SyllabusPattern) => SyllabusPattern.getAllSyllabusPatternMasterData
);
export const getbyIdSyllabusPatternMaster = createSelector(
    selectSyllabusPatternMaster,
    (SyllabusPattern) => SyllabusPattern.getByIDSyllabusPatternMaster
);
export const getSaveUpdateSyllabusPatternMaster = createSelector(
    selectSyllabusPatternMaster,
    (SyllabusPattern) => SyllabusPattern.saveUpdadteSyllabusPatternMaster
);
export const getDeleteSyllabusPatternMaster = createSelector(
    selectSyllabusPatternMaster,
    (SyllabusPattern) => SyllabusPattern.deleteSyllabusPatternMaster
);
export const getOptionSyllabusPatternMaster = createSelector(
    selectSyllabusPatternMaster,
    (SyllabusPattern) => SyllabusPattern.getOptionSyllabusPatternMasterData
);

