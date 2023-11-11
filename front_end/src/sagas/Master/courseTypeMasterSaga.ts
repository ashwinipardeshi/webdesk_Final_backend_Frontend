import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllCourseType,
  getByIdCourseType,
  addCourseType,
  updateCourseType,
  deleteCourseType,
  getOptionsCourseType,
} from "../../services/Master/courseTypeMasterService";
import { actions } from "../../store/Master/courseTypeMaster";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { getCollegeId } from "../../store/Authentication/authentication";

function* getAllCourseTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllCourseType, collegeID);
    yield put(actions.setLoadGetAllCourseTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdCourseTypeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdCourseType, action.payload);
    yield put(actions.setGetByIdCourseTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveCourseTypeMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addCourseType : updateCourseType,
      request
    );
    if (response.statusCode === 201 || response.statusCode === 202) {
      yield put(actions.setSaveUpdateCourseTypeMaster(response));
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

function* deleteCourseTypeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteCourseType, id);
    yield put(actions.setDeleteCourseTypeMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllCourseType, collegeID);
    yield put(actions.setLoadGetAllCourseTypeMaster(responseList.result));
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

function* getOptionCourseTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsCourseType, collegeID);
    yield put(actions.setLoadGetOptionCourseTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* courseTypeMasterSaga() {
  yield takeEvery(actions.load, getAllCourseTypeMasterSaga);
  yield takeEvery(
    actions.loadGetByIdCourseTypeMaster,
    getbyIdCourseTypeMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateCourseTypeMaster,
    saveCourseTypeMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteCourseTypeMaster,
    deleteCourseTypeMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionCourseTypeMasterSaga);
}
