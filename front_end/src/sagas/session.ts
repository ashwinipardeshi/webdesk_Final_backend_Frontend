// /* eslint-disable import/no-cycle */
import jwtDecode from "jwt-decode";
// import { call, delay, put, takeEvery } from "redux-saga/effects";
// import {
//   login,
//   sendResetPasswordEmail,
//   setPassword,
//   registerUser,
//   validateAuthCode,
//   logout,
// } from "../services/session";
// import { actions } from "../store/session";
// import { WEBDESK } from "../utils/utils";
// import { globalErrorHandler } from ".";

// function* loginSaga(action: any): Generator {
//   try {
//     yield put(actions.setStatus("loading"));
//     yield put(
//       actions.setResetPassword({
//         status: false,
//         mail: "",
//       })
//     );
//     const response: any = yield call(validateAuthCode, action.payload);
//     if (!response?.token) {
//       throw response;
//     }
//     yield put(
//       actions.setUserInfo({
//         ...response,
//         ...jwtDecode(response.token),
//       })
//     );
//     WEBDESK.setSessionCookie("loginToken", response.token);
//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         ...response,
//         ...jwtDecode(response.token),
//       })
//     );
//     yield put(actions.setStatus("idle"));
//   } catch (error: any) {
//     yield put(actions.setStatus("error"));
//     if (error.code === 401) {
//       yield put(
//         actions.setOtpDetails({
//           email: "",
//           showOtpScreen: false,
//         })
//       );
//     }
//     yield put(actions.setError(error.message));
//   }
// }

// function* getOtpSaga(action: any): Generator {
//   try {
//     yield put(actions.setStatus("loading"));
//     yield put(
//       actions.setResetPassword({
//         status: false,
//         mail: "",
//       })
//     );
//     yield call(login, action.payload);
//     yield put(
//       actions.setOtpDetails({
//         email: action.payload.email,
//         showOtpScreen: true,
//       })
//     );
//     yield put(actions.setStatus("idle"));
//   } catch (error: any) {
//     yield put(actions.setStatus("error"));
//     yield put(
//       actions.setError(
//         "Sorry! We can’t find that username and/or password. You can reset your password or try again."
//       )
//     );
//     yield put(
//       actions.setOtpDetails({
//         email: "",
//         showOtpScreen: false,
//       })
//     );
//   }
// }

// function* logoutSaga(): Generator {
//   try {
//     yield put(actions.setStatus("loading"));
//     yield delay(100);
//     yield call(logout);
//     yield put(actions.setStatus("idle"));
//   } catch (error: any) {
//     yield globalErrorHandler(error, actions, "error");
//   }
// }

// function* initiatePasswordResetSaga(action: any): Generator {
//   try {
//     yield put(actions.setStatus("loading"));
//     yield put(
//       actions.setResetPassword({
//         status: true,
//         mail: action.payload,
//       })
//     );
//     yield call(sendResetPasswordEmail, action.payload);
//     yield put(actions.setStatus("idle"));
//   } catch (error: any) {
//     yield put(
//       actions.setResetPassword({
//         status: true,
//         mail: action.payload,
//       })
//     );
//   }
// }

// function* setPasswordSaga(action: any): Generator {
//   try {
//     yield put(actions.setStatus("loading"));
//     yield delay(2000);

//     yield call(setPassword, action.payload);

//     // todo redirect to login
//     yield put(actions.setStatus("idle"));
//   } catch (error: any) {
//     yield globalErrorHandler(error, actions, "error");
//   }
// }

// function* registerUserSaga(action: any): Generator {
//   try {
//     yield put(actions.setStatus("loading"));
//     yield delay(2000);

//     yield call(registerUser, action.payload);

//     // todo redirect to login
//     yield put(actions.setStatus("idle"));
//   } catch (error: any) {
//     // eventually better error handling
//     yield globalErrorHandler(error, actions, "error");
//   }
// }

// // single entry point to start all Sagas at once
// export default function* sessionSaga() {
//   yield takeEvery(actions.login, loginSaga);
//   yield takeEvery(actions.initiatePasswordReset, initiatePasswordResetSaga);
//   yield takeEvery(actions.setPassword, setPasswordSaga);
//   yield takeEvery(actions.register, registerUserSaga);
//   yield takeEvery(actions.clearSession, logoutSaga);
//   yield takeEvery(actions.validateCredentials, getOtpSaga);
// }
