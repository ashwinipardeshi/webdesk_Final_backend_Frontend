import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllFeeHeadType,
  getByIdFeeHeadType,
  addFeeHeadType,
  updateFeeHeadType,
  deleteFeeHeadType,
  getOptionsFeeHeadType,
} from "../../services/Master/feeheadTypeServices";
import { actions } from "../../store/Master/feeheadTypeMaster";
import { actions as loaderActions } from "../../store/loader";
import { globalErrorHandler } from "..";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { ADD, UPDATE } from "../../constant/statusCodes";

function* getAllFeeHeadTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collageID: any = yield select(getCollegeId);
    const response: any = yield call(getAllFeeHeadType, collageID);
    yield put(actions.setLoadGetAllFeeHeadTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdFeeHeadTypeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdFeeHeadType, action.payload);
    yield put(actions.setGetByIdFeeHeadTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveFeeHeadTypeMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collageID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collageID,
    };
    const response: any = yield call(
      type === "ADD" ? addFeeHeadType : updateFeeHeadType,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateFeeHeadTypeMaster(response));
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

function* deleteFeeHeadTypeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteFeeHeadType, id);
    yield put(actions.setDeleteFeeHeadTypeMaster(response));
    const collageID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllFeeHeadType, collageID);
    yield put(actions.setLoadGetAllFeeHeadTypeMaster(responseList.result));
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

function* getOptionFeeHeadTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collageID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsFeeHeadType, collageID);
    yield put(actions.setLoadGetOptionFeeHeadTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* feeheadTypeMasterSaga() {
  yield takeEvery(actions.load, getAllFeeHeadTypeMasterSaga);
  yield takeEvery(
    actions.loadGetByIdFeeHeadTypeMaster,
    getbyIdFeeHeadTypeMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateFeeHeadTypeMaster,
    saveFeeHeadTypeMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteFeeHeadTypeMaster,
    deleteFeeHeadTypeMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionFeeHeadTypeMasterSaga);
}
