/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllCourseType = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `CourseTypeMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getByIdCourseType = async (id: number) => {
    const response = await http.get({
        url: BASE_URL + `CourseTypeMaster/Get/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const addCourseType = async (data: any) => {
    const response = await http.post({
        url: BASE_URL + `CourseTypeMaster/Insert`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const updateCourseType = async (data: any) => {
    const response = await http.put({
        url: BASE_URL + `CourseTypeMaster/Update/${data.id}`,
        body: JSON.stringify(data),
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const deleteCourseType = async (id: string) => {
    const response = await http.delete({
        url: BASE_URL + `CourseTypeMaster/Delete/${id}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

export const getOptionsCourseType = async (collegeId: number) => {
    const response = await http.get({
        url: BASE_URL + `CourseTypeMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
        return Promise.reject(response);
    }
    return response;
};

