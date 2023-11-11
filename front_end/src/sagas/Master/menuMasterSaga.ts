import { call, put, select, takeEvery } from "redux-saga/effects";
import { actions } from "../../store/Master/menuMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import {
  getAllMenu,
  addMenu,
  deleteMenu,
  getByIdMenu,
  getOptionsMenu,
  updateMenu,
} from "../../services/Master/menuMasterService";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllMenuMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllMenu);
    yield put(actions.setLoadGetAllMenuMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdMenuMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdMenu, action.payload);
    yield put(actions.setGetByIdMenuMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveMenuMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addMenu : updateMenu,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateMenuMaster(response));
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

function* deleteMenuMasterSaga(action: any): Generator {
  debugger
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteMenu, id);
    yield put(actions.setDeleteMenuMaster(response));
    const responseList: any = yield call(getAllMenu);
    yield put(actions.setLoadGetAllMenuMaster(responseList.result));
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

function* getOptionMenuMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsMenu);
    yield put(actions.setLoadGetOptionMenuMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* MenuMasterSaga() {
  yield takeEvery(actions.load, getAllMenuMasterSaga);
  yield takeEvery(actions.loadGetByIdMenuMaster, getbyIdMenuMasterSaga);
  yield takeEvery(actions.loadSaveUpdateMenuMaster, saveMenuMasterSaga);
  yield takeEvery(actions.loadDeleteMenuMaster, deleteMenuMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionMenuMasterSaga);
}
