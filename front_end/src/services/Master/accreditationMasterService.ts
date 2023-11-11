import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllAccreditation = async (collegeId: number, streamId: number) => {
  const response = await http.get({
    url: BASE_URL + `AccreditationMaster/GetAll/${collegeId}/${streamId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdAccreditation = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `AccreditationMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addAccreditation = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `AccreditationMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateAccreditation = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `AccreditationMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteAccreditation = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `AccreditationMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsAccreditation = async (collegeId: number, streamId: number) => {
  const response = await http.get({
    url: BASE_URL + `AccreditationMaster/GetOptions/${collegeId}/${streamId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
