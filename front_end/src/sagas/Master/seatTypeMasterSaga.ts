import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllSeatType,
  getByIdSeatType,
  addSeatType,
  updateSeatType,
  deleteSeatType,
  getOptionsSeatType,
} from "../../services/Master/seatTypeMasterService";
import { actions } from "../../store/Master/seatTypeMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllSeatTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllSeatType, collegeID);
    yield put(actions.setLoadGetAllSeatTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield put(loaderActions.setStatus("idle"));
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdSeatTypeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdSeatType, action.payload);
    yield put(actions.setGetByIdSeatTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveSeatTypeMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addSeatType : updateSeatType,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateSeatTypeMaster(response));
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

function* deleteSeatTypeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteSeatType, id);
    yield put(actions.setDeleteSeatTypeMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllSeatType, collegeID);
    yield put(actions.setLoadGetAllSeatTypeMaster(responseList.result));
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

function* getOptionSeatTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsSeatType, collegeID);
    yield put(actions.setLoadGetOptionSeatTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* seattypeMasterSaga() {
  yield takeEvery(actions.load, getAllSeatTypeMasterSaga);
  yield takeEvery(actions.loadGetByIdSeatTypeMaster, getbyIdSeatTypeMasterSaga);
  yield takeEvery(actions.loadSaveUpdateSeatTypeMaster, saveSeatTypeMasterSaga);
  yield takeEvery(actions.loadDeleteSeatTypeMaster, deleteSeatTypeMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionSeatTypeMasterSaga);
}
