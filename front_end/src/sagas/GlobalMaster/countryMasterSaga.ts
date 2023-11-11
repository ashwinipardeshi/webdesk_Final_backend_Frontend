import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllCountry,
  getByIdCountry,
  addCountry,
  updateCountry,
  deleteCountry,
  getOptionsCountry,
} from "../../services/GlobalMaster/countryMasterService";
import { actions } from "../../store/GlobalMaster/countryMaster";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";

function* getAllCountryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllCountry);
    yield put(actions.setLoadGetAllCountryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdCountryMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdCountry, action.payload);
    yield put(actions.setGetByIdCountryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveCountryMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addCountry : updateCountry,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateCountryMaster(response));
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

function* deleteCountryMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteCountry, id);
    yield put(actions.setDeleteCountryMaster(response));
    const responseList: any = yield call(getAllCountry);
    yield put(actions.setLoadGetAllCountryMaster(responseList.result));
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

function* getOptionCountryMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsCountry);
    yield put(actions.setLoadGetOptionCountryMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* countryMasterSaga() {
  yield takeEvery(actions.load, getAllCountryMasterSaga);
  yield takeEvery(actions.loadGetByIdCountryMaster, getbyIdCountryMasterSaga);
  yield takeEvery(actions.loadSaveUpdateCountryMaster, saveCountryMasterSaga);
  yield takeEvery(actions.loadDeleteCountryMaster, deleteCountryMasterSaga);
  yield takeEvery(actions.loadOptionCountry, getOptionCountryMasterSaga);
}
