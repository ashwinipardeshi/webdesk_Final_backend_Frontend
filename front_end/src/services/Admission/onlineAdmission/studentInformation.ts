import { http } from "../../../utils/httpService";
import { ADMISSION_BASE_URL } from "../../../constant/baseURL";

export const saveOnlineAdmission = async (data: any) => {
  const response = await http.post({
    url: ADMISSION_BASE_URL + `OnlineAdmission/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateOnlineAdmission = async (data: any) => {
  const response = await http.put({
    url: ADMISSION_BASE_URL + `OnlineAdmission/UpsertonlineAdmissionStudent`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};


export const getOnlineStudentInfo = async (onlineStudentId:number) => {
  const response = await http.get({
    url: ADMISSION_BASE_URL + `OnlineAdmission/Get/${onlineStudentId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response; 
}