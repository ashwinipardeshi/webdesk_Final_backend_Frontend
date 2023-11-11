import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllSemester,
  getByIdSemester,
  addSemester,
  updateSemester,
  deleteSemester,
  getOptionsSemester,
} from "../../services/GlobalMaster/semesterMasterService";
import { actions } from "../../store/GlobalMaster/semesterMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllSemesterMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllSemester);
    yield put(actions.setLoadGetAllSemesterMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdSemesterMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdSemester, action.payload);
    yield put(actions.setGetByIdSemesterMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveSemesterMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addSemester : updateSemester,
      request
    );

    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateSemesterMaster(response));
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

function* deleteSemesterMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteSemester, id);
    yield put(actions.setDeleteSemesterMaster(response));
    const responseList: any = yield call(getAllSemester);
    yield put(actions.setLoadGetAllSemesterMaster(responseList.result));
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

function* getOptionSemesterMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsSemester);
    yield put(actions.setLoadGetOptionSemesterMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* semesterMasterSaga() {
  yield takeEvery(actions.load, getAllSemesterMasterSaga);
  yield takeEvery(actions.loadGetByIdSemesterMaster, getbyIdSemesterMasterSaga);
  yield takeEvery(actions.loadSaveUpdateSemesterMaster, saveSemesterMasterSaga);
  yield takeEvery(actions.loadDeleteSemesterMaster, deleteSemesterMasterSaga);
  yield takeEvery(actions.loadOptionSemester, getOptionSemesterMasterSaga);
}
