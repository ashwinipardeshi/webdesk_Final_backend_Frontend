import { http } from "../../../utils/httpService";
import { ADMISSION_BASE_URL } from "../../../constant/baseURL";

export const insertOfflineMainForm = async (data: any) => {
  const response = await http.post({
    url: ADMISSION_BASE_URL + `OfflineAdmission/Insert`,
    body: JSON.stringify(data),
  });
  if (response.data) {
    return Promise.reject(response);
  }
  return response;
};
