import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllMotherTongue = async () => {
  const response = await http.get({
    url: BASE_URL + `MotherTongueGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdMotherTongue = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `MotherTongueGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addMotherTongue = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `MotherTongueGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateMotherTongue = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `MotherTongueGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteMotherTongue = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `MotherTongueGMaster/Delete/${id}`,
  });

  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsMotherTongue = async () => {
  const response = await http.get({
    url: BASE_URL + `MotherTongueGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
