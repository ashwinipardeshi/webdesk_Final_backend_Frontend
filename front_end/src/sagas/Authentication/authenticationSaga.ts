/* eslint-disable import/no-cycle */
import jwtDecode from "jwt-decode";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import {
  changeforgetpassword,
  forgetPassword,
  login,
  logout,
  registerUser,
} from "../../services/Authentication/authenticationService";
import { actions } from "../../store/Authentication/authentication";
import { actions as loaderAction } from "../../store/loader";
import { WEBDESK } from "../../utils/utils";
import { globalErrorHandler } from "..";
import { ADD, INVALID_USER, SUCCESS, UPDATE } from "../../constant/statusCodes";
import { actions as snackbarActions } from "../../store/snackbarToster";
import { actions as loaderActions } from "../../store/loader";
import { actions as offlineActions } from "../../store/Admission/offlineAdmission/offlineAdmission";
import { actions as onlineActions } from "../../store/Admission/onlineAdmission/onlineAdmission";

function* loginSaga(action: any): Generator {
  try {
    yield put(loaderAction.setStatus("loading"));
    yield put(
      actions.setResetPassword({
        status: false,
        mail: "",
      })
    );
    const response: any = yield call(login, action.payload);
    if (!response.result?.token) {
      throw response;
    }
    yield put(
      actions.setUserInfo({
        ...(response.result ? response.result : {}),
        ...jwtDecode(response.result.token),
      })
    );
    yield put(actions.setError(""));
    WEBDESK.setSessionCookie("loginToken", response.result.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...response.result,
        ...jwtDecode(response.result.token),
      })
    );
    yield put(loaderAction.setStatus("idle"));
  } catch (error: any) {
    console.log("error", error);
    yield put(actions.setLoginStatus(false));
    yield put(loaderAction.setStatus("error"));
    if (error.statusCode === INVALID_USER) {
      yield put(actions.setError("Invalid Username or Password!"));
    } else if (error.message) {
      yield put(actions.setError(error.message));
    }
    yield put(loaderAction.setStatus("idle"));
  }
}

function* logoutSaga(): Generator {
  try {
    yield put(loaderAction.setStatus("loading"));
    yield delay(1000);
    yield put(offlineActions.setSaveUpdateAllOfflineStudentData(null));
    yield put(onlineActions.setSaveOnlineStudentData(null));
    yield call(logout);
    yield put(loaderAction.setStatus("idle"));
    yield put(actions.setError(""));
  } catch (error: any) {
    yield globalErrorHandler(error, loaderAction, "error");
  }
}

function* registerUserSaga(action: any): Generator {
  try {
    yield put(loaderAction.setStatus("loading"));
    let response: any = yield call(registerUser, action.payload);
    if (response.statusCode === ADD) {
      yield put(actions.setsuccess(response.resMsg));
      yield put(actions.setError(""));
      yield put(loaderAction.setStatus("idle"));
    } else if (response.statusCode === INVALID_USER || !response.isSuccess) {
      yield put(loaderAction.setStatus("idle"));
      yield put(actions.setError("Something went wrong!"));
      yield put(actions.setsuccess(""));
    }
    // todo redirect to login
  } catch (error: any) {
    yield put(loaderAction.setStatus("error"));
    if (error.message) {
      yield put(actions.setError(error.message));
    } else {
      yield put(actions.setError("Something went wrong!"));
    }
    yield put(actions.setsuccess(""));
    yield put(loaderAction.setStatus("idle"));
    yield globalErrorHandler(error, loaderAction, "error");
  }
}

function* getForgetPasswordSaga(action: any): Generator {
  try {
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(forgetPassword, action.payload);
    if (response.statusCode === SUCCESS) {
      yield put(actions.setsuccess(response.resMsg));
      yield put(loaderActions.setStatus("idle"));
    }
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(loaderActions.setStatus("idle"));
  }
}

function* changeForgetPasswordSaga(action: any): Generator {
  try {
    const { request } = action.payload;
    yield put(loaderActions.setStatus("loading"));
    const response: any = yield call(changeforgetpassword,
      request
    );
    if (response.statusCode === UPDATE) {
      // yield put(actions.setChangeForgetPassword(response));
      yield put(actions.setsuccess(response.resMsg));
      yield put(loaderActions.setStatus("idle"));
    } else {
      yield put(loaderAction.setStatus("idle"));
      yield put(actions.setError("Something went wrong!"));
      yield put(actions.setsuccess(""));
    }
  } catch (error: any) {
    yield globalErrorHandler(error, loaderActions, "error");
    yield put(loaderActions.setStatus("idle"));
  }
}

// single entry point to start all Sagas at once
export default function* authenticationSaga() {
  yield takeEvery(actions.login, loginSaga);
  yield takeEvery(actions.clearSession, logoutSaga);
  yield takeEvery(actions.register, registerUserSaga);
  yield takeEvery(actions.loadGetByforgetPassword, getForgetPasswordSaga);
  yield takeEvery(actions.loadChangeForgetPassword, changeForgetPasswordSaga);
}
