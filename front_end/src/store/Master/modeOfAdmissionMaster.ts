import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IModeOfAdmissionMaster } from "../../interfaces/Master";

interface ModeOfAdmissionMaster {
    getAllModeOfAdmissionMasterData: IModeOfAdmissionMaster[];
    getByIDModeOfAdmissionMaster: any;
    saveUpdadteModeOfAdmissionMaster: any;
    deleteModeOfAdmissionMaster: any;
    getOptionModeOfAdmissionMasterData: IModeOfAdmissionMaster[];
  }

  const initialState: ModeOfAdmissionMaster = {
    getAllModeOfAdmissionMasterData: [],
    getByIDModeOfAdmissionMaster: null,
    saveUpdadteModeOfAdmissionMaster: null,
    deleteModeOfAdmissionMaster: null,
    getOptionModeOfAdmissionMasterData: [],
  };

  export const slice = createSlice({
    name: "ModeOfAdmissionMaster",
    initialState,
    reducers: {
      load: () => {
        //load  nothing
      },
      loadOptions: () => {
        //load  nothing
      },
      setLoadGetAllModeOfAdmissionMaster: (state, action: PayloadAction<any>) => {
        state.getAllModeOfAdmissionMasterData = action.payload;
      },
      loadGetByIdModeOfAdmissionMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setGetByIdModeOfAdmissionMaster: (state, action: PayloadAction<any>) => {
        state.getByIDModeOfAdmissionMaster = action.payload;
      },
      loadSaveUpdateModeOfAdmissionMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setSaveUpdateModeOfAdmissionMaster: (state, action: PayloadAction<any>) => {
        state.saveUpdadteModeOfAdmissionMaster = action.payload;
      },
      loadDeleteModeOfAdmissionMaster: (state, action: PayloadAction<any>) => {
        //load  nothing
      },
      setDeleteModeOfAdmissionMaster: (state, action: PayloadAction<any>) => {
        state.deleteModeOfAdmissionMaster = action.payload;
      },
      setLoadGetOptionModeOfAdmissionMaster: (state, action: PayloadAction<any>) => {
        state.getOptionModeOfAdmissionMasterData = action.payload;
      },

    },
  });

  export const { reducer, actions } = slice;

  export const selectModeOfAdmissionMaster = (state: RootState) => state.modeOfAdmissionMaster;

    
  export const getAllModeOfAdmissionMaster= createSelector(
    selectModeOfAdmissionMaster,
    (ModeOfAdmission) => ModeOfAdmission.getAllModeOfAdmissionMasterData
  );
  export const getbyIdModeOfAdmissionMaster= createSelector(
    selectModeOfAdmissionMaster,
    (ModeOfAdmission) => ModeOfAdmission.getByIDModeOfAdmissionMaster
  );
  export const getSaveUpdateModeOfAdmissionMaster= createSelector(
    selectModeOfAdmissionMaster,
    (ModeOfAdmission) => ModeOfAdmission.saveUpdadteModeOfAdmissionMaster
  );
  export const getDeleteModeOfAdmissionMaster= createSelector(
    selectModeOfAdmissionMaster,
    (ModeOfAdmission) => ModeOfAdmission.deleteModeOfAdmissionMaster
  );
  export const getOptionModeOfAdmissionMaster= createSelector(
    selectModeOfAdmissionMaster,
    (ModeOfAdmission) => ModeOfAdmission.getOptionModeOfAdmissionMasterData
  );
 

