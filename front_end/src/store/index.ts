import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import logger from "redux-logger";
//import { reducer as sessionReducer } from "./session";
import { reducer as notificationsReducer } from "./notifications";
import { reducer as headerReducer } from "./header";
import { reducer as annualIncomeMasterReducer } from "./GlobalMaster/annualIncomeMaster";
import { reducer as appointmentTypeMasterReducer } from "./GlobalMaster/appointmentTypeMaster";
import { reducer as bloodGroupMasterReducer } from "./GlobalMaster/bloodGroupMaster";
import { reducer as commonSubjectMasterReducer } from "./GlobalMaster/commonSubjectMaster";
import { reducer as boardMasterReducer } from "./GlobalMaster/boardMaster";
import { reducer as casteCategoryMasterReducer } from "./GlobalMaster/casteCategoryMaster";
import { reducer as casteMasterReducer } from "./GlobalMaster/casteMaster";
import { reducer as countryMasterReducer } from "./GlobalMaster/countryMaster";
import { reducer as courseCategoryMasterReducer } from "./GlobalMaster/courseCategoryMaster";
import { reducer as districtMasterReducer } from "./GlobalMaster/districtMaster";
import { reducer as domicileMasterReducer } from "./GlobalMaster/domicileMaster";
import { reducer as employeeTypeMasterReducer } from "./GlobalMaster/employeeTypeMaster";
import { reducer as handicapTypeMasterReducer } from "./GlobalMaster/handicapType";
import { reducer as minorityDetailsMasterReducer } from "./GlobalMaster/minorityDetailsMaster";
import { reducer as minorityMasterReducer } from "./GlobalMaster/minorityMaster";
import { reducer as motherTongueMasterReducer } from "./GlobalMaster/motherTongueMaster";
import { reducer as relationMasterReducer } from "./GlobalMaster/relationMaster";
import { reducer as religionMasterReducer } from "./GlobalMaster/religionMaster";
import { reducer as smtpConfigMasterReducer } from "./Master/smtpConfigMaster";
import { reducer as stateMasterReducer } from "./GlobalMaster/stateMaster";
import { reducer as subCasteMasterReducer } from "./GlobalMaster/subCasteMaster";
import { reducer as talukaMasterReducer } from "./GlobalMaster/talukaMaster";
import { reducer as timeSlotMasterReducer } from "./GlobalMaster/timeSlotMaster";
import { reducer as loaderReducer } from "./loader";
import { reducer as authenticationReducer } from "./Authentication/authentication";
import { reducer as semesterMasterReducer } from "./GlobalMaster/semesterMaster";
import { reducer as candidatureTypeReducer } from "./GlobalMaster/candidatureTypeMaster";
import { reducer as seatTypeMasterReducer } from "./Master/seatTypeMaster";
import { reducer as collegeMasterReducer } from "./Master/collegeMaster";
import { reducer as academicYearMasterReducer } from "./Master/academicYearMaster";
import { reducer as evaluationMasterReducer } from "./Master/evaluationMaster";
import { reducer as departmentMasterReducer } from "./Master/departmentMaster";
import { reducer as studyMasterReducer } from "./Master/studyMaster";
import { reducer as streamMasterReducer } from "./Master/streamMaster";
import { reducer as examTypeMasterReducer } from "./Master/examTypeMaster";
import { reducer as academicStatusMasterReducer } from "./Master/academicStatusMaster";
import { reducer as designationMasterReducer } from "./Master/designationMaster";
import { reducer as feeheadTypeMasterReducer } from "./Master/feeheadTypeMaster";
import { reducer as feeheadMasterReducer } from "./Master/feeheadMaster";
import { reducer as courseTypeMasterReducer } from "./Master/courseTypeMaster";
import { reducer as programYearMasterReducer } from "./Master/programYearMaster";
import { reducer as snackbarDetailsReducer } from "./snackbarToster";
import { reducer as documentMasterReducer } from "./Master/documentMaster";
import { reducer as divisionMasterReducer } from "./Master/divisionMaster";
import { reducer as programTypeMasterReducer } from "./Master/programTypeMaster";
import { reducer as onlineAdmissionReducer } from "./Admission/onlineAdmission/onlineAdmission";
import { reducer as admissionTypeMasterReducer } from "./Master/admissionTypeMaster";
import { reducer as reservationCategoryMasterReducer } from "./Master/reservationCategoryMaster";
import { reducer as bankMasterReducer } from "./Master/bankMaster";
import { reducer as syllabusPatternMasterReducer } from "./Master/syllabusPatternMaster";
import { reducer as programDetailMasterReducer } from "./Master/programDetailMaster";
import { reducer as branchMasterReducer } from "./Master/branchMaster";
import { reducer as modeOfAdmissionMasterReducer } from "./Master/modeOfAdmissionMaster";
import { reducer as programMasterReducer } from "./Master/programMaster";
import { reducer as allotmentCategoryMasterReducer } from "./Master/allotmentCategoryMaster";
import { reducer as smsTemplateMasterReducer } from "./Master/smsTemplateMaster";
import { reducer as semesterDetailsMasterReducer } from "./Master/semesterDetailsMaster";
import { reducer as accreditationMasterReducer } from "./Master/accreditationMaster";
import { reducer as menuMasterReducer } from "./Master/menuMaster";
import { reducer as moduleMasterReducer } from "./Master/moduleMaster";
import { reducer as commonMasterReducer } from "./GlobalMaster/commonMaster";
import { reducer as offlineAdmissionReducer } from "./Admission/offlineAdmission/offlineAdmission";
import { reducer as onlineAdmissionStudentDetailsReducer } from "./Admission/onlineAdmission/onlineAdmissionApproval";
import { reducer as applicationStatusMasterReducer } from "./Master/applicationStatusMaster";
import { reducer as offlineAdmissionStudentDetailsReducer } from "./Admission/offlineAdmission/offlineAdmissionList"
import { reducer as applicationRejectReasonMasterReducer } from "./Master/applicationRejectReasonMaster";

