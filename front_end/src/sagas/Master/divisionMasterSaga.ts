import { call, put, select, takeEvery } from "redux-saga/effects";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions } from "../../store/Master/divisionMaster";
import { getCollegeId } from "../../store/Authentication/authentication";
import {
  getAllDivision,
  addDivision,
  deleteDivision,
  getByIdDivision,
  getOptionsDivision,
  updateDivision,
} from "../../services/Master/divisionMasterService";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllDivisionMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllDivision, collegeID);
    yield put(actions.setLoadGetAllDivisionMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdDivisionMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdDivision, action.payload);
    yield put(actions.setGetByIdDivisionMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* saveDivisionMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addDivision : updateDivision,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateDivisionMaster(response));
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

function* deleteDivisionMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteDivision, id);
    yield put(actions.setDeleteDivisionMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllDivision, collegeID);
    yield put(actions.setLoadGetAllDivisionMaster(responseList.result));
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

function* getOptionDivisionMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsDivision, collegeID);
    yield put(actions.setLoadGetOptionDivisionMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield put(loaderActions.setStatus("idle"));
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* divisionMasterSaga() {
  yield takeEvery(actions.load, getAllDivisionMasterSaga);
  yield takeEvery(actions.loadGetByIdDivisionMaster, getbyIdDivisionMasterSaga);
  yield takeEvery(actions.loadSaveUpdateDivisionMaster, saveDivisionMasterSaga);
  yield takeEvery(actions.loadDeleteDivisionMaster, deleteDivisionMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionDivisionMasterSaga);
}
