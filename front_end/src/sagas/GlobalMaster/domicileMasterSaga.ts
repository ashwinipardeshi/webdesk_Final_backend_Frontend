import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllDomicile,
  getByIdDomicile,
  addDomicile,
  updateDomicile,
  deleteDomicile,
  getOptionsDomicile,
} from "../../services/GlobalMaster/domicileMasterServices";
import { actions } from "../../store/GlobalMaster/domicileMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllDomicileMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllDomicile);
    yield put(actions.setLoadGetAllDomicileMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdDomicileMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdDomicile, action.payload);
    yield put(actions.setGetByIdDomicileMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveDomicileMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addDomicile : updateDomicile,
      request
    );
    if (response.statusCode === 201 || response.statusCode === 202) {
      yield put(actions.setSaveUpdateDomicileMaster(response));
    }
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateDomicileMaster(response));
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

function* deleteDomicileMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteDomicile, id);
    yield put(actions.setDeleteDomicileMaster(response));
    const responseList: any = yield call(getAllDomicile);
    yield put(actions.setLoadGetAllDomicileMaster(responseList.result));
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

function* getOptionsDomicileMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsDomicile);
    yield put(actions.setLoadGetOptionDomicileMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* domicileMasterSaga() {
  yield takeEvery(actions.load, getAllDomicileMasterSaga);
  yield takeEvery(actions.loadGetByIdDomicileMaster, getbyIdDomicileMasterSaga);
  yield takeEvery(actions.loadSaveUpdateDomicileMaster, saveDomicileMasterSaga);
  yield takeEvery(actions.loadDeleteDomicileMaster, deleteDomicileMasterSaga);
  yield takeEvery(actions.loadOptionDomicile, getOptionsDomicileMasterSaga);
}
