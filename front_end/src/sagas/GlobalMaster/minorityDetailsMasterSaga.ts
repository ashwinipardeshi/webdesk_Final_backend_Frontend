import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllMinorityDetails,
  getByIdMinorityDetails,
  getOptionsMinorityDetails,
  addMinorityDetails,
  updateMinorityDetails,
  deleteMinorityDetails,
} from "../../services/GlobalMaster/minorityDetailsMasterService";
import { actions } from "../../store/GlobalMaster/minorityDetailsMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllMinorityDetailsMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getAllMinorityDetails);
    yield put(actions.setLoadGetAllMinorityDetailsMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* getbyIdMinorityDetailsMasterSaga(action: any): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getByIdMinorityDetails, action.payload);
    yield put(actions.setGetByIdMinorityDetailsMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveMinorityDetailsMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(actions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addMinorityDetails : updateMinorityDetails,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateMinorityDetailsMaster(response));
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

function* deleteMinorityDetailsMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(deleteMinorityDetails, id);
    yield put(actions.setDeleteMinorityDetailsMaster(response));
    const responseList: any = yield call(getAllMinorityDetails);
    yield put(actions.setLoadGetAllMinorityDetailsMaster(responseList.result));
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

function* getOptionsMinorityDetailsMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsMinorityDetails);
    yield put(actions.setLoadGetOptionMinorityDetailsMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* MinorityDetailsMasterSaga() {
  yield takeEvery(actions.load, getAllMinorityDetailsMasterSaga);
  yield takeEvery(
    actions.loadGetByIdMinorityDetailsMaster,
    getbyIdMinorityDetailsMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateMinorityDetailsMaster,
    saveMinorityDetailsMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteMinorityDetailsMaster,
    deleteMinorityDetailsMasterSaga
  );
  yield takeEvery(
    actions.loadOptionMinority,
    getOptionsMinorityDetailsMasterSaga
  );
}
