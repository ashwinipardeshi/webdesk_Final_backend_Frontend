import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllCaste = async () => {
  const response = await http.get({
    url: BASE_URL + `CasteGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdCaste = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `CasteGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addCaste = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `CasteGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateCaste = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `CasteGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteCaste = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `CasteGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsCaste = async () => {
  const response = await http.get({
    url: BASE_URL + `CasteGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
