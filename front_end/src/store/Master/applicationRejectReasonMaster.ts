import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/index";
import { IApplicationRejectReasons } from "../../interfaces/Master";

interface ApplicationRejectReasonMaster {
  getAllApplicationRejectReasonMasterData: IApplicationRejectReasons[];
  getByIDApplicationRejectReasonMaster: any;
  status: "idle" | "loading" | "error" | "tokenExpired";
  saveUpdadteApplicationRejectReasonMaster: any;
  deleteApplicationRejectReasonMaster: any;
  getOptionApplicationRejectReasonMasterData: IApplicationRejectReasons[];
}

const initialState: ApplicationRejectReasonMaster = {
  getAllApplicationRejectReasonMasterData: [],
  getByIDApplicationRejectReasonMaster: null,
  status: "idle",
  saveUpdadteApplicationRejectReasonMaster: null,
  deleteApplicationRejectReasonMaster: null,
  getOptionApplicationRejectReasonMasterData: [],
};

export const slice = createSlice({
  name: "ApplicationRejectReasonMaster",
  initialState,
  reducers: {
    load: () => {
      //load  nothing
    },
    loadOptionsApplicationRejectReason: () => {
      //load  nothing
    },
    setLoadGetAllApplicationRejectReasonMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.getAllApplicationRejectReasonMasterData = action.payload;
    },
    loadGetByIdApplicationRejectReasonMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setGetByIdApplicationRejectReasonMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.getByIDApplicationRejectReasonMaster = action.payload;
    },
    loadSaveUpdateApplicationRejectReasonMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setSaveUpdateApplicationRejectReasonMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdadteApplicationRejectReasonMaster = action.payload;
    },
    loadDeleteApplicationRejectReasonMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setDeleteApplicationRejectReasonMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.deleteApplicationRejectReasonMaster = action.payload;
    },
    setLoadGetOptionApplicationRejectReasonMaster: (
      state,
      action: PayloadAction<any>
    ) => {
      state.getOptionApplicationRejectReasonMasterData = action.payload;
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading" | "error">) => {
      state.status = action.payload;
    },
  },
});

export const { reducer, actions } = slice;

export const selectApplicationRejectReasonMaster = (state: RootState) =>
  state.applicationRejectReasonMaster;

export const getAllApplicationRejectReasonMaster = createSelector(
  selectApplicationRejectReasonMaster,
  (ApplicationRejectReason) =>
    ApplicationRejectReason.getAllApplicationRejectReasonMasterData
);
export const getbyIdApplicationRejectReasonMaster = createSelector(
  selectApplicationRejectReasonMaster,
  (ApplicationRejectReason) =>
    ApplicationRejectReason.getByIDApplicationRejectReasonMaster
);
export const getSaveUpdateApplicationRejectReasonMaster = createSelector(
  selectApplicationRejectReasonMaster,
  (ApplicationRejectReason) =>
    ApplicationRejectReason.saveUpdadteApplicationRejectReasonMaster
);
export const getDeleteApplicationRejectReasonMaster = createSelector(
  selectApplicationRejectReasonMaster,
  (ApplicationRejectReason) =>
    ApplicationRejectReason.deleteApplicationRejectReasonMaster
);
export const getOptionApplicationRejectReasonMaster = createSelector(
  selectApplicationRejectReasonMaster,
  (ApplicationRejectReason) =>
    ApplicationRejectReason.getOptionApplicationRejectReasonMasterData
);
export const selectStatus = createSelector(
  selectApplicationRejectReasonMaster,
  (state) => state.status
);
