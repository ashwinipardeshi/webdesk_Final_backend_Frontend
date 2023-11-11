import { call, put, select, takeEvery } from "redux-saga/effects";
import { 
    getAllSMSTemplate,
    getByIdSMSTemplate,
    getOptionsSMSTemplate,
    addSMSTemplate,
    updateSMSTemplate,
    deleteSMSTemplate,
} from "../../services/Master/smsTemplateMasterService";
import { actions } from "../../store/Master/smsTemplateMaster";
import { actions as notifierActions } from "../../store/notifications";
import { globalErrorHandler } from "..";
import { actions as loaderActions } from "../../store/loader";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { ADD, UPDATE } from "../../constant/statusCodes";
import { getCollegeId } from "../../store/Authentication/authentication";

function* getAllSMSTemplateMasterSaga(): Generator {
    try {
      yield put(loaderActions.setStatus("loading"));
      const collegeID: any = yield select(getCollegeId);
      const response: any = yield call(getAllSMSTemplate, collegeID);
      yield put(actions.setLoadGetAllSMSTemplateMaster(response.result));
      yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
      yield globalErrorHandler(error, loaderActions, "error");
    }
  }
  
  function* getbyIdSMSTemplateMasterSaga(action: any): Generator {
    try {
      yield put(loaderActions.setStatus("loading"));
      const response: any = yield call(getByIdSMSTemplate, action.payload);
      yield put(actions.setGetByIdSMSTemplateMaster(response.result));
      yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
      yield globalErrorHandler(error, loaderActions, "error");
    }
  }
  function* saveSMSTemplateMasterSaga(action: any): Generator {
    try {
      let { type, request } = action.payload;
      yield put(loaderActions.setStatus("loading"));
      const collegeID: any = yield select(getCollegeId);
      request = {
        ...request,
        collegeId: collegeID,
      };
      const response: any = yield call(
        type === "ADD" ? addSMSTemplate : updateSMSTemplate,
        request
      );
      if (response.statusCode === ADD || response.statusCode === UPDATE) {
        yield put(actions.setSaveUpdateSMSTemplateMaster(response));
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
  
  function* deleteSMSTemplateMasterSaga(action: any): Generator {
    const { id } = action.payload;
    try {
      yield put(loaderActions.setStatus("loading"));
      const response: any = yield call(deleteSMSTemplate, id);
      yield put(actions.setDeleteSMSTemplateMaster(response));
      const collegeID: any = yield select(getCollegeId);
      const responseList: any = yield call(getAllSMSTemplate, collegeID);
      yield put(actions.setLoadGetAllSMSTemplateMaster(responseList.result));
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
  
  function* getOptionSMSTemplateMasterSaga(): Generator {
    try {
      yield put(loaderActions.setStatus("loading"));
      const collegeID: any = yield select(getCollegeId);
      const response: any = yield call(getOptionsSMSTemplate, collegeID);
      yield put(actions.setLoadGetOptionSMSTemplateMaster(response.result));
      yield put(loaderActions.setStatus("idle"));
    } catch (error: any) {
      yield globalErrorHandler(error, loaderActions, "error");
    }
  }
  
  export default function* smsTemplateMasterSaga() {
    yield takeEvery(actions.load, getAllSMSTemplateMasterSaga);
    yield takeEvery(
      actions.loadGetByIdSMSTemplateMaster,
      getbyIdSMSTemplateMasterSaga
    );
    yield takeEvery(
      actions.loadSaveUpdateSMSTemplateMaster,
      saveSMSTemplateMasterSaga
    );
    yield takeEvery(
      actions.loadDeleteSMSTemplateMaster,
      deleteSMSTemplateMasterSaga
    );
    yield takeEvery(actions.loadOptions, getOptionSMSTemplateMasterSaga);
  }
  