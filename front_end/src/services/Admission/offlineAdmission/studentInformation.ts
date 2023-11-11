import { http } from "../../../utils/httpService";
import { ADMISSION_BASE_URL } from "../../../constant/baseURL";

export const saveUpdateStudentInformation = async (data: any) => {
  const response = await http.put({
    url: ADMISSION_BASE_URL + `OfflineAdmission/UpsertofflineAdmissionStudent`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};


export const getAllOfflineStudentDataService = async (id: number) => {
  const response = await http.get({
    url:ADMISSION_BASE_URL + `OfflineAdmission/Get/${id}`
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
