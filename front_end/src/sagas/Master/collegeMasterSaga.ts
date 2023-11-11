import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllCollege,
  getByIdCollege,
  addCollege,
  updateCollege,
  deleteCollege,
  getOptionsCollege,
} from "../../services/Master/collegeMasterService";
import { actions } from "../../store/Master/collegeMaster";
import { actions as loaderActions } from "../../store/loader";
import { actions as notifierActions } from "../../store/notifications";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";

function* getAllCollegeMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getAllCollege);
    yield put(actions.setLoadGetAllCollegeMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdCollegeMasterSaga(action: any): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getByIdCollege, action.payload);
    yield put(actions.setGetByIdCollegeMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveCollegeMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(actions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addCollege : updateCollege,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateCollegeMaster(response));
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
    yield put(notifierActions.addSuccess("Saved Successfully!"));
  } catch (error: any) {
    yield put(loaderActions.setStatus("idle"));
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

function* deleteCollegeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(deleteCollege, id);
    yield put(actions.setDeleteCollegeMaster(response));
    const responseList: any = yield call(getAllCollege);
    yield put(actions.setLoadGetAllCollegeMaster(responseList.result));
    yield put(actions.setStatus("idle"));
    yield put(
      snackbarActions.setSnackbarStatus({
        message: response.resMsg,
        severity: "success",
        open: true,
      })
    );
  } catch (error: any) {
    yield put(loaderActions.setStatus("idle"));
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

function* getOptionCollegeMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsCollege);
    yield put(actions.setLoadGetOptionCollegeMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* collegeMasterSaga() {
  yield takeEvery(actions.load, getAllCollegeMasterSaga);
  yield takeEvery(actions.loadGetByIdCollegeMaster, getbyIdCollegeMasterSaga);
  yield takeEvery(actions.loadSaveUpdateCollegeMaster, saveCollegeMasterSaga);
  yield takeEvery(actions.loadDeleteCollegeMaster, deleteCollegeMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionCollegeMasterSaga);
}
