/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllExamType = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `ExamTypeMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdExamType = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `ExamTypeMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addExamType = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `ExamTypeMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateExamType = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `ExamTypeMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteExamType = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `ExamTypeMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getOptionsExamType = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `ExamTypeMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};
