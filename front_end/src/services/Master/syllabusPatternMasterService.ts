/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllSyllabusPattern = async (collegeId: number, academicYearMasterId: number, programMasterId: number) => {
    const response = await http.get({
        url: BASE_URL + `SyllabusPatternMaster/GetAll/${collegeId}/${academicYearMasterId}/${programMasterId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdSyllabusPattern = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `SyllabusPatternMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addSyllabusPattern = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `SyllabusPatternMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateSyllabusPattern = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `SyllabusPatternMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteSyllabusPattern = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `SyllabusPatternMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getOptionsSyllabusPattern = async (collegeId: number, academicYearMasterId: number, programMasterId: number) => {
    const response = await http.get({
        url: BASE_URL + `SyllabusPatternMaster/GetOptions/${collegeId}/${academicYearMasterId}/${programMasterId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

