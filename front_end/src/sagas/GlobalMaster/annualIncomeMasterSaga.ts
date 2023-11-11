import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllAnnualIncome,
  getByIdAnnualIncome,
  addAnnualIncome,
  updateAnnualIncome,
  deleteAnnualIncome,
  getOptionsAnnualIncome,
} from "../../services/GlobalMaster/annualIncomeMasterService";
import { actions } from "../../store/GlobalMaster/annualIncomeMaster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllAnnualIncomeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllAnnualIncome);
    yield put(actions.setLoadGetAllAnnualIncomeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdAnnualIncomeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdAnnualIncome, action.payload);
    yield put(actions.setGetByIdAnnualIncomeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveAnnualIncomeMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addAnnualIncome : updateAnnualIncome,
      request
    );

    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateAnnualIncomeMaster(response));
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

function* deleteAnnualIncomeMasterSaga(action: any): Generator {
  const { id } = action.payload;

  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteAnnualIncome, id);
    yield put(actions.setDeleteAnnualIncomeMaster(response));
    const responseList: any = yield call(getAllAnnualIncome);
    yield put(actions.setLoadGetAllAnnualIncomeMaster(responseList.result));
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

function* getOptionsAnnualIncomeMasterSaga(): Generator {
  try {
    yield put(actions.setStatus("loading"));
    const response: any = yield call(getOptionsAnnualIncome);
    yield put(actions.setLoadGetOptionAnnualIncomeMaster(response.result));
    yield put(actions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* annualIncomeMasterSaga() {
  yield takeEvery(actions.load, getAllAnnualIncomeMasterSaga);
  yield takeEvery(
    actions.loadGetByIdAnnualIncomeMaster,
    getbyIdAnnualIncomeMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateAnnualIncomeMaster,
    saveAnnualIncomeMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteAnnualIncomeMaster,
    deleteAnnualIncomeMasterSaga
  );
  yield takeEvery(actions.loadOptionsAnnualIncome, getOptionsAnnualIncomeMasterSaga);
}
