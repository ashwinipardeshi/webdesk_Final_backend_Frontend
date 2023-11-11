import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllProgram,
  getByIdProgram,
  addProgram,
  updateProgram,
  deleteProgram,
  getOptionsProgram,
} from "../../services/Master/programMasterService";
import { actions } from "../../store/Master/programMaster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { getCollegeId } from "../../store/Authentication/authentication";
import { PayloadAction } from "@reduxjs/toolkit";

const streamId = 1;

function* getAllProgramMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId)
    const response: any = yield call(getAllProgram, CollegeID, streamId);
    yield put(actions.setLoadGetAllProgramMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdProgramMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdProgram, action.payload);
    yield put(actions.setGetByIdProgramMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveProgramMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: CollegeID,
    }
    const response: any = yield call(
      type === "ADD" ? addProgram : updateProgram,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateProgramMaster(response));
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

function* deleteProgramMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteProgram, id);
    yield put(actions.setDeleteProgramMaster(response));
    const CollegeID: any = yield select(getCollegeId)
    const responseList: any = yield call(getAllProgram, CollegeID, streamId);
    yield put(actions.setLoadGetAllProgramMaster(responseList.result));
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

function* getOptionProgramMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId)
    const response: any = yield call(getOptionsProgram, CollegeID, streamId);
    yield put(actions.setLoadGetOptionProgramMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getSignOptionProgramMasterSaga(action: PayloadAction<any>): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const { collegeId, streamId } = action.payload;
    const response: any = yield call(getOptionsProgram, collegeId, streamId);
    yield put(actions.setLoadGetOptionProgramMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* programMasterSaga() {
  yield takeEvery(actions.load, getAllProgramMasterSaga);
  yield takeEvery(actions.loadGetByIdProgramMaster, getbyIdProgramMasterSaga);
  yield takeEvery(actions.loadSaveUpdateProgramMaster, saveProgramMasterSaga);
  yield takeEvery(actions.loadDeleteProgramMaster, deleteProgramMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionProgramMasterSaga);
  yield takeEvery(actions.loadSignOptions, getSignOptionProgramMasterSaga);
}
