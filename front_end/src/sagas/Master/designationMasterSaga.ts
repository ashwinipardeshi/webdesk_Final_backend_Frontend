import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllDesignation,
  getByIdDesignation,
  getOptionsDesignation,
  addDesignation,
  updateDesignation,
  deleteDesignation,
} from "../../services/Master/designationMasterService";
import { actions } from "../../store/Master/designationMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllDesignationMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllDesignation, collegeID);
    yield put(actions.setLoadGetAllDesignationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdDesignationMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdDesignation, action.payload);
    yield put(actions.setGetByIdDesignationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveDesignationMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addDesignation : updateDesignation,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateDesignationMaster(response));
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

function* deleteDesignationMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteDesignation, id);
    yield put(actions.setDeleteDesignationMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllDesignation, collegeID);
    yield put(actions.setLoadGetAllDesignationMaster(responseList.result));
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

function* getOptionDesignationMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsDesignation, collegeID);
    yield put(actions.setLoadGetOptionDesignationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* designationMasterSaga() {
  yield takeEvery(actions.load, getAllDesignationMasterSaga);
  yield takeEvery(
    actions.loadGetByIdDesignationMaster,
    getbyIdDesignationMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateDesignationMaster,
    saveDesignationMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteDesignationMaster,
    deleteDesignationMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionDesignationMasterSaga);
}
