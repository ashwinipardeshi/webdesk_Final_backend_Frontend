import { call, put, select, takeEvery } from "redux-saga/effects";
import { actions } from "../../store/Master/moduleMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import {
getAllModule,addModule,deleteModule,getByIdModule,getOptionsModule,updateModule
} from "../../services/Master/ModuleMasterService";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllModuleMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllModule);
    yield put(actions.setLoadGetAllModuleMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield put(loaderActions.setStatus("idle"));
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdModuleMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdModule, action.payload);
    yield put(actions.setGetByIdModuleMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield put(loaderActions.setStatus("idle"));
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveModuleMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addModule : updateModule,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateModuleMaster(response));
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

function* deleteModuleMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteModule, id);
    yield put(actions.setDeleteModuleMaster(response));
    const responseList: any = yield call(getAllModule);
    yield put(actions.setLoadGetAllModuleMaster(responseList.result));
    yield put(loaderActions.setStatus("idle"));
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

function* getOptionModuleMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsModule);
    yield put(actions.setLoadGetOptionModuleMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield put(loaderActions.setStatus("idle"));
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* ModuleMasterSaga() {
  yield takeEvery(actions.load, getAllModuleMasterSaga);
  yield takeEvery(actions.loadGetByIdModuleMaster, getbyIdModuleMasterSaga);
  yield takeEvery(actions.loadSaveUpdateModuleMaster, saveModuleMasterSaga);
  yield takeEvery(actions.loadDeleteModuleMaster, deleteModuleMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionModuleMasterSaga);
}
