import { http } from "../../../utils/httpService";
import { ADMISSION_BASE_URL } from "../../../constant/baseURL";

export const getAllOfflineStudentDataService = async (id: number) => {
  const response = await http.get({
    url:ADMISSION_BASE_URL + `OfflineAdmission/Get/${id}`
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
