import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllMinority,
  getByIdMinority,
  addMinority,
  updateMinority,
  deleteMinority,
  getOptionsMinority,
} from "../../services/GlobalMaster/minorityMasterService";
import { actions } from "../../store/GlobalMaster/minorityMaster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllMinorityMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllMinority);
    yield put(actions.setLoadGetAllMinorityMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdMinorityMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdMinority, action.payload);
    yield put(actions.setGetByIdMinorityMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveMinorityMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addMinority : updateMinority,
      request
    );

    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateMinorityMaster(response));
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

function* deleteMinorityMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteMinority, id);
    yield put(actions.setDeleteMinorityMaster(response));
    const responseList: any = yield call(getAllMinority);
    yield put(actions.setLoadGetAllMinorityMaster(responseList.result));
    yield put(actions.setStatus("idle"));
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

function* getOptionsMinorityMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsMinority);
    yield put(actions.setLoadGetOptionMinorityMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* minorityMasterSaga() {
  yield takeEvery(actions.load, getAllMinorityMasterSaga);
  yield takeEvery(actions.loadGetByIdMinorityMaster, getbyIdMinorityMasterSaga);
  yield takeEvery(actions.loadSaveUpdateMinorityMaster, saveMinorityMasterSaga);
  yield takeEvery(actions.loadDeleteMinorityMaster, deleteMinorityMasterSaga);
  yield takeEvery(
    actions.loadOptionMinorityMaster,
    getOptionsMinorityMasterSaga
  );
}
