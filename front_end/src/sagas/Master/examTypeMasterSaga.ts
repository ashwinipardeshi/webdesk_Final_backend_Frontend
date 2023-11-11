import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllExamType,
  getByIdExamType,
  addExamType,
  updateExamType,
  deleteExamType,
  getOptionsExamType,
} from "../../services/Master/examTypeMasterService";
import { actions } from "../../store/Master/examTypeMaster";
import { actions as loaderActions } from "../../store/loader";
import { globalErrorHandler } from "..";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { ADD, UPDATE } from "../../constant/statusCodes";

function* getAllExamTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllExamType, collegeID);
    yield put(actions.setLoadGetAllExamTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdExamTypeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdExamType, action.payload);
    yield put(actions.setGetByIdExamTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveExamTypeMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addExamType : updateExamType,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateExamTypeMaster(response));
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

function* deleteExamTypeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteExamType, id);
    yield put(actions.setDeleteExamTypeMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllExamType, collegeID);
    yield put(actions.setLoadGetAllExamTypeMaster(responseList.result));
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

function* getOptionExamTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsExamType, collegeID);
    yield put(actions.setLoadGetOptionExamTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* examTypeMasterSaga() {
  yield takeEvery(actions.load, getAllExamTypeMasterSaga);
  yield takeEvery(actions.loadGetByIdExamTypeMaster, getbyIdExamTypeMasterSaga);
  yield takeEvery(actions.loadSaveUpdateExamTypeMaster, saveExamTypeMasterSaga);
  yield takeEvery(actions.loadDeleteExamTypeMaster, deleteExamTypeMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionExamTypeMasterSaga);
}
