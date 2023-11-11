/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllSemester = async () => {
  const response = await http.get({
    url: BASE_URL + `SemesterGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdSemester = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `SemesterGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addSemester = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `SemesterGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateSemester = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `SemesterGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteSemester = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `SemesterGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsSemester = async () => {
  const response = await http.get({
    url: BASE_URL + `SemesterGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
