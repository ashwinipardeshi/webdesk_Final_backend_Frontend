import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllAcademicYear,
  getByIdAcademicYear,
  addAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
  getOptionsAcademicYear,
} from "../../services/Master/academicYearMasterService";
import { actions } from "../../store/Master/academicYearMaster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { PayloadAction } from "@reduxjs/toolkit";

const streamId = 1;

function* getAllAcademicYearMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllAcademicYear, CollegeID, streamId);
    yield put(actions.setLoadGetAllAcademicYearMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdAcademicYearMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdAcademicYear, action.payload);
    yield put(actions.setGetByIdAcademicYearMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveAcademicYearMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: CollegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addAcademicYear : updateAcademicYear,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateAcademicYearMaster(response));
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

function* deleteAcademicYearMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteAcademicYear, id);
    yield put(actions.setDeleteAcademicYearMaster(response));
    const CollegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(
      getAllAcademicYear,
      CollegeID,
      streamId
    );
    yield put(actions.setLoadGetAllAcademicYearMaster(responseList.result));
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


function* getOptionAcademicYearMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    const response: any = yield call(
      getOptionsAcademicYear,
      CollegeID,
      streamId
    );
    yield put(actions.setLoadGetOptionAcademicYearMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}


function* getSignOptionAcademicYearMasterSaga(action: PayloadAction<any>): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const { collegeId, streamId } = action.payload;
    const response: any = yield call(
      getOptionsAcademicYear,
      collegeId,
      streamId
    );
    yield put(actions.setLoadGetOptionAcademicYearMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* academicYearMasterSaga() {
  yield takeEvery(actions.load, getAllAcademicYearMasterSaga);
  yield takeEvery(
    actions.loadGetByIdAcademicYearMaster,
    getbyIdAcademicYearMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateAcademicYearMaster,
    saveAcademicYearMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteAcademicYearMaster,
    deleteAcademicYearMasterSaga
  );
  yield takeEvery(actions.loadOptionsAcademicYear, getOptionAcademicYearMasterSaga);
  yield takeEvery(actions.loadSignOptions, getSignOptionAcademicYearMasterSaga);
}
