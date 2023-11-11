import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllCollege = async () => {
  const response = await http.get({
    url: BASE_URL + `CollegeMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdCollege = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `CollegeMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addCollege = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `CollegeMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateCollege = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `CollegeMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteCollege = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `CollegeMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsCollege = async () => {
  const response = await http.get({
    url: BASE_URL + `CollegeMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
