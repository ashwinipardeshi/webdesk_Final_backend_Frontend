import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllAcademicYear = async (collegeId: number, streamId: number) => {
  const response = await http.get({
    url: BASE_URL + `AcademicYearMaster/GetAll/${collegeId}/${streamId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdAcademicYear = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `AcademicYearMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addAcademicYear = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `AcademicYearMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateAcademicYear = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `AcademicYearMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteAcademicYear = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `AcademicYearMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsAcademicYear = async (collegeId: number, streamId: number) => {
  const response = await http.get({
    url: BASE_URL + `AcademicYearMaster/GetOptions/${collegeId}/${streamId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
