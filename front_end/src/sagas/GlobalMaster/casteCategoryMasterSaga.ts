import {
  getAllCasteCategory,
  addCasteCategory,
  deleteCasteCategory,
  getByIdCasteCategory,
  getOptionsCasteCategory,
  updateCasteCategory,
} from "../../services/GlobalMaster/casteCategoryMasterService";
import { actions } from "../../store/GlobalMaster/casteCategoryMaster";
import { globalErrorHandler } from "..";
import { call, put, takeEvery } from "redux-saga/effects";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";

import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllCasteCategoryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllCasteCategory);
    yield put(actions.setLoadGetAllCasteCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdCasteCategoryMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdCasteCategory, action.payload);
    yield put(actions.setGetByIdCasteCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveCasteCategoryMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addCasteCategory : updateCasteCategory,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateCasteCategoryMaster(response));
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

function* deleteCasteCategoryMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteCasteCategory, id);
    yield put(actions.setDeleteCasteCategoryMaster(response));
    const responseList: any = yield call(getAllCasteCategory);
    yield put(actions.setLoadGetAllCasteCategoryMaster(responseList.result));
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

function* getOptionCasteCategoryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsCasteCategory);
    yield put(actions.setLoadGetOptionCasteCategoryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* CasteCategoryMasterSaga() {
  yield takeEvery(actions.load, getAllCasteCategoryMasterSaga);
  yield takeEvery(
    actions.loadGetByIdCasteCategoryMaster,
    getbyIdCasteCategoryMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateCasteCategoryMaster,
    saveCasteCategoryMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteCasteCategoryMaster,
    deleteCasteCategoryMasterSaga
  );
  yield takeEvery(
    actions.loadOptionCasteCategory,
    getOptionCasteCategoryMasterSaga
  );
}
