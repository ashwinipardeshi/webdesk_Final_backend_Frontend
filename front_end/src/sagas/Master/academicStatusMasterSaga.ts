import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  getAllAcademicStatus,
  getByIdAcademicStatus,
  getOptionsAcademicStatus,
  addAcademicStatus,
  updateAcademicStatus,
  deleteAcademicStatus,
} from "../../services/Master/academicStstusMasterService";
import { actions } from "../../store/Master/academicStatusMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllAcademicStatusMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllAcademicStatus, collegeID);
    yield put(actions.setLoadGetAllAcademicStatusMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdAcademicStatusMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdAcademicStatus, action.payload);
    yield put(actions.setGetByIdAcademicStatusMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveAcademicStatusMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addAcademicStatus : updateAcademicStatus,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateAcademicStatusMaster(response));
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
    }else {
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

function* deleteAcademicStatusMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteAcademicStatus, id);
    yield put(actions.setDeleteAcademicStatusMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllAcademicStatus, collegeID);
    yield put(actions.setLoadGetAllAcademicStatusMaster(responseList.result));
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

function* getOptionAcademicStatusMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsAcademicStatus, collegeID);
    yield put(actions.setLoadGetOptionAcademicStatusMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* academicStatusMasterSaga() {
  yield takeEvery(actions.load, getAllAcademicStatusMasterSaga);
  yield takeEvery(
    actions.loadGetByIdAcademicStatusMaster,
    getbyIdAcademicStatusMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateAcademicStatusMaster,
    saveAcademicStatusMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteAcademicStatusMaster,
    deleteAcademicStatusMasterSaga
  );
  yield takeEvery(actions.loadOptionsAcademicStatus, getOptionAcademicStatusMasterSaga);
}
