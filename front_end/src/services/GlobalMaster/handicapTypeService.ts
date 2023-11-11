import { IHandicapType } from "../../interfaces/GlobalMaster/IHandicapType";
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllHandicapType = async () => {
  const result = await http.get({
    url: `${BASE_URL}HandicapTypeGMaster/GetAll`,
  });
  if (result.code) {
    return Promise.reject(result);
  }
  return result;
};

export const getByIdHandicapType = async (id: number) => {
  const result = await http.get({
    url: `${BASE_URL}HandicapTypeGMaster/Get/${id}`,
  });
  if (result.code) {
    return Promise.reject(result);
  }
  return result;
};

export const addHandicapType = async (data: IHandicapType) => {
  const result = await http.post({
    url: `${BASE_URL}HandicapTypeGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (result.code) {
    return Promise.reject(result);
  }
  return result;
};

export const updateHandicapType = async (data: IHandicapType) => {
  const result = await http.put({
    url: `${BASE_URL}HandicapTypeGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (result.code) {
    return Promise.reject(result);
  }
  return result;
};

export const deleteHandicapType = async (id: number) => {
  const result = await http.delete({
    url: `${BASE_URL}HandicapTypeGMaster/Delete/${id}`,
  });
  if (result.code) {
    return Promise.reject(result);
  }
  return result;
};

export const getOptionsHandicapType = async () => {
  const result = await http.get({
    url: `${BASE_URL}HandicapTypeGMaster/GetOptions`,
  });
  if (result.code) {
    return Promise.reject(result);
  }
  return result;
};
