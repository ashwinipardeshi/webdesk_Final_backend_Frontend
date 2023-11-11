import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  getAllAllotmentCategory,
  getByIdAllotmentCategory,
  getOptionsAllotmentCategory,
  addAllotmentCategory,
  updateAllotmentCategory,
  deleteAllotmentCategory,
} from "../../services/Master/allotmentCategoryMasterService";
import { actions } from "../../store/Master/allotmentCategoryMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllAllotmentCategoryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllAllotmentCategory, collegeID);
    yield put(actions.setLoadGetAllAllotmentCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdAllotmentCategoryMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdAllotmentCategory, action.payload);
    yield put(actions.setGetByIdAllotmentCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveAllotmentCategoryMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addAllotmentCategory : updateAllotmentCategory,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateAllotmentCategoryMaster(response));
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

function* deleteAllotmentCategoryMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteAllotmentCategory, id);
    yield put(actions.setDeleteAllotmentCategoryMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllAllotmentCategory, collegeID);
    yield put(
      actions.setLoadGetAllAllotmentCategoryMaster(responseList.result)
    );
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

function* getOptionAllotmentCategoryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsAllotmentCategory, collegeID);
    yield put(actions.setLoadGetOptionAllotmentCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* allotmentCategoryMasterSaga() {
  yield takeEvery(actions.load, getAllAllotmentCategoryMasterSaga);
  yield takeEvery(
    actions.loadGetByIdAllotmentCategoryMaster,
    getbyIdAllotmentCategoryMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateAllotmentCategoryMaster,
    saveAllotmentCategoryMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteAllotmentCategoryMaster,
    deleteAllotmentCategoryMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionAllotmentCategoryMasterSaga);
}
