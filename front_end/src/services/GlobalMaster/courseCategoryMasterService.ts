/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllCourseCategory = async () => {
  const response = await http.get({
    url: BASE_URL + `CourseCategoryGMaster/GetAll`,
  });
  console.log(response)
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdCourseCategory = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `CourseCategoryGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addCourseCategory = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `CourseCategoryGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateCourseCategory = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `CourseCategoryGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteCourseCategory = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `CourseCategoryGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsCourseCategory = async () => {
  const response = await http.get({
    url: BASE_URL + `CourseCategoryGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
