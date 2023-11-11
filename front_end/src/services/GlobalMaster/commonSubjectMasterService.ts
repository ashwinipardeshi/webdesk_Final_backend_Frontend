import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllCommonSubject = async () => {
  const response = await http.get({
    url: BASE_URL + `CommonSubjectList/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdCommonSubject = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `CommonSubjectList/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addCommonSubject = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `CommonSubjectList/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateCommonSubject = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `CommonSubjectList/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteCommonSubject = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `CommonSubjectList/Delete/${id}`,
  });

  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsCommonSubject = async () => {
  const response = await http.get({
    url: BASE_URL + `CommonSubjectList/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
