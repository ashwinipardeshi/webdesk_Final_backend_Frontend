import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllRejectReason = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `ApplicationRejectReasons/GetAll/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdRejectReason = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `ApplicationRejectReasons/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addRejectReason = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `ApplicationRejectReasons/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateRejectReason = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `ApplicationRejectReasons/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteRejectReason = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `ApplicationRejectReasons/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getOptionsRejectReason = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `ApplicationRejectReasons/GetOptions/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};