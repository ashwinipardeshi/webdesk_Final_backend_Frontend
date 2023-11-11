/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllEmployeeType = async () => {
  const response = await http.get({
    url: BASE_URL + `EmployeeTypeGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdEmployeeType = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `EmployeeTypeGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addEmployeeType = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `EmployeeTypeGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateEmployeeType = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `EmployeeTypeGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteEmployeeType = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `EmployeeTypeGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsEmployeeType = async () => {
  const response = await http.get({
    url: BASE_URL + `EmployeeTypeGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
