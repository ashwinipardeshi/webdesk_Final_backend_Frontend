
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IProgramDetailMaster } from "../../interfaces/Master";

interface ProgramDetailMaster {
    getAllProgramDetailMasterData: IProgramDetailMaster[];
    getByIDProgramDetailMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteProgramDetailMaster: any;
    deleteProgramDetailMaster: any;
}
const initialState: ProgramDetailMaster = {
    getAllProgramDetailMasterData: [],
    getByIDProgramDetailMaster: null,
    status: "idle",
    saveUpdadteProgramDetailMaster: null,
    deleteProgramDetailMaster: null,
};

export const slice = createSlice({
    name: "ProgramDetailMaster",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        loadOptions: () => {
            //load  nothing
          },
        setLoadGetAllProgramDetailMaster: (state, action: PayloadAction<any>) => {
            state.getAllProgramDetailMasterData = action.payload;
        },
        loadGetByIdProgramDetailMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdProgramDetailMaster: (state, action: PayloadAction<any>) => {
            state.getByIDProgramDetailMaster = action.payload;
        },
        loadSaveUpdateProgramDetailMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateProgramDetailMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteProgramDetailMaster = action.payload;
        },
        loadDeleteProgramDetailMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteProgramDetailMaster: (state, action: PayloadAction<any>) => {
            state.deleteProgramDetailMaster = action.payload;
        },
    },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProgramDetailMaster = (state: RootState) => state.programDetailMaster;

export const getAllProgramDetailMaster = createSelector(
    selectProgramDetailMaster,
    (ProgramDetail) => ProgramDetail.getAllProgramDetailMasterData
);
export const getbyIdProgramDetailMaster = createSelector(
    selectProgramDetailMaster,
    (ProgramDetail) => ProgramDetail.getByIDProgramDetailMaster
);
export const getSaveUpdateProgramDetailMaster = createSelector(
    selectProgramDetailMaster,
    (ProgramDetail) => ProgramDetail.saveUpdadteProgramDetailMaster
);
export const getDeleteProgramDetailMaster = createSelector(
    selectProgramDetailMaster,
    (ProgramDetail) => ProgramDetail.deleteProgramDetailMaster
);


