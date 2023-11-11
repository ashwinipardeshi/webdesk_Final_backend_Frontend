import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllDepartment,
  getByIdDepartment,
  getOptionsDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../services/Master/departmentMasterService";
import { actions } from "../../store/Master/departmentMaster";
import { actions as notifierActions } from "../../store/notifications";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { getCollegeId } from "../../store/Authentication/authentication";

function* getAllDepartmentMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllDepartment, collegeID);
    yield put(actions.setLoadGetAllDepartmentMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdDepartmentMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdDepartment, action.payload);
    yield put(actions.setGetByIdDepartmentMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveDepartmentMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: collegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addDepartment : updateDepartment,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateDepartmentMaster(response));
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

function* deleteDepartmentMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteDepartment, id);
    yield put(actions.setDeleteDepartmentMaster(response));
    const collegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllDepartment, collegeID);
    yield put(actions.setLoadGetAllDepartmentMaster(responseList.result));
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

function* getOptionDepartmentMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const collegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsDepartment, collegeID);
    yield put(actions.setLoadGetOptionDepartmentMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

export default function* departmentMasterSaga() {
  yield takeEvery(actions.load, getAllDepartmentMasterSaga);
  yield takeEvery(
    actions.loadGetByIdDepartmentMaster,
    getbyIdDepartmentMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateDepartmentMaster,
    saveDepartmentMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteDepartmentMaster,
    deleteDepartmentMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionDepartmentMasterSaga);
}
