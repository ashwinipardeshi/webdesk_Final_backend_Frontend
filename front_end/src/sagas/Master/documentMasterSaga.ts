import { call, put, select, takeEvery } from "redux-saga/effects";
import { actions } from "../../store/Master/documentMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import {
  getAllDocument,
  addDocument,
  deleteDocument,
  getByIdDocument,
  getOptionsDocument,
  updateDocument,
} from "../../services/Master/documentMasterService";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllDocumentMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllDocument, collegeID);
    yield put(actions.setLoadGetAllDocumentMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdDocumentMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdDocument, action.payload);
    yield put(actions.setGetByIdDocumentMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveDocumentMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addDocument : updateDocument,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateDocumentMaster(response));
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

function* deleteDocumentMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteDocument, id);
    yield put(actions.setDeleteDocumentMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllDocument, collegeID);
    yield put(actions.setLoadGetAllDocumentMaster(responseList.result));
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

function* getOptionDocumentMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsDocument, collegeID);
    yield put(actions.setLoadGetOptionDocumentMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield put(loaderActions.setStatus("idle"));
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* DocumentMasterSaga() {
  yield takeEvery(actions.load, getAllDocumentMasterSaga);
  yield takeEvery(actions.loadGetByIdDocumentMaster, getbyIdDocumentMasterSaga);
  yield takeEvery(actions.loadSaveUpdateDocumentMaster, saveDocumentMasterSaga);
  yield takeEvery(actions.loadDeleteDocumentMaster, deleteDocumentMasterSaga);
  yield takeEvery(actions.loadOptions, getOptionDocumentMasterSaga);
}
