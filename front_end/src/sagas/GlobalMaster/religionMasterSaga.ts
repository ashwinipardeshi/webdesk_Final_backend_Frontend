import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllReligion,
  getByIdReligion,
  getOptionsReligion,
  addReligion,
  updateReligion,
  deleteReligion,
} from "../../services/GlobalMaster/religionMasterService";
import { actions } from "../../store/GlobalMaster/religionMaster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllReligionMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllReligion);
    yield put(actions.setLoadGetAllReligionMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdReligionMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdReligion, action.payload);
    yield put(actions.setGetByIdReligionMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* saveReligionMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addReligion : updateReligion,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateReligionMaster(response));
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

function* deleteReligionMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteReligion, id);
    yield put(actions.setDeleteReligionMaster(response));
    const responseList: any = yield call(getAllReligion);
    yield put(actions.setLoadGetAllReligionMaster(responseList.result));
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

function* getOptionsReligionMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsReligion);
    yield put(actions.setLoadGetOptionReligionMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* religionMasterSaga() {
  yield takeEvery(actions.load, getAllReligionMasterSaga);
  yield takeEvery(actions.loadGetByIdReligionMaster, getbyIdReligionMasterSaga);
  yield takeEvery(actions.loadSaveUpdateReligionMaster, saveReligionMasterSaga);
  yield takeEvery(actions.loadDeleteReligionMaster, deleteReligionMasterSaga);
  yield takeEvery(actions.loadOptionReligion, getOptionsReligionMasterSaga);
}
