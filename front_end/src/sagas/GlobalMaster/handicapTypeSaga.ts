import { call, put, takeEvery } from "redux-saga/effects";
import {
  addHandicapType,
  deleteHandicapType,
  getAllHandicapType,
  getByIdHandicapType,
  getOptionsHandicapType,
  updateHandicapType,
} from "../../services/GlobalMaster/handicapTypeService";
import { actions } from "../../store/GlobalMaster/handicapType";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllHandicapTypeSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllHandicapType);
    yield put(actions.setLoadGetHandicapTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getByIdHandicapTypeSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const responce: any = yield call(getByIdHandicapType, action.payload);
    yield put(actions.setGetByIdHandicapType(responce.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getDeleteByIdHandicapType(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteHandicapType, id);
    yield put(actions.setDeleteHandicapType(response.result));
    const list: any = yield call(getAllHandicapType);
    yield put(actions.setLoadGetHandicapTypeMaster(list.result));
    yield put(loaderActions.setStatus("idle"));
    yield put(
      snackbarActions.setSnackbarStatus({
        message: response.resMsg,
        severity: "success",
        open: true,
      })
    );
  } catch (error) {
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

function* getSaveUpdateHandiacapType(action: any): Generator {
  const { type, request } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addHandicapType : updateHandicapType,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateHandicapType(response));
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
  } catch (error) {
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

function* getOptionsHandiacapTypeMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsHandicapType);
    yield put(actions.setLoadGetOptionHandicapTypeMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* handicapTypeSaga() {
  yield takeEvery(actions.load, getAllHandicapTypeSaga);
  yield takeEvery(actions.loadGetByIdHandicapType, getByIdHandicapTypeSaga);
  yield takeEvery(actions.loadDeleteHandicapType, getDeleteByIdHandicapType);
  yield takeEvery(
    actions.loadSaveUpdateHandicapType,
    getSaveUpdateHandiacapType
  );
  yield takeEvery(
    actions.loadOptionHandicap,
    getOptionsHandiacapTypeMasterSaga
  );
}
