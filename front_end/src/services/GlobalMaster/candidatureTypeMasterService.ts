/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllCandidatureType= async () => {
  const response = await http.get({
    url: BASE_URL + `CandidatureTypeGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdCandidatureType = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `CandidatureTypeGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addCandidatureType = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `CandidatureTypeGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateCandidatureType = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `CandidatureTypeGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteCandidatureType = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `CandidatureTypeGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsCandidatureType= async () => {
  const response = await http.get({
    url: BASE_URL + `CandidatureTypeGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
