/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllRelation = async () => {
  const response = await http.get({
    url: BASE_URL + `RelationGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdRelation = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `RelationGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addRelation = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `RelationGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateRelation = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `RelationGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteRelation = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `RelationGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsRelation = async () => {
  const response = await http.get({
    url: BASE_URL + `RelationGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
