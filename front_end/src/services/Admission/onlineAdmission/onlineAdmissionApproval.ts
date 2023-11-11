import { http } from "../../../utils/httpService";
import { ADMISSION_BASE_URL } from "../../../constant/baseURL";
import { ADMISSION_BASE_URL_ODATA } from "../../../constant/baseURL";

export const getAllOnlineAdmissionStudentDetails = async () => {
    const response = await http.get({
        url: ADMISSION_BASE_URL_ODATA + `odata/OnlineAdmissionStudentDetails`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateOnlineAdmissionConfirmation = async (data: any) => {
    const response = await http.put({
        url: ADMISSION_BASE_URL + `OnlineAdmissionConfirmation/AdmissionAccept`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateOnlineAdmissionReject = async (data: any) => {
    const response = await http.put({
        url: ADMISSION_BASE_URL + `OnlineAdmissionConfirmation/AdmissionReject`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateOnlineAdmissionStatusUpdate = async (data: any) => {
    const response = await http.put({
        url: ADMISSION_BASE_URL + `OnlineAdmissionConfirmation/AdmissionStatusUpdate`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};