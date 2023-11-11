import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllTimeSlot,
  getByIdTimeSlot,
  addTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} from "../../services/GlobalMaster/timeSlotMasterService";
import { actions } from "../../store/GlobalMaster/timeSlotMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllTimeSlotMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllTimeSlot);
    yield put(actions.setLoadGetAllTimeSlotMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdTimeSlotMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdTimeSlot, action.payload);
    yield put(actions.setGetByIdTimeSlotMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveTimeSlotMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addTimeSlot : updateTimeSlot,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateTimeSlotMaster(response));
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

function* deleteTimeSlotMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteTimeSlot, id);
    yield put(actions.setDeleteTimeSlotMaster(response));
    const responseList: any = yield call(getAllTimeSlot);
    yield put(actions.setLoadGetAllTimeSlotMaster(responseList.result));
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

// single entry point to start all Sagas at once
export default function* timeSlotMasterSaga() {
  yield takeEvery(actions.load, getAllTimeSlotMasterSaga);
  yield takeEvery(actions.loadGetByIdTimeSlotMaster, getbyIdTimeSlotMasterSaga);
  yield takeEvery(actions.loadSaveUpdateTimeSlotMaster, saveTimeSlotMasterSaga);
  yield takeEvery(actions.loadDeleteTimeSlotMaster, deleteTimeSlotMasterSaga);
}
