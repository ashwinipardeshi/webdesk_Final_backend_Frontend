/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllFeeHeadType = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `FeeHeadTypeMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdFeeHeadType = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `FeeHeadTypeMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addFeeHeadType = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `FeeHeadTypeMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateFeeHeadType = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `FeeHeadTypeMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteFeeHeadType = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `FeeHeadTypeMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getOptionsFeeHeadType = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `FeeHeadTypeMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};
