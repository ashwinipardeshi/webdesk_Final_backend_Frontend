import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllReligion = async () => {
  const response = await http.get({
    url: BASE_URL + `ReligionGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdReligion = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `ReligionGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addReligion = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `ReligionGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateReligion = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `ReligionGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteReligion = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `ReligionGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsReligion = async () => {
  const response = await http.get({
    url: BASE_URL + `ReligionGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
