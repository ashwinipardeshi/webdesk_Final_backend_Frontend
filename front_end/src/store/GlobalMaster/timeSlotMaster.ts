import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ITimeSlotMaster } from "../../interfaces/GlobalMaster/ITimeSlotMaster";

interface TimeSlotMaster {
  getAllTimeSlotMasterData: ITimeSlotMaster[];
  getByIDTimeSlotMaster: any;
  saveUpdateTimeSlotMaster: any;
  deleteTimeSlotMaster: any;
}
const initialState: TimeSlotMaster = {
  getAllTimeSlotMasterData: [],
  getByIDTimeSlotMaster: null,
  saveUpdateTimeSlotMaster: null,
  deleteTimeSlotMaster: null,
};

export const slice = createSlice({
  name: "TimeSlotMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    setLoadGetAllTimeSlotMaster: (state, action: PayloadAction<any>) => {
      state.getAllTimeSlotMasterData = action.payload;
    },
    loadGetByIdTimeSlotMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByIdTimeSlotMaster: (state, action: PayloadAction<any>) => {
      state.getByIDTimeSlotMaster = action.payload;
    },
    loadSaveUpdateTimeSlotMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setSaveUpdateTimeSlotMaster: (state, action: PayloadAction<any>) => {
      state.saveUpdateTimeSlotMaster = action.payload;
    },
    loadDeleteTimeSlotMaster: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setDeleteTimeSlotMaster: (state, action: PayloadAction<any>) => {
      state.deleteTimeSlotMaster = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTimeSlotMaster = (state: RootState) => state.timeSlotMaster;

export const getAllTimeSlotMaster = createSelector(
  selectTimeSlotMaster,
  (TimeSlot) => TimeSlot.getAllTimeSlotMasterData
);
export const getbyIdTimeSlotMaster = createSelector(
  selectTimeSlotMaster,
  (TimeSlot) => TimeSlot.getByIDTimeSlotMaster
);
export const getSaveUpdateTimeSlotMaster = createSelector(
  selectTimeSlotMaster,
  (TimeSlot) => TimeSlot.saveUpdateTimeSlotMaster
);
export const getDeleteTimeSlotMaster = createSelector(
  selectTimeSlotMaster,
  (TimeSlot) => TimeSlot.deleteTimeSlotMaster
);
