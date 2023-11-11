import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllSubCaste,
  getByIdSubCaste,
  addSubCaste,
  updateSubCaste,
  deleteSubCaste,
  getOptionsSubCaste,
} from "../../services/GlobalMaster/subCasteMasterService";
import { actions } from "../../store/GlobalMaster/subCasteMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllSubCasteMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllSubCaste);
    yield put(actions.setLoadGetAllSubCasteMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdSubCasteMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdSubCaste, action.payload);
    yield put(actions.setGetByIdSubCasteMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveSubCasteMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addSubCaste : updateSubCaste,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateSubCasteMaster(response));
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

function* deleteSubCasteMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteSubCaste, id);
    yield put(actions.setDeleteSubCasteMaster(response));
    const responseList: any = yield call(getAllSubCaste);
    yield put(actions.setLoadGetAllSubCasteMaster(responseList.result));
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

function* getOptionSubCasteMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsSubCaste);
    yield put(actions.setLoadGetOptionSubCasteMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* SubCasteMasterSaga() {
  yield takeEvery(actions.load, getAllSubCasteMasterSaga);
  yield takeEvery(actions.loadGetByIdSubCasteMaster, getbyIdSubCasteMasterSaga);
  yield takeEvery(actions.loadSaveUpdateSubCasteMaster, saveSubCasteMasterSaga);
  yield takeEvery(actions.loadDeleteSubCasteMaster, deleteSubCasteMasterSaga);
  yield takeEvery(actions.loadOptionSubCaste, getOptionSubCasteMasterSaga);
}
