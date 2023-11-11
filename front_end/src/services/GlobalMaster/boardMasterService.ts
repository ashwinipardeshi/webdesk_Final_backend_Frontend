import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllBoard = async () => {
  const response = await http.get({
    url: BASE_URL + `BoardGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdBoard = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `BoardGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addBoard = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `BoardGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateBoard = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `BoardGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteBoard = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `BoardGMaster/Delete/${id}`,
  });

  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsBoard = async () => {
  const response = await http.get({
    url: BASE_URL + `BoardGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
