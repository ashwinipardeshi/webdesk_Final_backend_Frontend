/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllTaluka = async () => {
  const response = await http.get({
    url: BASE_URL + `TalukaGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdTaluka = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `TalukaGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addTaluka = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `TalukaGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateTaluka = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `TalukaGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteTaluka = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `TalukaGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsTaluka = async () => {
  const response = await http.get({
    url: BASE_URL + `TalukaGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};



  
