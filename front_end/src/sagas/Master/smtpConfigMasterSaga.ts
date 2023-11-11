import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllSMTPConfig,
  getByIdSMTPConfig,
  getOptionsSMTPConfig,
  addSMTPConfig,
  updateSMTPConfig,
  deleteSMTPConfig,
} from "../../services/Master/smtpConfigMasterServices";
import { actions } from "../../store/Master/smtpConfigMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllSMTPConfigMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllSMTPConfig, collegeID);
    yield put(actions.setLoadGetAllSMTPConfigMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdSMTPConfigMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdSMTPConfig, action.payload);
    yield put(actions.setGetByIdSMTPConfigMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveSMTPConfigMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addSMTPConfig : updateSMTPConfig,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateSMTPConfigMaster(response));
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

function* deleteSMTPConfigMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteSMTPConfig, id);
    yield put(actions.setDeleteSMTPConfigMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllSMTPConfig, collegeID);
    yield put(actions.setLoadGetAllSMTPConfigMaster(responseList.result));
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

function* getOptionSMTPConfigMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsSMTPConfig, collegeID);
    yield put(actions.setLoadGetOptionSMTPConfigMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* smtpConfigMasterSaga() {
  yield takeEvery(actions.load, getAllSMTPConfigMasterSaga);
  yield takeEvery(
    actions.loadGetByIdSMTPConfigMaster,
    getbyIdSMTPConfigMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateSMTPConfigMaster,
    saveSMTPConfigMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteSMTPConfigMaster,
    deleteSMTPConfigMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionSMTPConfigMasterSaga);
}
