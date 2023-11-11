/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllCountry = async () => {
  const response = await http.get({
    url: BASE_URL + `CountryGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdCountry = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `CountryGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addCountry = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `CountryGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateCountry = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `CountryGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteCountry = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `CountryGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsCountry = async () => {
  const response = await http.get({
    url: BASE_URL + `CountryGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
