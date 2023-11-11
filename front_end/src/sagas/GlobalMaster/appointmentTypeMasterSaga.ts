import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllAppointmentType,
  getByIdAppointmentType,
  addAppointmentType,
  updateAppointmentType,
  deleteAppointmentType,
  getOptionsAppointmentType,
} from "../../services/GlobalMaster/appointmentTypeMasterService";
import { actions } from "../../store/GlobalMaster/appointmentTypeMaster";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";

function* getAllAppointmentTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllAppointmentType);
    yield put(actions.setLoadGetAllAppointmentTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdAppointmentTypeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdAppointmentType, action.payload);
    yield put(actions.setGetByIdAppointmentTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveAppointmentTypeMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addAppointmentType : updateAppointmentType,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateAppointmentTypeMaster(response));
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
    }
    yield put(
      snackbarActions.setSnackbarStatus({
        message: response.resMsg,
        severity: "error",
        open: true,
      })
    );
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

function* deleteAppointmentTypeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteAppointmentType, id);
    yield put(actions.setDeleteAppointmentTypeMaster(response));
    const responseList: any = yield call(getAllAppointmentType);
    yield put(actions.setLoadGetAllAppointmentTypeMaster(responseList.result));
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

function* getOptionAppointmentTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsAppointmentType);
    yield put(actions.setLoadGetOptionAppointmentTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* appointmentTypeMasterSaga() {
  yield takeEvery(actions.load, getAllAppointmentTypeMasterSaga);
  yield takeEvery(
    actions.loadGetByIdAppointmentTypeMaster,
    getbyIdAppointmentTypeMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateAppointmentTypeMaster,
    saveAppointmentTypeMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteAppointmentTypeMaster,
    deleteAppointmentTypeMasterSaga
  );
  yield takeEvery(
    actions.loadOptionAppointmentType,
    getOptionAppointmentTypeMasterSaga
  );
}
