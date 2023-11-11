import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllCandidatureType,
  getByIdCandidatureType,
  addCandidatureType,
  updateCandidatureType,
  deleteCandidatureType,
  getOptionsCandidatureType,
} from "../../services/GlobalMaster/candidatureTypeMasterService";
import { actions } from "../../store/GlobalMaster/candidatureTypeMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllCandidatureTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllCandidatureType);
    yield put(actions.setLoadGetAllCandidatureTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdCandidatureTypeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdCandidatureType, action.payload);
    yield put(actions.setGetByIdCandidatureTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveCandidatureTypeMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addCandidatureType : updateCandidatureType,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateCandidatureTypeMaster(response));
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

function* deleteCandidatureTypeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteCandidatureType, id);
    yield put(actions.setDeleteCandidatureTypeMaster(response));
    const responseList: any = yield call(getAllCandidatureType);
    yield put(actions.setLoadGetAllCandidatureTypeMaster(responseList.result));
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

function* getOptionCandidatureTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsCandidatureType);
    yield put(actions.setLoadGetOptionCandidatureTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* candidatureTypeMasterSaga() {
  yield takeEvery(actions.load, getAllCandidatureTypeMasterSaga);
  yield takeEvery(
    actions.loadGetByIdCandidatureTypeMaster,
    getbyIdCandidatureTypeMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateCandidatureTypeMaster,
    saveCandidatureTypeMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteCandidatureTypeMaster,
    deleteCandidatureTypeMasterSaga
  );
  yield takeEvery(
    actions.loadCandidatureType,
    getOptionCandidatureTypeMasterSaga
  );
}
