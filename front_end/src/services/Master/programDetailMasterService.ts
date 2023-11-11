/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllProgramDetail = async () => {
    const response = await http.get({
        url: BASE_URL + `ProgramDetailMaster/GetAll`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdProgramDetail = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `ProgramDetailMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addProgramDetail = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `ProgramDetailMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateProgramDetail = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `ProgramDetailMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteProgramDetail = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `ProgramDetailMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};


