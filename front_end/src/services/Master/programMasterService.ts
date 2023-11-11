import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllProgram = async (collegeId: number, streamId: number) => {
  const response = await http.get({
    url: BASE_URL + `ProgramMaster/GetAll/${collegeId}/${streamId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdProgram = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `ProgramMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addProgram = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `ProgramMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateProgram = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `ProgramMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteProgram = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `ProgramMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsProgram = async (collegeId: number, streamId: number) => {
  const response = await http.get({
    url: BASE_URL + `ProgramMaster/GetOptions/${collegeId}/${streamId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
