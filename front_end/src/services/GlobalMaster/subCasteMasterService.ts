/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllSubCaste = async () => {
  const response = await http.get({
    url: BASE_URL + `SubCasteGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdSubCaste = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `SubCasteGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addSubCaste = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `SubCasteGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateSubCaste = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `SubCasteGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteSubCaste = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `SubCasteGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsSubCaste = async () => {
  const response = await http.get({
    url: BASE_URL + `SubCasteGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
