import { put, spawn } from "redux-saga/effects";
import { isPlainObject } from "@mui/utils";
import annualIncomeMasterSaga from "./GlobalMaster/annualIncomeMasterSaga";
import appointmentTypeMasterSaga from "./GlobalMaster/appointmentTypeMasterSaga";
import bloodGroupMasterSaga from "./GlobalMaster/bloodGroupMasterSaga";
import casteCategoryMasterSaga from "./GlobalMaster/casteCategoryMasterSaga";
import casteMasterSaga from "./GlobalMaster/casteMasterSaga";
import commonSubjectMasterSaga from "./GlobalMaster/commonSubjectMasterSaga";
import countryMasterSaga from "./GlobalMaster/countryMasterSaga";
import courseCategoryMasterSaga from "./GlobalMaster/courseCategoryMasterSaga";
import districtMasterSaga from "./GlobalMaster/districtMasterSaga";
import domicileMasterSaga from "./GlobalMaster/domicileMasterSaga";
import employeeTypeMasterSaga from "./GlobalMaster/employeeTypeMasterSaga";
import handicapTypeMasterSaga from "./GlobalMaster/handicapTypeSaga";
import minorityDetailsMasterSaga from "./GlobalMaster/minorityDetailsMasterSaga";
import minorityMasterSaga from "./GlobalMaster/minorityMasterSaga";
import motherTongueMasterSaga from "./GlobalMaster/motherTongueMasterSaga";
import relationMasterSaga from "./GlobalMaster/relationMasterSaga";
import religionMasterSaga from "./GlobalMaster/religionMasterSaga";
import semesterMasterSaga from "./GlobalMaster/semesterMasterSaga";
import smtpConfigMasterSaga from "./Master/smtpConfigMasterSaga";
import stateMasterSaga from "./GlobalMaster/stateMasterSaga";
import subCasteMasterSaga from "./GlobalMaster/subCasteMasterSaga";
import talukaMasterSaga from "./GlobalMaster/talukaMasterSaga";
import timeSlotMasterSaga from "./GlobalMaster/timeSlotMasterSaga";
import boardMasterSaga from "./GlobalMaster/boardMasterSaga";
import candidatureTypeMasterSaga from "./GlobalMaster/candidatureTypeMasterSaga";
import seatTypeMasterSaga from "./Master/seatTypeMasterSaga";
import collegeMasterSaga from "./Master/collegeMasterSaga";
import academicYearMasterSaga from "./Master/academicYearMasterSaga";
import evaluationMasterSaga from "./Master/evaluationMasterSaga";
import studyMasterSaga from "./Master/studyMasterSaga";
import streamMasterSaga from "./Master/streamMasterSaga";
import examTypeMasterSaga from "./Master/examTypeMasterSaga";
import academicStatusMasterSaga from "./Master/academicStatusMasterSaga";
import feeheadTypeMasterSaga from "./Master/feeheadTypeMasterSaga";
import accreditationMasterSaga from "./Master/accreditationMasterSaga";
import documentMasterSaga from "./Master/documentMasterSaga";
import programTypeMasterSaga from "./Master/programTypeMasterSaga";
import designationMasterSaga from "./Master/designationMasterSaga";
import feeheadMasterSaga from "./Master/feeheadMasterSaga";
import reservationCategoryMasterSaga from "./Master/reservationCategoryMasterSaga";
import courseTypeMasterSaga from "./Master/courseTypeMasterSaga";
import programYearMasterSaga from "./Master/programYearMasterSaga";
import bankMasterSaga from "./Master/bankMasterSaga";
import syllabusPatternMasterSaga from "./Master/syllabusPatternMasterSaga";
import authenticationSaga from "./Authentication/authenticationSaga";
import divisionMasterSaga from "./Master/divisionMasterSaga";
import admissionTypeMasterSaga from "./Master/admissionTypeMasterSaga";
import { actions as snackbarActions } from "../store/snackbarToster";
import menuMasterSaga from "./Master/menuMasterSaga";
import ModuleMasterSaga from "./Master/moduleMasterSaga";
import allotmentCategoryMasterSaga from "./Master/allotmentCategoryMasterSaga";
import programMasterSaga from "./Master/programMasterSaga";
import modeOfAdmissionMasterSaga from "./Master/modeOfAdmissionMasterSaga";
import departmentMasterSaga from "./Master/departmentMasterSaga";
import programDetailMasterSaga from "./Master/programDetailMasterSaga";
import smsTemplateMasterSaga from "./Master/smsTemplateMasterSaga";
import semesterDetailsMasterSaga from "./Master/semesterDetailsMasterSaga";
import branchMasterSaga from "./Master/branchMasterSaga";
import commonMasterSaga from "./GlobalMaster/commonMasterSaga";
import onlineAdmissionSaga from "./Admission/onlineAdmission/onlineAdmissionSaga";
import offlineAdmissionSaga from "./Admission/offlineAdmission/offlineAdmissionSaga";
import onlineAdmissionStudentDetailsSaga from "./Admission/onlineAdmission/onlineAdmissionApprovalSaga";
import applicationStatusMasterSaga from "./Master/applicationStatusMasterSaga";
import offlineAdmissionStudentDetailsSaga from "./Admission/offlineAdmission/offlineApplicationListSaga";
import applicationRejectReasonMasterSaga from "./Master/applicationRejectReasonMasterSaga";

