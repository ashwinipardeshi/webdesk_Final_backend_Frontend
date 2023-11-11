import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllFeeHead = async (collegeId: number, feeHeadTypeMasterId: number) => {
    const response = await http.get({
        url: BASE_URL + `FeeHeadMaster/GetAll/${collegeId}/${feeHeadTypeMasterId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdFeeHead = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `FeeHeadMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addFeeHead = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `FeeHeadMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.data) {
        return Promise.reject(response);
    }
    return response;
};

export const updateFeeHead = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `FeeHeadMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteFeeHead = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `FeeHeadMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getOptionsFeeHead = async (collegeId: number, feeHeadTypeMasterId: number) => {
    const response = await http.get({
        url: BASE_URL + `FeeHeadMaster/GetOptions/${collegeId}/${feeHeadTypeMasterId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};
