import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IApplicationStatusMaster } from "../../interfaces/Master";


interface ApplicationStatusMaster {
    getAllApplicationStatusMasterData: IApplicationStatusMaster[];
    getByIDApplicationStatusMaster: any;
    saveUpdadteApplicationStatusMaster: any;
    deleteApplicationStatusMaster: any;
    getOptionApplicationStatusMasterData: IApplicationStatusMaster[];
}


const initialState: ApplicationStatusMaster = {
    getAllApplicationStatusMasterData: [],
    getByIDApplicationStatusMaster: null,
    saveUpdadteApplicationStatusMaster: null,
    deleteApplicationStatusMaster: null,
    getOptionApplicationStatusMasterData: [],
};


export const slice = createSlice({
    name: "applicationStatusMaster",
    initialState,
    reducers: {
        load: () => {

        },
        setLoadGetAllApplicationStatusMaster: (state, action: PayloadAction<any>) => {
            state.getAllApplicationStatusMasterData = action.payload;
        },
        loadGetByIdApplicationStatusMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setGetByIdApplicationStatusMaster: (state, action: PayloadAction<any>) => {
            state.getByIDApplicationStatusMaster = action.payload;
        },
        loadSaveUpdateApplicationStatusMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setSaveUpdateApplicationStatusMaster: (state, action: PayloadAction<any>) => {
            state.saveUpdadteApplicationStatusMaster = action.payload;
        },
        loadDeleteApplicationStatusMaster: (state, action: PayloadAction<any>) => {
            //load  nothing
        },
        setDeleteApplicationStatusMaster: (state, action: PayloadAction<any>) => {
            state.deleteApplicationStatusMaster = action.payload;
        },
        setLoadGetOptionApplicationStatusMaster: (state, action: PayloadAction<any>) => {
            state.getOptionApplicationStatusMasterData = action.payload;
        },

    },
});


export const { reducer, actions } = slice;
export const selectApplicationStatusMaster = (state: RootState) => state.applicationStatusMaster;


export const getAllApplicationStatusMaster = createSelector(
    selectApplicationStatusMaster,
    (state) => state.getAllApplicationStatusMasterData
);
export const getbyIdApplicationStatusMaster = createSelector(
    selectApplicationStatusMaster,
    (state) => state.getByIDApplicationStatusMaster
);
export const getSaveUpdateApplicationStatusMaster = createSelector(
    selectApplicationStatusMaster,
    (state) => state.saveUpdadteApplicationStatusMaster
);
export const getDeleteApplicationStatusMaster = createSelector(
    selectApplicationStatusMaster,
    (state) => state.deleteApplicationStatusMaster
);
export const getOptionApplicationStatusMaster = createSelector(
    selectApplicationStatusMaster,
    (state) => state.getOptionApplicationStatusMasterData
);

