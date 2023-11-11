import { http } from "../../../utils/httpService";
import { ADMISSION_BASE_URL_ODATA } from "../../../constant/baseURL";

export const getAllOfflineAdmissionStudentDetails = async () => {
    const response = await http.get({
        url: ADMISSION_BASE_URL_ODATA + `odata/offlineAdmissionStudentDetails`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};
