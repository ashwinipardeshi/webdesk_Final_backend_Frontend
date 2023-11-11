
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IExamTypeMaster } from "../../interfaces/Master/IExamTypeMaster";

interface ExamTypeMaster {
    getAllExamTypeMasterData: IExamTypeMaster[];
    getByIDExamTypeMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteExamTypeMaster: any;
    deleteExamTypeMaster: any;
    getOptionExamTypeMasterData: IExamTypeMaster[];
}
const initialState: ExamTypeMaster = {
    getAllExamTypeMasterData: [],
    getByIDExamTypeMaster: null,
    status: "idle",
    saveUpdadteExamTypeMaster: null,
    deleteExamTypeMaster: null,
    getOptionExamTypeMasterData: [],
};

export const slice = createSlice({
    name: "ExamTypeMaster",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        loadOptions: () => {
            //load  nothing
          },
        setLoadGetAllExamTypeMaster: (state, action: PayloadAction<any>) => {
            state.getAllExamTypeMasterData = action.payload;
        },
        loadGetByIdExamTypeMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdExamTypeMaster: (state, action: PayloadAction<any>) => {
            state.getByIDExamTypeMaster = action.payload;
        },
        loadSaveUpdateExamTypeMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateExamTypeMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteExamTypeMaster = action.payload;
        },
        loadDeleteExamTypeMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteExamTypeMaster: (state, action: PayloadAction<any>) => {
            state.deleteExamTypeMaster = action.payload;
        },
        setLoadGetOptionExamTypeMaster: (state, action: PayloadAction<any>) => {
            state.getOptionExamTypeMasterData = action.payload;
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
export const selectExamTypeMaster = (state: RootState) => state.examTypeMaster;

export const getAllExamTypeMaster = createSelector(
    selectExamTypeMaster,
    (ExamType) => ExamType.getAllExamTypeMasterData
);
export const getbyIdExamTypeMaster = createSelector(
    selectExamTypeMaster,
    (ExamType) => ExamType.getByIDExamTypeMaster
);
export const getSaveUpdateExamTypeMaster = createSelector(
    selectExamTypeMaster,
    (ExamType) => ExamType.saveUpdadteExamTypeMaster
);
export const getDeleteExamTypeMaster = createSelector(
    selectExamTypeMaster,
    (ExamType) => ExamType.deleteExamTypeMaster
);
export const getOptionExamTypeMaster = createSelector(
    selectExamTypeMaster,
    (ExamType) => ExamType.getOptionExamTypeMasterData
);
export const selectStatus = createSelector(
    selectExamTypeMaster,
    (state) => state.status
);
