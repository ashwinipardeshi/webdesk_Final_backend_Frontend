import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { IOnlineAdmission } from "../../../interfaces/Admission/IOnlineAdmission";
import { IOnlineAdmissionBankInfo } from "../../../interfaces/Admission/onlineAdmission/IOnlineAdmission";
import { IOfflineUserData } from "../../../interfaces/Admission/offlineAdmission/IOfflineUserData";
interface offlineAdmission {
  offlineUserAllData: IOfflineUserData | null,
  saveUpdateBankInfoOfflineAdmission: any;
  saveUpdateParentInfoOfflineAdmission: any;
  saveUpdateCommunicationInfoOfflineAdmission: any;
  saveUpdateAcademicInfoOfflineAdmission: any;
  saveUpdateVehicleInfoOfflineAdmission: any;
  saveUpdateInsuranceInfoOfflineAdmission: any;
  saveUpdateProgramInfoOfflineAdmission: any;
  saveUpdateStudentInfoOfflineAdmission: any;
  insertOfflineMainForm: any;
}
const initialState: offlineAdmission = {
  offlineUserAllData: null,
  saveUpdateBankInfoOfflineAdmission: [],
  saveUpdateParentInfoOfflineAdmission: [],
  saveUpdateCommunicationInfoOfflineAdmission: [],
  saveUpdateAcademicInfoOfflineAdmission: [],
  saveUpdateVehicleInfoOfflineAdmission: [],
  saveUpdateInsuranceInfoOfflineAdmission: [],
  saveUpdateProgramInfoOfflineAdmission: [],
  saveUpdateStudentInfoOfflineAdmission: [],
  insertOfflineMainForm: [],
};

export const slice = createSlice({
  name: "offlineAdmission",
  initialState,
  reducers: {

    // Offline Main Form
    loadSaveMainFormOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setInsertOfflineMainForm: (
      state,
      action: PayloadAction<any>
    ) => {
      state.insertOfflineMainForm = action.payload;
    },


    // Bank Information
    loadSaveUpdateBankInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateBankInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateBankInfoOfflineAdmission = action.payload;
    },

    // Parent Information
    loadSaveUpdateParentInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateParentInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateParentInfoOfflineAdmission = action.payload;
    },

    // Communication Information
    loadSaveUpdateCommunicationInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateCommunicationInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateCommunicationInfoOfflineAdmission = action.payload;
    },

    // Academic Information
    loadSaveUpdateAcademicInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateAcademicInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateAcademicInfoOfflineAdmission = action.payload;
    },

    // Vehicle Information
    loadSaveUpdateVehicleInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateVehicleInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateVehicleInfoOfflineAdmission = action.payload;
    },

    // Program Information
    loadSaveUpdateProgramInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateProgramInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateProgramInfoOfflineAdmission = action.payload;
    },

    // Student Information
    loadSaveUpdateStudentInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateStudentInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateProgramInfoOfflineAdmission = action.payload;
    },

    // Insurance Information
    loadSaveUpdateInsuranceInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateInsuranceInfoOfflineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateInsuranceInfoOfflineAdmission = action.payload;
    },
    loadAllOfflineStudentData: () => {

    },
    setSaveUpdateAllOfflineStudentData: (state, action: PayloadAction<IOfflineUserData | null>) => {
      state.offlineUserAllData = action.payload
    },

    loadFakeSnackBar: () => {

    }
  },
});




export const { reducer, actions } = slice;

export const selectOfflineAdmission = (state: RootState) =>
  state.offlineAdmission;

export const getSaveUpdateBankInfoOfflineAdmission = createSelector(
  selectOfflineAdmission,
  (offlineAdmission) => offlineAdmission.saveUpdateBankInfoOfflineAdmission
);
export const getSaveUpdateCommunicationInfoOfflineAdmission = createSelector(
  selectOfflineAdmission,
  (offlineAdmission) =>
    offlineAdmission.saveUpdateCommunicationInfoOfflineAdmission
);
export const getSaveUpdateAcademicInfoOfflineAdmission = createSelector(
  selectOfflineAdmission,
  (offlineAdmission) => offlineAdmission.saveUpdateAcademicInfoOfflineAdmission
);

export const getSaveUpdateVehicleInfoOfflineAdmission = createSelector(
  selectOfflineAdmission,
  (offlineAdmission) => offlineAdmission.saveUpdateVehicleInfoOfflineAdmission
);

export const getSaveUpdateInsuranceInfoOfflineAdmission = createSelector(
  selectOfflineAdmission,
  (offlineAdmission) => offlineAdmission.saveUpdateInsuranceInfoOfflineAdmission
);

export const getSaveUpdateProgramInfoOfflineAdmission = createSelector(
  selectOfflineAdmission,
  (offlineAdmission) => offlineAdmission.saveUpdateProgramInfoOfflineAdmission
);
export const getSaveUpdateStudentInfoOfflineAdmission = createSelector(
  selectOfflineAdmission,
  (offlineAdmission) => offlineAdmission.saveUpdateStudentInfoOfflineAdmission
);
export const getSaveUpdateParentInfoOfflineAdmission = createSelector(
  selectOfflineAdmission,
  (offlineAdmission) => offlineAdmission.saveUpdateParentInfoOfflineAdmission
);

export const getAllOfflineStudentData = createSelector(
  selectOfflineAdmission,
  (s) => s.offlineUserAllData
)