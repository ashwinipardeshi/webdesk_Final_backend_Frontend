import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllProgramYear,
  getByIdProgramYear,
  addProgramYear,
  updateProgramYear,
  deleteProgramYear,
  getOptionsProgramYear,
} from "../../services/Master/programYearMasterService";
import { actions } from "../../store/Master/programYearMaster";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { getCollegeId } from "../../store/Authentication/authentication";

function* getAllProgramYearMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllProgramYear, collegeID);
    yield put(actions.setLoadGetAllProgramYearMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdProgramYearMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdProgramYear, action.payload);
    yield put(actions.setGetByIdProgramYearMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveProgramYearMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addProgramYear : updateProgramYear,
      request
    );
    if (response.statusCode === 201 || response.statusCode === 202) {
      yield put(actions.setSaveUpdateProgramYearMaster(response));
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

function* deleteProgramYearMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteProgramYear, id);
    yield put(actions.setDeleteProgramYearMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllProgramYear, collegeID);
    yield put(actions.setLoadGetAllProgramYearMaster(responseList.result));
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

function* getOptionProgramYearMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsProgramYear, collegeID);
    yield put(actions.setLoadGetOptionProgramYearMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* programYearMasterSaga() {
  yield takeEvery(actions.load, getAllProgramYearMasterSaga);
  yield takeEvery(
    actions.loadGetByIdProgramYearMaster,
    getbyIdProgramYearMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateProgramYearMaster,
    saveProgramYearMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteProgramYearMaster,
    deleteProgramYearMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionProgramYearMasterSaga);
}
