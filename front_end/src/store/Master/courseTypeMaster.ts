
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICourseTypeMaster } from "../../interfaces/Master";

interface CourseTypeMaster {
    getAllCourseTypeMasterData: ICourseTypeMaster[];
    getByIDCourseTypeMaster: any;
    status: "idle" | "loading" | "error" | "tokenExpired";
    saveUpdadteCourseTypeMaster: any;
    deleteCourseTypeMaster: any;
    getOptionCourseTypeMasterData: ICourseTypeMaster[];
}
const initialState: CourseTypeMaster = {
    getAllCourseTypeMasterData: [],
    getByIDCourseTypeMaster: null,
    status: "idle",
    saveUpdadteCourseTypeMaster: null,
    deleteCourseTypeMaster: null,
    getOptionCourseTypeMasterData: [],
};

export const slice = createSlice({
    name: "CourseTypeMaster",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        loadOptions: () => {
            //load  nothing
        },
        setLoadGetAllCourseTypeMaster: (state, action: PayloadAction<any>) => {
            state.getAllCourseTypeMasterData = action.payload;
        },
        loadGetByIdCourseTypeMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdCourseTypeMaster: (state, action: PayloadAction<any>) => {
            state.getByIDCourseTypeMaster = action.payload;
        },
        loadSaveUpdateCourseTypeMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateCourseTypeMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteCourseTypeMaster = action.payload;
        },
        loadDeleteCourseTypeMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteCourseTypeMaster: (state, action: PayloadAction<any>) => {
            state.deleteCourseTypeMaster = action.payload;
        },
        setLoadGetOptionCourseTypeMaster: (state, action: PayloadAction<any>) => {
            state.getOptionCourseTypeMasterData = action.payload;
        },
    },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCourseTypeMaster = (state: RootState) => state.courseTypeMaster;

export const getAllCourseTypeMaster = createSelector(
    selectCourseTypeMaster,
    (CourseType) => CourseType.getAllCourseTypeMasterData
);
export const getbyIdCourseTypeMaster = createSelector(
    selectCourseTypeMaster,
    (CourseType) => CourseType.getByIDCourseTypeMaster
);
export const getSaveUpdateCourseTypeMaster = createSelector(
    selectCourseTypeMaster,
    (CourseType) => CourseType.saveUpdadteCourseTypeMaster
);
export const getDeleteCourseTypeMaster = createSelector(
    selectCourseTypeMaster,
    (CourseType) => CourseType.deleteCourseTypeMaster
);
export const getOptionCourseTypeMaster = createSelector(
    selectCourseTypeMaster,
    (CourseType) => CourseType.getOptionCourseTypeMasterData
);

