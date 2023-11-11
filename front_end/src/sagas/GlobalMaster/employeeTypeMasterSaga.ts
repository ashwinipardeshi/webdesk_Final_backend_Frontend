import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllEmployeeType,
  getByIdEmployeeType,
  addEmployeeType,
  updateEmployeeType,
  deleteEmployeeType,
  getOptionsEmployeeType,
} from "../../services/GlobalMaster/employeeTypeMasterService";
import { actions } from "../../store/GlobalMaster/employeeTypeMaster";
import { globalErrorHandler } from "..";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllEmployeeTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getAllEmployeeType);
    yield put(actions.setLoadGetAllEmployeeTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdEmployeeTypeMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdEmployeeType, action.payload);
    yield put(actions.setGetByIdEmployeeTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveEmployeeTypeMasterSaga(action: any): Generator {
  try {
    const { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(
      type === "ADD" ? addEmployeeType : updateEmployeeType,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateEmployeeTypeMaster(response));
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

function* deleteEmployeeTypeMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteEmployeeType, id);
    yield put(actions.setDeleteEmployeeTypeMaster(response));
    const responseList: any = yield call(getAllEmployeeType);
    yield put(actions.setLoadGetAllEmployeeTypeMaster(responseList.result));
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
function* getOptionEmployeeTypeMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getOptionsEmployeeType);
    yield put(actions.setLoadGetOptionEmployeeTypeMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
// single entry point to start all Sagas at once
export default function* employeeTypeMasterSaga() {
  yield takeEvery(actions.load, getAllEmployeeTypeMasterSaga);
  yield takeEvery(
    actions.loadGetByIdEmployeeTypeMaster,
    getbyIdEmployeeTypeMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateEmployeeTypeMaster,
    saveEmployeeTypeMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteEmployeeTypeMaster,
    deleteEmployeeTypeMasterSaga
  );
  yield takeEvery(actions.loadOptionEmployee, getOptionEmployeeTypeMasterSaga);
}
