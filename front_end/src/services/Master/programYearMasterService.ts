/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllProgramYear = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `ProgramYearMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdProgramYear = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `ProgramYearMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addProgramYear = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `ProgramYearMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateProgramYear = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `ProgramYearMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteProgramYear = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `ProgramYearMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getOptionsProgramYear = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `ProgramYearMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

