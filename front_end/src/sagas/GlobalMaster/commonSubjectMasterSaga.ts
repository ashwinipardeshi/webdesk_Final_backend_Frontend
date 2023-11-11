import { call, put, takeEvery } from "redux-saga/effects";
import { ADD, UPDATE } from "../../constant/statusCodes";
import {
  getAllCommonSubject,
  getByIdCommonSubject,
  addCommonSubject,
  updateCommonSubject,
  deleteCommonSubject,
  getOptionsCommonSubject,
} from "../../services/GlobalMaster/commonSubjectMasterService";
import { actions } from "../../store/GlobalMaster/commonSubjectMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllCommonSubjectMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllCommonSubject);
    yield put(actions.setLoadGetAllCommonSubjectMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdCommonSubjectMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdCommonSubject, action.payload);
    yield put(actions.setGetByIdCommonSubjectMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveCommonSubjectMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addCommonSubject : updateCommonSubject,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateCommonSubjectMaster(response));
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

function* deleteCommonSubjectMasterSaga(action: any): Generator {
  const { id } = action.payload;

  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteCommonSubject, id);
    yield put(actions.setDeleteCommonSubjectMaster(response));
    const responseList: any = yield call(getAllCommonSubject);
    yield put(actions.setLoadGetAllCommonSubjectMaster(responseList.result));
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

function* getOptionsCommonSubjectMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsCommonSubject);
    yield put(actions.setLoadGetOptionCommonSubject(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* commonSubjectMasterSaga() {
  yield takeEvery(actions.load, getAllCommonSubjectMasterSaga);
  yield takeEvery(
    actions.loadGetByIdCommonSubjectMaster,
    getbyIdCommonSubjectMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateCommonSubjectMaster,
    saveCommonSubjectMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteCommonSubjectMaster,
    deleteCommonSubjectMasterSaga
  );
  yield takeEvery(actions.loadOptionCommon, getOptionsCommonSubjectMasterSaga);
}
