
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface OnlineAdmissionStudentDetails {
    getAllOnlineAdmissionStudentDetailsData: [];
    updateOnlineAdmissionConfirmation: any;
    updateOnlineAdmissionReject: any;
    updateOnlineAdmissionStatusUpdate: any;
}

const initialState: OnlineAdmissionStudentDetails = {
    getAllOnlineAdmissionStudentDetailsData: [],
    updateOnlineAdmissionConfirmation: null,
    updateOnlineAdmissionReject: null,
    updateOnlineAdmissionStatusUpdate: null,
};

export const slice = createSlice({
    name: "OnlineAdmissionStudentDetails",
    initialState,
    reducers: {
        load: () => {
            //load  nothing
        },
        setLoadGetAllOnlineAdmissionStudentDetails: (state, action: PayloadAction<any>) => {
            state.getAllOnlineAdmissionStudentDetailsData = action.payload;
        },
        loadUpdateOnlineAdmissionConfirmation: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setUpdateOnlineAdmissionConfirmation: (state, action: PayloadAction<any>) => {
            state.updateOnlineAdmissionConfirmation = action.payload;
        },
        loadUpdateOnlineAdmissionReject: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setUpdateOnlineAdmissionReject: (state, action: PayloadAction<any>) => {
            state.updateOnlineAdmissionReject = action.payload;
        },

        loadUpdateOnlineAdmissionStatusUpdate: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setUpdateOnlineAdmissionStatusUpdate: (state, action: PayloadAction<any>) => {
            state.updateOnlineAdmissionStatusUpdate = action.payload;
        },

    },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOnlineAdmissionStudentDetails = (state: RootState) => state.onlineAdmissionStudentDetails;

export const getAllOnlineAdmissionStudentDetails = createSelector(
    selectOnlineAdmissionStudentDetails,
    (OnlineAdmissionStudentDetails) => OnlineAdmissionStudentDetails.getAllOnlineAdmissionStudentDetailsData
);

export const getUpdateOnlineAdmissionConfirmation = createSelector(
    selectOnlineAdmissionStudentDetails,
    (OnlineAdmissionStudentDetails) => OnlineAdmissionStudentDetails.updateOnlineAdmissionConfirmation
);
export const getUpdateOnlineAdmissionReject = createSelector(
    selectOnlineAdmissionStudentDetails,
    (OnlineAdmissionStudentDetails) => OnlineAdmissionStudentDetails.updateOnlineAdmissionReject
);

export const getUpdateOnlineAdmissionStatusUpdate = createSelector(
    selectOnlineAdmissionStudentDetails,
    (OnlineAdmissionStudentDetails) => OnlineAdmissionStudentDetails.updateOnlineAdmissionStatusUpdate
);
