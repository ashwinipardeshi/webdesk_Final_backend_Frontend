import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllApplicationStatus = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `ApplicationStatusMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdApplicationStatus = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `ApplicationStatusMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addApplicationStatus = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `ApplicationStatusMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateApplicationStatus = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `ApplicationStatusMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteApplicationStatus = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `ApplicationStatusMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getOptionsApplicationStatus = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `ApplicationStatusMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};
