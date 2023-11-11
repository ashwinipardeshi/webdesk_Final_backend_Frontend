import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllDistrict = async () => {
  const response = await http.get({
    url: BASE_URL + `DistrictGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdDistrict = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `DistrictGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addDistrict = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `DistrictGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.data) {
    return Promise.reject(response);
  }
  return response;
};

export const updateDistrict = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `DistrictGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteDistrict = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `DistrictGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsDistrict = async () => {
  const response = await http.get({
    url: BASE_URL + `DistrictGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
