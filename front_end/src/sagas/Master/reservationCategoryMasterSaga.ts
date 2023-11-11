import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllReservationCategory,
  getByIdReservationCategory,
  getOptionsReservationCategory,
  addReservationCategory,
  updateReservationCategory,
  deleteReservationCategory,
} from "../../services/Master/reservationCategoryMasterService";
import { actions } from "../../store/Master/reservationCategoryMaster";
import { actions as notifierActions } from "../../store/notifications";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllReservationCategoryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllReservationCategory, collegeID);
    yield put(actions.setLoadGetAllReservationCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(loaderActions.setStatus("idle"));
  }
}

function* getbyIdReservationCategoryMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      getByIdReservationCategory,
      action.payload
    );
    yield put(actions.setGetByIdReservationCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveReservationCategoryMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addReservationCategory : updateReservationCategory,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateReservationCategoryMaster(response));
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

function* deleteReservationCategoryMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteReservationCategory, id);
    yield put(actions.setDeleteReservationCategoryMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllReservationCategory, collegeID);
    yield put(
      actions.setLoadGetAllReservationCategoryMaster(responseList.result)
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

function* getOptionReservationCategoryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsReservationCategory, collegeID);
    yield put(
      actions.setLoadGetOptionReservationCategoryMaster(response.result)
    );
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* ReservationCategoryMasterSaga() {
  yield takeEvery(actions.load, getAllReservationCategoryMasterSaga);
  yield takeEvery(
    actions.loadGetByIdReservationCategoryMaster,
    getbyIdReservationCategoryMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateReservationCategoryMaster,
    saveReservationCategoryMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteReservationCategoryMaster,
    deleteReservationCategoryMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionReservationCategoryMasterSaga);
}
