import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllDomicile = async () => {
  const response = await http.get({
    url: BASE_URL + "DomicileGMaster/GetAll",
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdDomicile = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `DomicileGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addDomicile = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `DomicileGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateDomicile = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `DomicileGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteDomicile = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `DomicileGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsDomicile = async () => {
  const response = await http.get({
    url: BASE_URL + `DomicileGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
