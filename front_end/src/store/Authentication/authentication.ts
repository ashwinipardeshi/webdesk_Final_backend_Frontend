/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

interface LoginState {
  user: any; // tbd
  status: "idle" | "loading" | "error" | "tokenExpired";
  resetDetails: { status: boolean; mail: string };
  errorMessage: string;
  successMessage: string;
  loginStatus: boolean;
  forgetPassword: any;
  changeForgetPassword: any;
  registerUser: any;
  collegeID: number;
  academicYearId: number;
}

const initialState: LoginState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null,
  status: "idle",
  resetDetails: { status: false, mail: "" },
  errorMessage: "",
  successMessage: "",
  loginStatus: false,
  forgetPassword: null,
  changeForgetPassword: null,
  registerUser: {},
  collegeID: 0,
  academicYearId: 0,
};

export const slice = createSlice({
  name: "authentication",
  initialState,

  reducers: {
    load: () => {
      //load  nothing
    },
    validateCredentials: (
      _state,
      _action: PayloadAction<{ emailId: string; password: string }>
    ) => {
      // do nothing.
    },
    setError: (state, action: PayloadAction<any>) => {
      state.errorMessage = action.payload;
    },
    setsuccess: (state, action: PayloadAction<any>) => {
      state.successMessage = action.payload;
    },
    login: (
      _state,
      _action: PayloadAction<{
        emailId: string;
        ipAddress: string;
        password: string;
      }>
    ) => {
      // do nothing.
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLoginStatus: (state, action: PayloadAction<any>) => {
      state.loginStatus = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
    },

    loadGetByforgetPassword: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setGetByforgetPassword: (state, action: PayloadAction<any>) => {
      state.forgetPassword = action.payload;
    },
    loadChangeForgetPassword: (state, action: PayloadAction<any>) => {
      //load  nothing
    },
    setChangeForgetPassword: (state, action: PayloadAction<any>) => {
      state.changeForgetPassword = action.payload;
    },

    clearSession: (state) => {
      state.user = null;
    },
    initiatePasswordReset: (_state, _action: PayloadAction<string>) => {
      // do nothing.
    },
    setPassword: (_state, _action: PayloadAction<string>) => {
      // do nothing.
    },
    register: (
      _state,
      _action: PayloadAction<{
        id: number;
        roleId: number;
        collegeId: number;
        departmentId: number;
        academicYearId: number;
        name: string;
        mobile: string;
        emailId: string;
        password: string;
        isActive: boolean;
        createdDate: string;
      }>
    ) => {
      // do nothing.
    },
    setStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "error" | "tokenExpired">
    ) => {
      state.status = action.payload;
    },
    setResetPassword: (state, _action: PayloadAction<any>) => {
      const { status, mail } = _action.payload;
      state.resetDetails = { status, mail };
    },
    setRegisterUserStatus: (_state, _action: PayloadAction<string>) => {
      _state.registerUser = _action.payload;
    },
  },
});

export const { reducer, actions } = slice;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthentication = (state: RootState) => state.authentication;
export const selectUser = createSelector(
  selectAuthentication,
  (state) => state.user
);
export const selectStatus = createSelector(
  selectAuthentication,
  (state) => state.status
);
export const getToken = createSelector(selectUser, (user) => user?.token);
export const getRole = createSelector(selectUser, (user) => user?.role);
export const selectUserIsLoggedIn = createSelector(
  selectUser,
  (user) => user?.token.length > 0
);
export const userIsNew = createSelector(selectUser, (user) => user?.newUser);
export const userIsResettingPassword = createSelector(
  selectUser,
  (user) => user?.resetPassword
);
export const getLoginStatus = createSelector(
  selectUser,
  (isSuccess) => isSuccess
);
export const getResetStatus = createSelector(
  selectAuthentication,
  (state) => state.resetDetails
);
export const getError = createSelector(
  selectAuthentication,
  (state) => state.errorMessage
);
export const getSuccess = createSelector(
  selectAuthentication,
  (state) => state.successMessage
);
export const getForgetpassword = createSelector(
  selectAuthentication,
  (state) => state.forgetPassword
);
export const getChangeForgetPassword = createSelector(
  selectAuthentication,
  (user) => user.changeForgetPassword
);
export const getUserRegisterStatus = createSelector(
  selectAuthentication,
  (state) => state.registerUser
);
export const getCollegeId = createSelector(
  selectAuthentication,
  (state) => state.user?.collegeId
);
export const getAcademicYearMasterId = createSelector(
  selectAuthentication,
  (state) => state.user?.academicYearId
);

export const getOnlineUserId = createSelector(
  selectAuthentication,
  (state) => state.user?.id
);

export const getRoleId = createSelector(
  selectAuthentication,
  (state) => state.user?.roleId
);

export const getUserEmailId = createSelector(
  selectAuthentication,
  (state)=>state.user?.emailId
);

export const getuserMobileNumber = createSelector(
  selectAuthentication,
  (state)=>state.user?.mobile
)