export function* globalErrorHandler(
  error?: any,
  actions?: any,
  status?: any
): Generator {
  if (status && actions) yield put(actions.setStatus(status));
  yield put(
    snackbarActions.setSnackbarStatus({
      message: isPlainObject(error)
        ? (error?.message as string)
        : JSON.stringify(error),
      severity: "error",
      open: true,
    })
  );
}
export default function* rootSagas() {
  yield spawn(authenticationSaga);
  yield spawn(annualIncomeMasterSaga);
  yield spawn(appointmentTypeMasterSaga);
  yield spawn(bloodGroupMasterSaga);
  yield spawn(casteCategoryMasterSaga);
  yield spawn(casteMasterSaga);
  yield spawn(commonSubjectMasterSaga);
  yield spawn(countryMasterSaga);
  yield spawn(courseCategoryMasterSaga);
  yield spawn(districtMasterSaga);
  yield spawn(domicileMasterSaga);
  yield spawn(employeeTypeMasterSaga);
  yield spawn(handicapTypeMasterSaga);
  yield spawn(minorityDetailsMasterSaga);
  yield spawn(minorityMasterSaga);
  yield spawn(motherTongueMasterSaga);
  yield spawn(relationMasterSaga);
  yield spawn(religionMasterSaga);
  yield spawn(semesterMasterSaga);
  yield spawn(smtpConfigMasterSaga);
  yield spawn(stateMasterSaga);
  yield spawn(subCasteMasterSaga);
  yield spawn(talukaMasterSaga);
  yield spawn(timeSlotMasterSaga);
  yield spawn(boardMasterSaga);
  yield spawn(candidatureTypeMasterSaga);
  yield spawn(seatTypeMasterSaga);
  yield spawn(collegeMasterSaga);
  yield spawn(academicYearMasterSaga);
  yield spawn(evaluationMasterSaga);
  yield spawn(studyMasterSaga);
  yield spawn(streamMasterSaga);
  yield spawn(examTypeMasterSaga);
  yield spawn(academicStatusMasterSaga);
  yield spawn(feeheadTypeMasterSaga);
  yield spawn(divisionMasterSaga);
  yield spawn(documentMasterSaga);
  yield spawn(designationMasterSaga);
  yield spawn(feeheadMasterSaga);
  yield spawn(courseTypeMasterSaga);
  yield spawn(programTypeMasterSaga);
  yield spawn(reservationCategoryMasterSaga);
  yield spawn(bankMasterSaga);
  yield spawn(syllabusPatternMasterSaga);
  yield spawn(admissionTypeMasterSaga);
  yield spawn(programYearMasterSaga);
  yield spawn(allotmentCategoryMasterSaga);
  yield spawn(programMasterSaga);
  yield spawn(modeOfAdmissionMasterSaga);
  yield spawn(departmentMasterSaga);
  yield spawn(programDetailMasterSaga);
  yield spawn(smsTemplateMasterSaga);
  yield spawn(semesterDetailsMasterSaga);
  yield spawn(accreditationMasterSaga);
  yield spawn(menuMasterSaga);
  yield spawn(ModuleMasterSaga);
  yield spawn(branchMasterSaga);
  yield spawn(commonMasterSaga);
  yield spawn(onlineAdmissionSaga);
  yield spawn(offlineAdmissionSaga);
  yield spawn(onlineAdmissionStudentDetailsSaga);
  yield spawn(applicationStatusMasterSaga);
  yield spawn(offlineAdmissionStudentDetailsSaga);
  yield spawn(applicationRejectReasonMasterSaga);
}
