import React from "react";

// const session = () => {
//   return <div>session</div>;
// };

// export default session;

// /* eslint-disable no-unused-vars */
// /* eslint-disable import/no-cycle */
// /* eslint-disable no-param-reassign */
// import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
// import { RootState } from ".";

interface SessionState {
  user: any; // tbd
  status: "idle" | "loading" | "error" | "tokenExpired";
  resetDetails: { status: boolean; mail: string };
  errorMessage: string;
  otpDetails: {
    email: string;
    showOtpScreen: boolean;
  };
}

// const initialState: SessionState = {
//   user: localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user") || "{}")
//     : null,
//   status: "idle",
//   resetDetails: { status: false, mail: "" },
//   otpDetails: { email: "", showOtpScreen: false },
//   errorMessage: "",
// };

// export const slice = createSlice({
//   name: "session",
//   initialState,
//   reducers: {
//     validateCredentials: (
//       _state,
//       _action: PayloadAction<{ email: string; password: string }>
//     ) => {
//       // do nothing.
//     },
//     setOtpDetails: (state, action: PayloadAction<any>) => {
//       state.otpDetails = action.payload;
//     },
//     setError: (state, action: PayloadAction<any>) => {
//       state.errorMessage = action.payload;
//     },
//     login: (
//       _state,
//       _action: PayloadAction<{
//         email: string;
//         otp: string;
//       }>
//     ) => {
//       // do nothing.
//     },
//     setUserInfo: (state, action: PayloadAction<any>) => {
//       state.user = { ...state.user, ...action.payload };
//     },
//     updateUserInfo: (state, action: PayloadAction<any>) => {
//       state.user = { ...state.user, ...action.payload };
//     },
//     clearSession: (state) => {
//       state.user = null;
//     },
//     initiatePasswordReset: (_state, _action: PayloadAction<string>) => {
//       // do nothing.
//     },
//     setPassword: (_state, _action: PayloadAction<string>) => {
//       // do nothing.
//     },
//     register: (
//       _state,
//       _action: PayloadAction<{
//         firstName: string;
//         lastName: string;
//         password: string;
//       }>
//     ) => {
//       // do nothing.
//     },
//     setStatus: (
//       state,
//       action: PayloadAction<"idle" | "loading" | "error" | "tokenExpired">
//     ) => {
//       state.status = action.payload;
//     },
//     setResetPassword: (state, _action: PayloadAction<any>) => {
//       const { status, mail } = _action.payload;
//       state.resetDetails = { status, mail };
//     },
//   },
// });

// export const { reducer, actions } = slice;

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectSession = (state: RootState) => state.session;
// export const selectUser = createSelector(selectSession, (state) => state.user);
// export const selectStatus = createSelector(
//   selectSession,
//   (state) => state.status
// );
// export const getToken = createSelector(selectUser, (user) => user?.token);
// export const getRole = createSelector(selectUser, (user) => user?.role);
// export const selectUserIsLoggedIn = createSelector(
//   selectUser,
//   (user) => user?.token.length > 0
// );
// export const userIsNew = createSelector(selectUser, (user) => user?.newUser);
// export const userIsResettingPassword = createSelector(
//   selectUser,
//   (user) => user?.resetPassword
// );

// export const getResetStatus = createSelector(
//   selectSession,
//   (state) => state.resetDetails
// );

// export const getOtpDetails = createSelector(
//   selectSession,
//   (state) => state.otpDetails
// );
// export const getError = createSelector(
//   selectSession,
//   (state) => state.errorMessage
// );
