import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllFeeHead,
  getByIdFeeHead,
  addFeeHead,
  updateFeeHead,
  deleteFeeHead,
  getOptionsFeeHead,
} from "../../services/Master/feeheadMasterServices";
import { actions } from "../../store/Master/feeheadMaster";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { getCollegeId } from "../../store/Authentication/authentication";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { PayloadAction } from "@reduxjs/toolkit";


function* getAllFeeHeadMasterSaga(action: PayloadAction<number>): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collageID: any = yield select(getCollegeId);
    const feeHeadTypeMasterId = action.payload;
    const response: any = yield call(
      getAllFeeHead,
      collageID,
      feeHeadTypeMasterId
    );
    yield put(actions.setLoadGetAllFeeHeadMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdFeeHeadMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdFeeHead, action.payload);
    yield put(actions.setGetByIdFeeHeadMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveFeeHeadMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collageID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collageID,
    };
    const response: any = yield call(
      type === "ADD" ? addFeeHead : updateFeeHead,
      request
    );
    if (response.statusCode === 201 || response.statusCode === 202) {
      yield put(actions.setSaveUpdateFeeHeadMaster(response));
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

function* deleteFeeHeadMasterSaga(action: any): Generator {
  const { id, feeHeadTypeMasterId } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteFeeHead, id);
    yield put(actions.setDeleteFeeHeadMaster(response));
    const collageID: any = yield select(getCollegeId);
    const responseList: any = yield call(
      getAllFeeHead,
      collageID,
      feeHeadTypeMasterId
    );
    yield put(actions.setLoadGetAllFeeHeadMaster(responseList.result));
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

function* getOptionFeeHeadMasterSaga(action: PayloadAction<number>): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collageID: any = yield select(getCollegeId);
    const feeHeadTypeMasterId = action.payload;
    const response: any = yield call(
      getOptionsFeeHead,
      collageID,
      feeHeadTypeMasterId
    );
    yield put(actions.setLoadGetOptionFeeHeadMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* feeheadMasterSaga() {
  yield takeEvery(actions.load, getAllFeeHeadMasterSaga);
  yield takeEvery(actions.loadGetByIdFeeHeadMaster, getbyIdFeeHeadMasterSaga);
  yield takeEvery(actions.loadSaveUpdateFeeHeadMaster, saveFeeHeadMasterSaga);
  yield takeEvery(actions.loadDeleteFeeHeadMaster, deleteFeeHeadMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionFeeHeadMasterSaga);
}
