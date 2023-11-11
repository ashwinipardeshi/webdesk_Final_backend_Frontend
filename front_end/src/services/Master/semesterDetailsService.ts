/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllSemesterDetails = async (programMasterId: number, programYearId: number, academicYearId: number) => {
    const response = await http.get({
        url: BASE_URL + `SemesterDetailsMaster/GetAll/${programMasterId}/${programYearId}/${academicYearId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdSemesterDetails = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `SemesterDetailsMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addSemesterDetails = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `SemesterDetailsMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateSemesterDetails = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `SemesterDetailsMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteSemesterDetails = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `SemesterDetailsMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};


