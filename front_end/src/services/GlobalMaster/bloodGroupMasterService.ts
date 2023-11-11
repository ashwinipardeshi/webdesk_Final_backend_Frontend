import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllBloodGroup = async () => {
  const response = await http.get({
    url: BASE_URL + `BloodGroupGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdBloodGroup = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `BloodGroupGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addBloodGroup = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `BloodGroupGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateBloodGroup = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `BloodGroupGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteBloodGroup = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `BloodGroupGMaster/Delete/${id}`,
  });

  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsBloodGroup = async () => {
  const response = await http.get({
    url: BASE_URL + `BloodGroupGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
