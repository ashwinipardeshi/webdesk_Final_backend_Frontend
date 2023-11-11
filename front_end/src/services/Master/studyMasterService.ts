import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllStudy = async (collegeId: number) => {
  const response = await http.get({
    url: BASE_URL + `StudyMaster/GetAll/${collegeId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdStudy = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `StudyMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addStudy = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `StudyMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateStudy = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `StudyMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteStudy = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `StudyMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsStudy = async (collegeId: number) => {
  const response = await http.get({
    url: BASE_URL + `StudyMaster/GetOptions/${collegeId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
