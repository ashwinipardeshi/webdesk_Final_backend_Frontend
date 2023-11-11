import { http, logoutChannel } from "../../utils/httpService";
import { WEBDESK, STORAGE_KEY } from "../../utils/utils";
import { AUTHENTICATION_BASE_URL } from "../../constant/baseURL";
export const login = async (data: any) => {
  const response = await http.post({
    url: AUTHENTICATION_BASE_URL + `User/Login`,
    body: JSON.stringify(data),
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
export const registerUser = async (data: any) => {
  const response = await http.post({
    url: AUTHENTICATION_BASE_URL + `OnlineUser/SignUP`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const forgetPassword = async (email: string) => {
  const response = await http.get({
    url: AUTHENTICATION_BASE_URL + `User/ForgotPassword/${email}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const changeforgetpassword = async (data: any) => {
  const response = await http.put({
    url: AUTHENTICATION_BASE_URL + `User/ChangeForgotPassword`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

