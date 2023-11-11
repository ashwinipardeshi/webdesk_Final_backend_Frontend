import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";
import { IOnlineAdmission } from "../../../interfaces/Admission/IOnlineAdmission";
import { IOnlineAdmissionBankInfo } from "../../../interfaces/Admission/onlineAdmission/IOnlineAdmission";
interface onlineAdmission {
  onlineStudentData: any;
  saveUpdateStudentInfoOnlineAdmission: any;
  saveUpdateBankInfoOnlineAdmission: any;
  saveUpdateParentInfoOnlineAdmission: any;
  saveUpdateCommunicationInfoOnlineAdmission: any;
  saveUpdateAcademicInfoOnlineAdmission: any;
  setStudentInfoStatus: boolean;
  fakeToaster :any
}
const initialState: onlineAdmission = {
  fakeToaster:'',
  onlineStudentData: {},
  saveUpdateStudentInfoOnlineAdmission: {},
  saveUpdateBankInfoOnlineAdmission: [],
  saveUpdateParentInfoOnlineAdmission: [],
  saveUpdateCommunicationInfoOnlineAdmission: [],
  saveUpdateAcademicInfoOnlineAdmission: [],
  setStudentInfoStatus: false,
};

export const slice = createSlice({
  name: "onlineAdmission",
  initialState,
  reducers: {
    loadSaveUpdateBankInfoOnlineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateBankInfoOnlineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateBankInfoOnlineAdmission = action.payload;
    },
    loadSaveUpdateParentInfoOnlineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateParentInfoOnlineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateParentInfoOnlineAdmission = action.payload;
    },

    loadSaveUpdateCommunicationInfoOnlineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateCommunicationInfoOnlineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateCommunicationInfoOnlineAdmission = action.payload;
    },

    loadSaveUpdateAcademicInfoOnlineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      //load  nothing
    },
    setsaveUpdateAcademicInfoOnlineAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateAcademicInfoOnlineAdmission = action.payload;
    },
    loadSaveUpdateStudentInfoOnlineAdissionAdmission: (
      state,
      action: PayloadAction<any>
    ) => {},
    setSaveUpdateStudentInfoOnlineAdissionAdmission: (
      state,
      action: PayloadAction<any>
    ) => {
      state.saveUpdateStudentInfoOnlineAdmission = action.payload;
    },
    loadSaveOnlineStudentData: () => {},
    setSaveOnlineStudentData: (state, action: PayloadAction<any>) => {
      state.onlineStudentData = action.payload;
    },

    setStatusOnlineStudentData: (state, action: PayloadAction<any>) => {
      state.setStudentInfoStatus = action.payload;
    },
    loadFakeSnackBar :()=>{

    }
  },
});

export const { reducer, actions } = slice;

export const selectOnlineAdmission = (state: RootState) =>
  state.onlineAdmission;

export const getSaveUpdateBankInfoOnlineAdmission = createSelector(
  selectOnlineAdmission,
  (onlineAdmission) => onlineAdmission.saveUpdateBankInfoOnlineAdmission
);
export const getSaveUpdateCommunicationInfoOnlineAdmission = createSelector(
  selectOnlineAdmission,
  (onlineAdmission) =>
    onlineAdmission.saveUpdateCommunicationInfoOnlineAdmission
);
export const getSaveUpdateAcademicInfoOnlineAdmission = createSelector(
  selectOnlineAdmission,
  (onlineAdmission) => onlineAdmission.saveUpdateAcademicInfoOnlineAdmission
);
export const getSaveUpdateParentInfoOnlineAdmission = createSelector(
  selectOnlineAdmission,
  (onlineAdmission) => onlineAdmission.saveUpdateParentInfoOnlineAdmission
);

export const getSaveUpdateStudentInfoOnlineAdmission = createSelector(
  selectOnlineAdmission,
  (s) => s.saveUpdateStudentInfoOnlineAdmission
);

export const getAllOnlineStudentData = createSelector(
  selectOnlineAdmission,
  (s) => s.onlineStudentData
);

export const getStatusOnlineStudentData = createSelector(
  selectOnlineAdmission,
  (s) => s.setStudentInfoStatus
);
