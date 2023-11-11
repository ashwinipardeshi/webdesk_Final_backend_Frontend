import { call, put, takeEvery, select } from "redux-saga/effects";
import { 
    getAllModeOfAdmission,
    getByIdModeOfAdmission,
    getOptionsModeOfAdmission,
    addModeOfAdmission,
    updateModeOfAdmission,
    deleteModeOfAdmission,
} from "../../services/Master/modeOfAdmissionMasterService";
import { actions } from "../../store/Master/modeOfAdmissionMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllModeOfAdmissionMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllModeOfAdmission, collegeID);
    yield put(actions.setLoadGetAllModeOfAdmissionMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, actions, "error");
  }
}

function* getbyIdModeOfAdmissionMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdModeOfAdmission, action.payload);
    yield put(actions.setGetByIdModeOfAdmissionMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, actions, "error");
  }
}
function* saveModeOfAdmissionMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addModeOfAdmission : updateModeOfAdmission,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateModeOfAdmissionMaster(response));
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
    yield globalErrorHandler(error, actions, "error");
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}

function* deleteModeOfAdmissionMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteModeOfAdmission, id);
    yield put(actions.setDeleteModeOfAdmissionMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllModeOfAdmission, collegeID);
    yield put(actions.setLoadGetAllModeOfAdmissionMaster(responseList.result));
    yield put(loaderActions.setStatus("idle"));
    yield put(
      snackbarActions.setSnackbarStatus({
        message: response.resMsg,
        severity: "success",
        open: true,
      })
    );
  } catch (error: any) {
    yield globalErrorHandler(error, actions, "error");
    yield put(
      snackbarActions.setSnackbarStatus({
        message: "Something went wrong!!!",
        severity: "error",
        open: true,
      })
    );
  }
}

function* getOptionModeOfAdmissionMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsModeOfAdmission, collegeID);
    yield put(actions.setLoadGetOptionModeOfAdmissionMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, actions, "error");
  }
}

export default function* modeOfAdmissionMasterSaga() {
  yield takeEvery(actions.load, getAllModeOfAdmissionMasterSaga);
  yield takeEvery(
    actions.loadGetByIdModeOfAdmissionMaster,
    getbyIdModeOfAdmissionMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateModeOfAdmissionMaster,
    saveModeOfAdmissionMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteModeOfAdmissionMaster,
    deleteModeOfAdmissionMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionModeOfAdmissionMasterSaga);
}
