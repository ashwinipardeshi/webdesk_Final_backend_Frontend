import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllAccreditation,
  getByIdAccreditation,
  addAccreditation,
  updateAccreditation,
  deleteAccreditation,
  getOptionsAccreditation,
} from "../../services/Master/accreditationMasterService";
import { actions } from "../../store/Master/accreditationMaster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { PayloadAction } from "@reduxjs/toolkit";

  function* getAllAccreditationMasterSaga(action: PayloadAction<number>): Generator {
  const streamId = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const CollegeID:any=yield select(getCollegeId)
    const response: any = yield call(getAllAccreditation, CollegeID, streamId);
    yield put(actions.setLoadGetAllAccreditationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdAccreditationMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdAccreditation, action.payload);
    yield put(actions.setGetByIdAccreditationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveAccreditationMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const CollegeID:any=yield select(getCollegeId)
    request={
      ...request,
      collegeId:CollegeID,
    }
    const response: any = yield call(
      type === "ADD" ? addAccreditation : updateAccreditation,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateAccreditationMaster(response));
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

function* deleteAccreditationMasterSaga(action: any): Generator {
  const { id, streamId } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteAccreditation, id);
    yield put(actions.setDeleteAccreditationMaster(response));
    const CollegeID:any=yield select(getCollegeId)
    const responseList: any = yield call(getAllAccreditation, CollegeID, streamId);
    yield put(actions.setLoadGetAllAccreditationMaster(responseList.result));
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

  function* getOptionAccreditationMasterSaga(action: PayloadAction<number>): Generator {
  const streamId = action.payload;

  try {
    yield put(loaderActions.setStatus("loading"));
    const AccreditationMasterId: any = yield select(getCollegeId);
    if (!isNaN(streamId)) {
      const response: any = yield call(
        getOptionsAccreditation,
        AccreditationMasterId,
        streamId
      );
      yield put(actions.setLoadGetOptionAccreditationMaster(response.result));
    }
    const CollegeID:any=yield select(getCollegeId)
    const response: any = yield call(getOptionsAccreditation, CollegeID, streamId);
    yield put(actions.setLoadGetOptionAccreditationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* accreditationMasterSaga() {
  // yield takeEvery(actions.load, getAllAccreditationMasterSaga);
  yield takeEvery(actions.load, getAllAccreditationMasterSaga);
  yield takeEvery(actions.loadGetByIdAccreditationMaster, getbyIdAccreditationMasterSaga);
  yield takeEvery(actions.loadSaveUpdateAccreditationMaster, saveAccreditationMasterSaga);
  yield takeEvery(actions.loadDeleteAccreditationMaster, deleteAccreditationMasterSaga);
  yield takeEvery(actions.loadOptionsAccrediationMaster, getOptionAccreditationMasterSaga);
}
