import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  addBranch,
  deleteBranch,
  getAllBranch,
  getByIdBranch,
  getOptionsBranch,
  updateBranch,
} from "../../services/Master/branchMasterService";
import { actions } from "../../store/Master/branchMaster";
import { actions as loaderActions } from "../../store/loader";
import { actions as notifierActions } from "../../store/notifications";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { getCollegeId } from "../../store/Authentication/authentication";
import { PayloadAction } from "@reduxjs/toolkit";

function* getAllBranchMasterSaga(action: PayloadAction<number>): Generator {
  const programMasterId = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeId: any = yield select(getCollegeId);
    const response: any = yield call(getAllBranch, collegeId, programMasterId);
    yield put(actions.setLoadGetAllBranchMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdBranchMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdBranch, action.payload);
    yield put(actions.setGetByIdBranchMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveBranchMasterSaga(action: any): Generator {
  try {
    const collegeId: any = yield select(getCollegeId);
    const { type, request } = action.payload;
    const newReq = { ...request, collegeId };
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addBranch : updateBranch,
      newReq
    );
    if (response.statusCode === 201 || response.statusCode === 202) {
      yield put(actions.setSaveUpdateBranchMaster(response));
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

function* deleteBranchMasterSaga(action: any): Generator {
  const { id, collegeId, programMasterId } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteBranch, id);
    yield put(actions.setDeleteBranchMaster(response));
    const responseList: any = yield call(
      getAllBranch,
      collegeId,
      programMasterId
    );
    yield put(actions.setLoadGetAllBranchMaster(responseList.result));
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

function* getOptionBranchMasterSaga(action: PayloadAction<number>): Generator {
  const programMasterId = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const BranchID: any = yield select(getCollegeId);
    if (!isNaN(programMasterId)) {
      const response: any = yield call(
        getOptionsBranch,
        BranchID,
        programMasterId
      );
      yield put(actions.setLoadGetOptionBranchMaster(response.result));
    }
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* BranchMasterSaga() {
  yield takeEvery(actions.load, getAllBranchMasterSaga);
  yield takeEvery(actions.loadGetByIdBranchMaster, getbyIdBranchMasterSaga);
  yield takeEvery(actions.loadSaveUpdateBranchMaster, saveBranchMasterSaga);
  yield takeEvery(actions.loadDeleteBranchMaster, deleteBranchMasterSaga);
  yield takeEvery(actions.loadOptionsBranchMaster, getOptionBranchMasterSaga);
}
