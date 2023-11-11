import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllStudy,
  getByIdStudy,
  addStudy,
  updateStudy,
  deleteStudy,
  getOptionsStudy,
} from "../../services/Master/studyMasterService";
import { actions } from "../../store/Master/studyMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllStudyMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllStudy, collegeID);
    yield put(actions.setLoadGetAllStudyMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdStudyMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdStudy, action.payload);
    yield put(actions.setGetByIdStudyMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield put(loaderActions.setStatus("idle"));
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveStudyMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addStudy : updateStudy,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateStudyMaster(response));
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

function* deleteStudyMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteStudy, id);
    yield put(actions.setDeleteStudyMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllStudy, collegeID);
    yield put(actions.setLoadGetAllStudyMaster(responseList.result));
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

function* getOptionStudyMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsStudy, collegeID);
    yield put(actions.setLoadGetOptionStudyMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* studyMasterSaga() {
  yield takeEvery(actions.load, getAllStudyMasterSaga);
  yield takeEvery(actions.loadGetByIdStudyMaster, getbyIdStudyMasterSaga);
  yield takeEvery(actions.loadSaveUpdateStudyMaster, saveStudyMasterSaga);
  yield takeEvery(actions.loadDeleteStudyMaster, deleteStudyMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionStudyMasterSaga);
}
