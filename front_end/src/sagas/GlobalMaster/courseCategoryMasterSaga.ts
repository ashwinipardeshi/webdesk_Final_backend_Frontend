import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllCourseCategory,
  getByIdCourseCategory,
  getOptionsCourseCategory,
  addCourseCategory,
  updateCourseCategory,
  deleteCourseCategory,
} from "../../services/GlobalMaster/courseCategoryMasterService";
import { actions } from "../../store/GlobalMaster/courseCategoryMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllCourseCategoryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllCourseCategory);
    yield put(actions.setLoadGetAllCourseCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdCourseCategoryMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdCourseCategory, action.payload);
    yield put(actions.setGetByIdCourseCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveCourseCategoryMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addCourseCategory : updateCourseCategory,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateCourseCategoryMaster(response));
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

function* deleteCourseCategoryMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteCourseCategory, id);
    yield put(actions.setDeleteCourseCategoryMaster(response));
    const responseList: any = yield call(getAllCourseCategory);
    yield put(actions.setLoadGetAllCourseCategoryMaster(responseList.result));
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

function* getOptionCourseCategoryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsCourseCategory);
    yield put(actions.setLoadGetOptionCourseCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* courseCategoryMasterSaga() {
  yield takeEvery(actions.load, getAllCourseCategoryMasterSaga);
  yield takeEvery(
    actions.loadGetByIdCourseCategoryMaster,
    getbyIdCourseCategoryMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateCourseCategoryMaster,
    saveCourseCategoryMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteCourseCategoryMaster,
    deleteCourseCategoryMasterSaga
  );
  yield takeEvery(actions.loadOptionCourse, getOptionCourseCategoryMasterSaga);
}
