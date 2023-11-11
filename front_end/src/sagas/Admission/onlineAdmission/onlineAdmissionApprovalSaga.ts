import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllOnlineAdmissionStudentDetails,
  updateOnlineAdmissionConfirmation,
  updateOnlineAdmissionReject,
  updateOnlineAdmissionStatusUpdate,
} from "../../../services/Admission/onlineAdmission/onlineAdmissionApproval";
import { actions } from "../../../store/Admission/onlineAdmission/onlineAdmissionApproval";
import { actions as loaderActions } from "../../../store/loader";
import { actions as snackbarActions } from "../../../store/snackbarToster";
import { globalErrorHandler } from "../..";
import { SUCCESS } from "../../../constant/statusCodes";

function* getAllOnlineAdmissionStudentDetailsSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllOnlineAdmissionStudentDetails);
    if (response.value) {
      yield put(
        actions.setLoadGetAllOnlineAdmissionStudentDetails(response.value)
      );
      yield put(loaderActions.setStatus("idle"));
    }
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* updateOnlineAdmissionConfirmationSaga(action: any): Generator {
  try {
    const { request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      updateOnlineAdmissionConfirmation,
      request
    );
    if (response.statusCode === SUCCESS) {
      yield put(actions.setUpdateOnlineAdmissionConfirmation(response));
      const getAllresponse: any = yield call(
        getAllOnlineAdmissionStudentDetails
      );
      yield put(
        actions.setLoadGetAllOnlineAdmissionStudentDetails(getAllresponse.value)
      );
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
      yield put(loaderActions.setStatus("idle"));
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

function* updateOnlineAdmissionRejectSaga(action: any): Generator {
  try {
    const { request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(updateOnlineAdmissionReject, request);
    if (response.statusCode === SUCCESS) {
      yield put(actions.setUpdateOnlineAdmissionReject(response));
      const getAllresponse: any = yield call(
        getAllOnlineAdmissionStudentDetails
      );
      yield put(
        actions.setLoadGetAllOnlineAdmissionStudentDetails(getAllresponse.value)
      );
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
      yield put(loaderActions.setStatus("idle"));
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

function* updateOnlineAdmissionStatusUpdateSaga(action: any): Generator {
  try {
    const { request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      updateOnlineAdmissionStatusUpdate,
      request
    );
    if (response.statusCode === SUCCESS) {
      yield put(actions.setUpdateOnlineAdmissionStatusUpdate(response));
      const getAllresponse: any = yield call(
        getAllOnlineAdmissionStudentDetails
      );
      yield put(
        actions.setLoadGetAllOnlineAdmissionStudentDetails(getAllresponse.value)
      );
      yield put(
        snackbarActions.setSnackbarStatus({
          message: response.resMsg,
          severity: "success",
          open: true,
        })
      );
      yield put(loaderActions.setStatus("idle"));
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

export default function* onlineAdmissionStudentDetailsSaga() {
  yield takeEvery(actions.load, getAllOnlineAdmissionStudentDetailsSaga);
  yield takeEvery(
    actions.loadUpdateOnlineAdmissionConfirmation,
    updateOnlineAdmissionConfirmationSaga
  );
  yield takeEvery(
    actions.loadUpdateOnlineAdmissionReject,
    updateOnlineAdmissionRejectSaga
  );
  yield takeEvery(
    actions.loadUpdateOnlineAdmissionStatusUpdate,
    updateOnlineAdmissionStatusUpdateSaga
  );
}
