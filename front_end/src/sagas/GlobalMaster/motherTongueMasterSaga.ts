import { call, put, takeEvery } from "redux-saga/effects";
import { ADD, UPDATE } from "../../constant/statusCodes";
import {
  getAllMotherTongue,
  getByIdMotherTongue,
  addMotherTongue,
  updateMotherTongue,
  deleteMotherTongue,
  getOptionsMotherTongue,
} from "../../services/GlobalMaster/motherTongueMasterService";
import { actions } from "../../store/GlobalMaster/motherTongueMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllMotherTongueMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllMotherTongue);
    yield put(actions.setLoadGetAllMotherTongueMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdMotherTongueMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdMotherTongue, action.payload);
    yield put(actions.setGetByIdMotherTongueMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveMotherTongueMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addMotherTongue : updateMotherTongue,
      request
    );

    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateMotherTongueMaster(response));
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

function* deleteMotherTongueMasterSaga(action: any): Generator {
  const { id } = action.payload;

  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteMotherTongue, id);
    yield put(actions.setDeleteMotherTongueMaster(response));
    const responseList: any = yield call(getAllMotherTongue);
    yield put(actions.setLoadGetAllMotherTongueMaster(responseList.result));
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

function* getOptionsMotherTongueMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsMotherTongue);
    yield put(actions.setLoadGetOptionMotherTongueMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* motherTongueMasterSaga() {
  yield takeEvery(actions.load, getAllMotherTongueMasterSaga);
  yield takeEvery(
    actions.loadGetByIdMotherTongueMaster,
    getbyIdMotherTongueMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateMotherTongueMaster,
    saveMotherTongueMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteMotherTongueMaster,
    deleteMotherTongueMasterSaga
  );
  yield takeEvery(
    actions.loadOptionMotherTongue,
    getOptionsMotherTongueMasterSaga
  );
}
