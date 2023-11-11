/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllMinority = async () => {
  const response = await http.get({
    url: BASE_URL + `MinorityGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdMinority = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `MinorityGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addMinority = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `MinorityGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateMinority = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `MinorityGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteMinority = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `MinorityGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsMinority = async () => {
  const response = await http.get({
    url: BASE_URL + `MinorityGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
