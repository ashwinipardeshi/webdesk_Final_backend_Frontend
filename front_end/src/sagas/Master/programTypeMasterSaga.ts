import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllProgramType,
  getByIdProgramType,
  getOptionsProgramType,
  addProgramType,
  updateProgramType,
  deleteProgramType,
} from "../../services/Master/programTypeMaster";
import { actions } from "../../store/Master/programTypeMaster";
import { actions as notifierActions } from "../../store/notifications";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";

function* getAllProgramTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllProgramType, collegeID);
    yield put(actions.setLoadGetAllProgramTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdProgramTypeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdProgramType, action.payload);
    yield put(actions.setGetByIdProgramTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveProgramTypeMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addProgramType : updateProgramType,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateProgramTypeMaster(response));
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

function* deleteProgramTypeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteProgramType, id);
    yield put(actions.setDeleteProgramTypeMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllProgramType, collegeID);
    yield put(actions.setLoadGetAllProgramTypeMaster(responseList.result));
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

function* getOptionProgramTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsProgramType, collegeID);
    yield put(actions.setLoadGetOptionProgramTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* programTypeMasterSaga() {
  yield takeEvery(actions.load, getAllProgramTypeMasterSaga);
  yield takeEvery(
    actions.loadGetByIdProgramTypeMaster,
    getbyIdProgramTypeMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateProgramTypeMaster,
    saveProgramTypeMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteProgramTypeMaster,
    deleteProgramTypeMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionProgramTypeMasterSaga);
}
