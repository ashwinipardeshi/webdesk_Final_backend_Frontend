import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllRelation,
  getByIdRelation,
  addRelation,
  updateRelation,
  deleteRelation,
  getOptionsRelation,
} from "../../services/GlobalMaster/relationMasterService";
import { actions } from "../../store/GlobalMaster/relationMaster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllRelationMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllRelation);
    yield put(actions.setLoadGetAllRelationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdRelationMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdRelation, action.payload);
    yield put(actions.setGetByIdRelationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveRelationMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addRelation : updateRelation,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateRelationMaster(response));
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

function* deleteRelationMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteRelation, id);
    yield put(actions.setDeleteRelationMaster(response));
    const responseList: any = yield call(getAllRelation);
    yield put(actions.setLoadGetAllRelationMaster(responseList.result));
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

function* getOptionRelationMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsRelation);
    yield put(actions.setLoadGetOptionRelationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* relationMasterSaga() {
  yield takeEvery(actions.load, getAllRelationMasterSaga);
  yield takeEvery(actions.loadGetByIdRelationMaster, getbyIdRelationMasterSaga);
  yield takeEvery(actions.loadSaveUpdateRelationMaster, saveRelationMasterSaga);
  yield takeEvery(actions.loadDeleteRelationMaster, deleteRelationMasterSaga);
  yield takeEvery(actions.loadOptionRelation, getOptionRelationMasterSaga);
}
