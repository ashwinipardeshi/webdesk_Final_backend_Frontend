
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface OfflineAdmissionStudentDetails {
    getAllOfflineAdmissionStudentDetailsData: [];
}

const initialState: OfflineAdmissionStudentDetails = {
    getAllOfflineAdmissionStudentDetailsData: [],
};

export const slice = createSlice({
    name: "OfflineAdmissionStudentDetails",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        setLoadGetAllOfflineAdmissionStudentDetails: (state, action: PayloadAction<any>) => {
            state.getAllOfflineAdmissionStudentDetailsData = action.payload;
        },
    },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOfflineAdmissionStudentDetails = (state: RootState) => state.offlineAdmissionStudentDetails;

export const getAllOfflineAdmissionStudentDetails = createSelector(
    selectOfflineAdmissionStudentDetails,
    (OfflineAdmissionStudentDetails) => OfflineAdmissionStudentDetails.getAllOfflineAdmissionStudentDetailsData
);


