import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllDistrict,
  getByIdDistrict,
  addDistrict,
  updateDistrict,
  deleteDistrict,
  getOptionsDistrict,
} from "../../services/GlobalMaster/districtMasterService";
import { actions } from "../../store/GlobalMaster/districtMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllDistrictMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllDistrict);
    yield put(actions.setLoadGetAllDistrictMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdDistrictMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdDistrict, action.payload);
    yield put(actions.setGetByIdDistrictMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveDistrictMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addDistrict : updateDistrict,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateDistrictMaster(response));
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

function* deleteDistrictMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteDistrict, id);
    yield put(actions.setDeleteDistrictMaster(response));
    const responseList: any = yield call(getAllDistrict);
    yield put(actions.setLoadGetAllDistrictMaster(responseList.result));
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

function* getOptionsDistrictMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsDistrict);
    yield put(actions.setLoadGetOptionDistrictMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* districtMasterSaga() {
  yield takeEvery(actions.load, getAllDistrictMasterSaga);
  yield takeEvery(actions.loadGetByIdDistrictMaster, getbyIdDistrictMasterSaga);
  yield takeEvery(actions.loadSaveUpdateDistrictMaster, saveDistrictMasterSaga);
  yield takeEvery(actions.loadDeleteDistrictMaster, deleteDistrictMasterSaga);
  yield takeEvery(actions.loadOptionDistrict, getOptionsDistrictMasterSaga);
}
