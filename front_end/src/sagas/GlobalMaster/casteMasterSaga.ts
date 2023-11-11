import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllCaste,
  getByIdCaste,
  addCaste,
  updateCaste,
  deleteCaste,
  getOptionsCaste,
} from "../../services/GlobalMaster/casteMasterService";
import { actions } from "../../store/GlobalMaster/casteMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllCasteMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllCaste);
    yield put(actions.setLoadGetAllCasteMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* getbyIdCasteMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdCaste, action.payload);
    yield put(actions.setGetByIdCasteMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveCasteMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addCaste : updateCaste,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateCasteMaster(response));
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

function* deleteCasteMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteCaste, id);
    yield put(actions.setDeleteCasteMaster(response));
    const responseList: any = yield call(getAllCaste);
    yield put(actions.setLoadGetAllCasteMaster(responseList.result));
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

function* getOptionCasteMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsCaste);
    yield put(actions.setLoadGetOptionCasteMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
// single entry point to start all Sagas at once
export default function* casteMasterSaga() {
  yield takeEvery(actions.load, getAllCasteMasterSaga);
  yield takeEvery(actions.loadGetByIdCasteMaster, getbyIdCasteMasterSaga);
  yield takeEvery(actions.loadSaveUpdateCasteMaster, saveCasteMasterSaga);
  yield takeEvery(actions.loadDeleteCasteMaster, deleteCasteMasterSaga);
  yield takeEvery(actions.loadOptionCaste, getOptionCasteMasterSaga);
}
