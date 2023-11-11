import { http } from "../../../utils/httpService";
import { ADMISSION_BASE_URL } from "../../../constant/baseURL";

export const saveUpdateVehicleInformation = async (data: any) => {
  const response = await http.put({
    url: ADMISSION_BASE_URL + `OfflineAdmission/UpsertofflineAdmissionVehical`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
