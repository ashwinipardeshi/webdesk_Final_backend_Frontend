
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ISemesterDetailsMaster } from "../../interfaces/Master";

interface SemesterDetailsMaster {
    getAllSemesterDetailsMasterData: ISemesterDetailsMaster[];
    getByIDSemesterDetailsMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteSemesterDetailsMaster: any;
    deleteSemesterDetailsMaster: any;
}
const initialState: SemesterDetailsMaster = {
    getAllSemesterDetailsMasterData: [],
    getByIDSemesterDetailsMaster: null,
    status: "idle",
    saveUpdadteSemesterDetailsMaster: null,
    deleteSemesterDetailsMaster: null,
};

export const slice = createSlice({
    name: "SemesterDetailsMaster",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        loadOptions: () => {
            //load  nothing
          },
        setLoadGetAllSemesterDetailsMaster: (state, action: PayloadAction<any>) => {
            state.getAllSemesterDetailsMasterData = action.payload;
        },
        loadGetByIdSemesterDetailsMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdSemesterDetailsMaster: (state, action: PayloadAction<any>) => {
            state.getByIDSemesterDetailsMaster = action.payload;
        },
        loadSaveUpdateSemesterDetailsMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateSemesterDetailsMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteSemesterDetailsMaster = action.payload;
        },
        loadDeleteSemesterDetailsMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteSemesterDetailsMaster: (state, action: PayloadAction<any>) => {
            state.deleteSemesterDetailsMaster = action.payload;
        },
    },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSemesterDetailsMaster = (state: RootState) => state.semesterDetailsMaster;

export const getAllSemesterDetailsMaster = createSelector(
    selectSemesterDetailsMaster,
    (SemesterDetails) => SemesterDetails.getAllSemesterDetailsMasterData
);
export const getbyIdSemesterDetailsMaster = createSelector(
    selectSemesterDetailsMaster,
    (SemesterDetails) => SemesterDetails.getByIDSemesterDetailsMaster
);
export const getSaveUpdateSemesterDetailsMaster = createSelector(
    selectSemesterDetailsMaster,
    (SemesterDetails) => SemesterDetails.saveUpdadteSemesterDetailsMaster
);
export const getDeleteSemesterDetailsMaster = createSelector(
    selectSemesterDetailsMaster,
    (SemesterDetails) => SemesterDetails.deleteSemesterDetailsMaster
);


