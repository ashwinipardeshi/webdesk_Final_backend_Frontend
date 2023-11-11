import { call, put, takeEvery } from "redux-saga/effects";
import { ADD, UPDATE } from "../../constant/statusCodes";
import {
  getAllBloodGroup,
  getByIdBloodGroup,
  addBloodGroup,
  updateBloodGroup,
  deleteBloodGroup,
  getOptionsBloodGroup,
} from "../../services/GlobalMaster/bloodGroupMasterService";
import { actions } from "../../store/GlobalMaster/bloodGroupMaster";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";

function* getAllBloodGroupMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllBloodGroup);
    yield put(actions.setLoadGetAllBloodGroupMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdBloodGroupMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdBloodGroup, action.payload);
    yield put(actions.setGetByIdBloodGroupMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveBloodGroupMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addBloodGroup : updateBloodGroup,
      request
    );

    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateBloodGroupMaster(response));
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

function* deleteBloodGroupMasterSaga(action: any): Generator {
  const { id } = action.payload;

  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteBloodGroup, id);
    yield put(actions.setDeleteBloodGroupMaster(response));
    const responseList: any = yield call(getAllBloodGroup);
    yield put(actions.setLoadGetAllBloodGroupMaster(responseList.result));
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

function* getOptionsBloodGroupMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsBloodGroup);
    yield put(actions.setLoadGetOptionBloodGroupMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* bloodGroupMasterSaga() {
  yield takeEvery(actions.load, getAllBloodGroupMasterSaga);
  yield takeEvery(
    actions.loadGetByIdBloodGroupMaster,
    getbyIdBloodGroupMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateBloodGroupMaster,
    saveBloodGroupMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteBloodGroupMaster,
    deleteBloodGroupMasterSaga
  );
  yield takeEvery(
    actions.loadOptionOptionBloodGroup,
    getOptionsBloodGroupMasterSaga
  );
}
