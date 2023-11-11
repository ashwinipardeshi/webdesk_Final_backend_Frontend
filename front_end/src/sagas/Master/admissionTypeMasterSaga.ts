import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllAdmissionType,
  getByIdAdmissionType,
  getOptionsAdmissionType,
  addAdmissionType,
  updateAdmissionType,
  deleteAdmissionType,
} from "../../services/Master/admissionTypeMasterService";
import { actions } from "../../store/Master/admissionTypeMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";

function* getAllAdmissionTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllAdmissionType, CollegeID);
    yield put(actions.setLoadGetAllAdmissionTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdAdmissionTypeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdAdmissionType, action.payload);
    yield put(actions.setGetByIdAdmissionTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveAdmissionTypeMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: CollegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addAdmissionType : updateAdmissionType,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateAdmissionTypeMaster(response));
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

function* deleteAdmissionTypeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteAdmissionType, id);
    yield put(actions.setDeleteAdmissionTypeMaster(response));
    const CollegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllAdmissionType, CollegeID);
    yield put(actions.setLoadGetAllAdmissionTypeMaster(responseList.result));
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

function* getOptionAdmissionTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsAdmissionType, CollegeID);
    yield put(actions.setLoadGetOptionAdmissionTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* admissionTypeMasterSaga() {
  yield takeEvery(actions.load, getAllAdmissionTypeMasterSaga);
  yield takeEvery(
    actions.loadGetByIdAdmissionTypeMaster,
    getbyIdAdmissionTypeMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateAdmissionTypeMaster,
    saveAdmissionTypeMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteAdmissionTypeMaster,
    deleteAdmissionTypeMasterSaga
  );
  yield takeEvery(actions.loadOptionsAdmissionType, getOptionAdmissionTypeMasterSaga);
}
