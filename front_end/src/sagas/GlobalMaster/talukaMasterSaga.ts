import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllTaluka,
  getByIdTaluka,
  addTaluka,
  updateTaluka,
  deleteTaluka,
  getOptionsTaluka,
} from "../../services/GlobalMaster/talukaMasterService";
import { actions } from "../../store/GlobalMaster/talukaMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllTalukaMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllTaluka);
    yield put(actions.setLoadGetAllTalukaMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdTalukaMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdTaluka, action.payload);
    yield put(actions.setGetByIdTalukaMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveTalukaMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addTaluka : updateTaluka,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateTalukaMaster(response));
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

function* deleteTalukaMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteTaluka, id);
    yield put(actions.setDeleteTalukaMaster(response));
    const responseList: any = yield call(getAllTaluka);
    yield put(actions.setLoadGetAllTalukaMaster(responseList.result));
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
function* getOptionTalukaMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsTaluka);
    yield put(actions.setLoadGetOptionTalukaMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* talukaMasterSaga() {
  yield takeEvery(actions.load, getAllTalukaMasterSaga);
  yield takeEvery(actions.loadGetByIdTalukaMaster, getbyIdTalukaMasterSaga);
  yield takeEvery(actions.loadSaveUpdateTalukaMaster, saveTalukaMasterSaga);
  yield takeEvery(actions.loadDeleteTalukaMaster, deleteTalukaMasterSaga);
  yield takeEvery(actions.loadOptionTaluka, getOptionTalukaMasterSaga);
}
