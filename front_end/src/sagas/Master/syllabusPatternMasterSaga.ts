import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllSyllabusPattern,
  getByIdSyllabusPattern,
  addSyllabusPattern,
  updateSyllabusPattern,
  deleteSyllabusPattern,
  getOptionsSyllabusPattern,
} from "../../services/Master/syllabusPatternMasterService";
import { actions } from "../../store/Master/syllabusPatternMaster";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import {
  getCollegeId,
  getAcademicYearMasterId,
} from "../../store/Authentication/authentication";
const programMasterId = 1;
//const academicYearMasterId = 6;

function* getAllSyllabusPatternMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const academicYearMasterId: any = yield select(getAcademicYearMasterId);
    console.log(academicYearMasterId);
    const response: any = yield call(
      getAllSyllabusPattern,
      collegeID,
      academicYearMasterId,
      programMasterId
    );
    yield put(actions.setLoadGetAllSyllabusPatternMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdSyllabusPatternMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdSyllabusPattern, action.payload);
    yield put(actions.setGetByIdSyllabusPatternMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveSyllabusPatternMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addSyllabusPattern : updateSyllabusPattern,
      request
    );
    if (response.statusCode === 201 || response.statusCode === 202) {
      yield put(actions.setSaveUpdateSyllabusPatternMaster(response));
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
    } else {
      yield globalErrorHandler(
        "Something went wrong!!!",
        loaderActions,
        "idle"
      );
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "error",
          open: true,
        })
      );
    }
  } catch (error: any) {
    // eventually better error handling
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}

function* deleteSyllabusPatternMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteSyllabusPattern, id);
    yield put(actions.setDeleteSyllabusPatternMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const academicYearMasterId: any = yield select(getAcademicYearMasterId);
    const responseList: any = yield call(
      getAllSyllabusPattern,
      collegeID,
      academicYearMasterId,
      programMasterId
    );
    yield put(actions.setLoadGetAllSyllabusPatternMaster(responseList.result));
    yield put(loaderActions.setStatus("idle"));
    yield put(
      snackbarActions.setSnackbarStatus({
        message: response.resMsg,
        severity: "success",
        open: true,
      })
    );
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}

function* getOptionSyllabusPatternMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const academicYearMasterId: any = yield select(getAcademicYearMasterId);
    const response: any = yield call(
      getOptionsSyllabusPattern,
      collegeID,
      academicYearMasterId,
      programMasterId
    );
    yield put(actions.setLoadGetOptionSyllabusPatternMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* syllabusPatternMasterSaga() {
  yield takeEvery(actions.load, getAllSyllabusPatternMasterSaga);
  yield takeEvery(
    actions.loadGetByIdSyllabusPatternMaster,
    getbyIdSyllabusPatternMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateSyllabusPatternMaster,
    saveSyllabusPatternMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteSyllabusPatternMaster,
    deleteSyllabusPatternMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionSyllabusPatternMasterSaga);
}
