import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllState = async () => {
  const response = await http.get({
    url: BASE_URL + `StateGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdState = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `StateGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addState = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `StateGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateState = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `StateGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteState = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `StateGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsState = async () => {
  const response = await http.get({
    url: BASE_URL + `StateGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
