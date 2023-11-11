/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */

import axios from "axios";
import jwtDecode from "jwt-decode";
import { BroadcastChannel } from "broadcast-channel";
import Moment from "moment";
import {
  DeleteDataProps,
  GetDataProps,
  PostDataProps,
  PutDataProps,
  RequestType,
  PatchDataProps,
} from "../interfaces/HttpServiceInterface";
import { store } from "../store";
import { actions } from "../store/Authentication/authentication";
import { WEBDESK, STORAGE_KEY } from "./utils";
import { actions as loaderActions } from "../store/loader";
import { BASE_URL } from "../constant/baseURL";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// axiosInstance.interceptors.request.use(async (config) => {
//   const expTime = store?.getState()?.authentication?.user?.exp;
//   if (expTime && Moment(new Date()) > Moment(new Date(expTime * 1000))) {
//     try {
//       delete axios.defaults.headers.common.Authorization;
//       const getRefreshToken = await axios.post(`${BASE_URL}user/login`, {
//         grantType: "REFRESH_TOKEN",
//         refreshToken: store?.getState()?.authentication?.user?.refreshToken,
//       });
//       if (getRefreshToken.data) {
//         store.dispatch(
//           actions.updateUserInfo({
//             ...getRefreshToken.data,
//             ...jwtDecode(getRefreshToken.data.token),
//           })
//         );
//         WEBDESK.setSessionCookie("loginToken", getRefreshToken.data.token);
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             ...getRefreshToken.data,
//             ...jwtDecode(getRefreshToken.data.token),
//           })
//         );
//       }
//     } catch (e) {
//       store.dispatch(loaderActions.setStatus("tokenExpired"));
//       return Promise.resolve("Session Expired");
//     }
//   }

//   const accessToken = store?.getState()?.authentication?.user?.token;
//   if (accessToken && config?.headers) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });
const fetchRequest = async (props: {
  url: string;
  method: RequestType;
  body?: any;
  headers?: any;
}) => {
  const { url, method, body, headers } = props;
  const requestHeader = headers
    ? {
        ...headers,
      }
    : {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        mode: "no-cors",
        Authorization: `bearer ${WEBDESK.getCookie("loginToken")}`,
      };

  const result = await axiosInstance({
    url,
    headers: requestHeader,
    method,
    data: body || null,
  })
    .then((res) => res.data)
    .catch((error: any) => {
      console.log(requestHeader, "requestHeader");
      if (error.response?.data) {
        return { code: error.code, ...error.response.data };
      }
      if (error.code) {
        return { code: error.code, message: error.message };
      }

      return { code: true, message: "Something went wrong!" };
    });
  return result;
};

// const fetchFileRequest = async (props: {
//   url: string;
//   method: RequestType;
//   body?: any;
//   headers?: any;
//   csvFileName?: any;
// }) => {
//   const { url, method, body, headers, csvFileName } = props;
//   const requestHeader = headers
//     ? {
//         ...headers,
//       }
//     : {
//         'content-type': 'application/json',
//       };

//   const result = await axiosInstance({
//     url,
//     headers: requestHeader,
//     method,
//     data: body || null,
//     responseType: 'blob',
//   })
//     .then((res) => {
//       const defaultFileName = `export-${new Date().getTime()}.kml`;
//       let fileName = defaultFileName;
//       if (csvFileName) {
//         fileName = csvFileName;
//       } else {
//         const file_Name = store.getState()?.bakery?.info.name;
//         const kmlType =
//           url.search('/TERRITORY') > -1 ? 'Territory' : 'Delivery';
//         fileName = file_Name ? `${file_Name} - ${kmlType}.kml` : fileName;
//       }
//       const blobURL = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = blobURL;
//       link.setAttribute('download', fileName);
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode!.removeChild(link);
//       return {
//         status: res.status,
//         data: fileName,
//       };
//     })
//     .catch((error: any) => {
//       if (error.response?.data) {
//         return { code: error.code, ...error.response.data };
//       }
//       if (error.code) {
//         return { code: error.code, message: error.message };
//       }

//       return { code: true, message: 'Something went wrong!' };
//     });
//   return result;
// };

const getRequest = ({ url, headers }: GetDataProps) =>
  fetchRequest({ url, method: "GET", headers });

// const getFileRequest = ({ url, headers, csvFileName }: GetDataProps) =>
//   fetchFileRequest({ url, method: 'GET', headers, csvFileName });

const postRequest = ({ url, body, headers }: PostDataProps) =>
  fetchRequest({ url, method: "POST", body, headers });

const putRequest = ({ url, body, headers }: PutDataProps) =>
  fetchRequest({ url, method: "PUT", body, headers });

const patchRequest = ({ url, body, headers }: PatchDataProps) =>
  fetchRequest({ url, method: "PATCH", body, headers });

const deleteRequest = ({ url, body, headers }: DeleteDataProps) =>
  fetchRequest({ url, method: "DELETE", body, headers });

export const http = {
  get: getRequest,
  //getFile: getFileRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
  patch: patchRequest,
};

export const logoutChannel = new BroadcastChannel("logout");
export const logoutAllTabs = () => {
  logoutChannel.onmessage = () => {
    store.dispatch(actions.clearSession());
    sessionStorage.removeItem(STORAGE_KEY);
    //localStorage.removeItem('user');
    logoutChannel.close();
    window.location.reload();
  };
};
