/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICourseCategoryMaster } from "../../interfaces/GlobalMaster/ICourseCategoryMaster";

interface CourseCategoryMaster {
  getAllCourseCategoryMasterData: ICourseCategoryMaster[];
  getByIDCourseCategoryMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdateCourseCategoryMaster: any;
  deleteCourseCategoryMaster: any;
  getOptionCourseCategoryMasterData: ICourseCategoryMaster[];
}
const initialState: CourseCategoryMaster = {
  getAllCourseCategoryMasterData: [],
  getByIDCourseCategoryMaster: null,
  status: "idle",
  saveUpdateCourseCategoryMaster: null,
  deleteCourseCategoryMaster: null,
  getOptionCourseCategoryMasterData: [],
};

export const slice = createSlice({
  name: "CourseCategoryMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionCourse: () => {
      //load  nothing
    },
    setLoadGetAllCourseCategoryMaster: (state, action: PayloadAction<any>) => {
      state.getAllCourseCategoryMasterData = action.payload;
    },
    loadGetByIdCourseCategoryMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdCourseCategoryMaster: (state, action: PayloadAction<any>) => {
      state.getByIDCourseCategoryMaster = action.payload;
    },
    loadSaveUpdateCourseCategoryMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateCourseCategoryMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateCourseCategoryMaster = action.payload;
    },
    loadDeleteCourseCategoryMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteCourseCategoryMaster: (state, action: PayloadAction<any>) => {
      state.deleteCourseCategoryMaster = action.payload;
    },
    setLoadGetOptionCourseCategoryMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.getOptionCourseCategoryMasterData = action.payload;
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
export const selectCourseCategoryMaster = (state: RootState) =>
  state.courseCategoryMaster;

export const getAllCourseCategoryMaster = createSelector(
  selectCourseCategoryMaster,
  (CourseCategory) => CourseCategory.getAllCourseCategoryMasterData
);
export const getbyIdCourseCategoryMaster = createSelector(
  selectCourseCategoryMaster,
  (CourseCategory) => CourseCategory.getByIDCourseCategoryMaster
);
export const getSaveUpdateCourseCategoryMaster = createSelector(
  selectCourseCategoryMaster,
  (CourseCategory) => CourseCategory.saveUpdateCourseCategoryMaster
);
export const getDeleteCourseCategoryMaster = createSelector(
  selectCourseCategoryMaster,
  (CourseCategory) => CourseCategory.deleteCourseCategoryMaster
);
export const getOptionCourseCategoryMaster = createSelector(
  selectCourseCategoryMaster,
  (CourseCategory) => CourseCategory.getOptionCourseCategoryMasterData
);
export const selectStatus = createSelector(
  selectCourseCategoryMaster,
  (state) => state.status
);
