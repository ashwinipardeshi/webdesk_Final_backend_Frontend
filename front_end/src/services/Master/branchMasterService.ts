import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllBranch = async ( collegeId: number,programMasterId: number) => {
  const response = await http.get({
    url: BASE_URL + `BranchMaster/GetAll/${collegeId}/${programMasterId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdBranch = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `BranchMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addBranch = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `BranchMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateBranch = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `BranchMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteBranch = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `BranchMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsBranch = async (collegeId: number,programMasterId: number) => {
  const response = await http.get({
    url: BASE_URL + `BranchMaster/GetOptions/${collegeId}/${programMasterId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
