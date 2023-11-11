/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllBank = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `BankMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdBank = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `BankMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addBank = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `BankMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateBank = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `BankMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteBank = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `BankMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getOptionsBank = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `BankMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