import rootSagas from "../sagas";
import { STORAGE_KEY } from "../utils/utils";
function saveToSessionStorage(state: any) {
  try {
    const copiedState = { ...state };
    delete copiedState.deliveryZone;
    const serializedState = JSON.stringify(copiedState);
    sessionStorage.setItem(STORAGE_KEY, serializedState);
  } catch { }
}

function loadFromSessionStorage() {
  try {
    const serializedState = sessionStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return undefined;
    const parsedSession = JSON.parse(serializedState);
    const userDetailInStore = localStorage.getItem("user");
    if (userDetailInStore) {
      parsedSession.session.user = JSON.parse(userDetailInStore);
    }
    return parsedSession;
  } catch (e) {
    return undefined;
  }
}

const combinedReducer = combineReducers({
  authentication: authenticationReducer,
  loaderStatus: loaderReducer,
  snackbarStatus: snackbarDetailsReducer,
  notifications: notificationsReducer,
  header: headerReducer,
  onlineAdmission: onlineAdmissionReducer,
  offlineAdmission: offlineAdmissionReducer,
  annualIncomeMaster: annualIncomeMasterReducer,
  appointmentTypeMaster: appointmentTypeMasterReducer,
  bloodGroupMaster: bloodGroupMasterReducer,
  casteCategoryMaster: casteCategoryMasterReducer,
  casteMaster: casteMasterReducer,
  commonSubjectMaster: commonSubjectMasterReducer,
  countryMaster: countryMasterReducer,
  courseCategoryMaster: courseCategoryMasterReducer,
  districtMaster: districtMasterReducer,
  domicileMaster: domicileMasterReducer,
  employeeTypeMaster: employeeTypeMasterReducer,
  handicapTypeMaster: handicapTypeMasterReducer,
  minorityDetailsMaster: minorityDetailsMasterReducer,
  minorityMaster: minorityMasterReducer,
  motherTongueMaster: motherTongueMasterReducer,
  relationMaster: relationMasterReducer,
  religionMaster: religionMasterReducer,
  smtpConfigMaster: smtpConfigMasterReducer,
  stateMaster: stateMasterReducer,
  subCasteMaster: subCasteMasterReducer,
  talukaMaster: talukaMasterReducer,
  timeSlotMaster: timeSlotMasterReducer,
  boardMaster: boardMasterReducer,
  semesterMaster: semesterMasterReducer,
  candidatureTypeMaster: candidatureTypeReducer,
  seatTypeMaster: seatTypeMasterReducer,
  collegeMaster: collegeMasterReducer,
  academicYearMaster: academicYearMasterReducer,
  evaluationMaster: evaluationMasterReducer,
  departmentMaster: departmentMasterReducer,
  studyMaster: studyMasterReducer,
  streamMaster: streamMasterReducer,
  examTypeMaster: examTypeMasterReducer,
  academicStatusMaster: academicStatusMasterReducer,
  feeheadTypeMaster: feeheadTypeMasterReducer,
  divisionMasterReducer: divisionMasterReducer,
  documentMaster: documentMasterReducer,
  programTypeMaster: programTypeMasterReducer,
  designationMaster: designationMasterReducer,
  feeheadMaster: feeheadMasterReducer,
  courseTypeMaster: courseTypeMasterReducer,
  programYearMaster: programYearMasterReducer,
  admissionTypeMaster: admissionTypeMasterReducer,
  reservationCategoryMaster: reservationCategoryMasterReducer,
  bankMaster: bankMasterReducer,
  syllabusPatternMaster: syllabusPatternMasterReducer,
  allotmentCategoryMaster: allotmentCategoryMasterReducer,
  branchMaster: branchMasterReducer,
  modeOfAdmissionMaster: modeOfAdmissionMasterReducer,
  programDetailMaster: programDetailMasterReducer,
  programMaster: programMasterReducer,
  smsTemplateMaster: smsTemplateMasterReducer,
  semesterDetailsMaster: semesterDetailsMasterReducer,
  accreditationMaster: accreditationMasterReducer,
  menuMaster: menuMasterReducer,
  moduleMaster: moduleMasterReducer,
  commonMaster: commonMasterReducer,
  onlineAdmissionStudentDetails: onlineAdmissionStudentDetailsReducer,
  applicationStatusMaster: applicationStatusMasterReducer,
  offlineAdmissionStudentDetails: offlineAdmissionStudentDetailsReducer,
  applicationRejectReasonMaster: applicationRejectReasonMasterReducer
});

const rootReducer = (state: any, action: { type: string }) => {
  let temp = state;
  if (action.type === "session/clearSession") {
    temp = undefined;
  }
  return combinedReducer(temp, action);
};

const sagaMiddleware = createSagaMiddleware();
const isDebugModeOn = false;

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
  middleware: isDebugModeOn ? [sagaMiddleware, logger] : [sagaMiddleware],
  preloadedState: loadFromSessionStorage(),
});
export type RootState = ReturnType<typeof store.getState>;

store.subscribe(() => saveToSessionStorage(store.getState()));
sagaMiddleware.run(rootSagas);
