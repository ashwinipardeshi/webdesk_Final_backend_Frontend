/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { http, logoutChannel } from "../utils/httpService";
import { WEBDESK, STORAGE_KEY } from "../utils/utils";

export const login = async (data: any) => {
  const response = await http.post({
    url: `/user/login`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const validateAuthCode = async (data: any) => {
  const response = await http.get({
    url: `/user/validate/auth/code?email=${data.email}&otp=${data.otp}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const logout = async () => {
  sessionStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("user");
  WEBDESK.deleteCookie("loginToken");
  if (!logoutChannel.isClosed) {
    logoutChannel.postMessage("logout");
  }
};

export const sendResetPasswordEmail = async (email: string) => {
  const response = await http.post({
    url: `/user/resetPassword/${email}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
export const setPassword = async (_password: string) => Promise.resolve();
export const registerUser = async (_email: string) => Promise.resolve();
