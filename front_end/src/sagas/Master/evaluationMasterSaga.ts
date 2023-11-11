import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAllEvaluation,
  getByIdEvaluation,
  getOptionsEvaluation,
  addEvaluation,
  updateEvaluation,
  deleteEvaluation,
} from "../../services/Master/evaluationMasterService";
import { actions } from "../../store/Master/evaluationMaster";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";
import { actions as snackbarActions } from "../../store/snackbarToster";

function* getAllEvaluationMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    const response: any = yield call(getAllEvaluation, CollegeID);
    yield put(actions.setLoadGetAllEvaluationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

function* getbyIdEvaluationMasterSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(getByIdEvaluation, action.payload);
    yield put(actions.setGetByIdEvaluationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}
function* saveEvaluationMasterSaga(action: any): Generator {
  try {
    let { type, request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    request = {
      ...request,
      collegeId: CollegeID,
    };
    const response: any = yield call(
      type === "ADD" ? addEvaluation : updateEvaluation,
      request
    );
    if (response.statusCode === ADD || response.statusCode === UPDATE) {
      yield put(actions.setSaveUpdateEvaluationMaster(response));
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

function* deleteEvaluationMasterSaga(action: any): Generator {
  const { id } = action.payload;
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(deleteEvaluation, id);
    yield put(actions.setDeleteEvaluationMaster(response));
    const CollegeID: any = yield select(getCollegeId);
    const responseList: any = yield call(getAllEvaluation, CollegeID);
    yield put(actions.setLoadGetAllEvaluationMaster(responseList.result));
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

function* getOptionEvaluationMasterSaga(): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const CollegeID: any = yield select(getCollegeId);
    const response: any = yield call(getOptionsEvaluation, CollegeID);
    yield put(actions.setLoadGetOptionEvaluationMaster(response.result));
    yield put(loaderActions.setStatus("idle"));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
  }
}

// single entry point to start all Sagas at once
export default function* evaluationMasterSaga() {
  yield takeEvery(actions.load, getAllEvaluationMasterSaga);
  yield takeEvery(
    actions.loadGetByIdEvaluationMaster,
    getbyIdEvaluationMasterSaga
  );
  yield takeEvery(
    actions.loadSaveUpdateEvaluationMaster,
    saveEvaluationMasterSaga
  );
  yield takeEvery(
    actions.loadDeleteEvaluationMaster,
    deleteEvaluationMasterSaga
  );
  yield takeEvery(actions.loadOptions, getOptionEvaluationMasterSaga);
}
