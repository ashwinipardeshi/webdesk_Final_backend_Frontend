import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllAcademicStatus = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `AcademicStatusMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdAcademicStatus = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `AcademicStatusMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addAcademicStatus = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `AcademicStatusMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateAcademicStatus = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `AcademicStatusMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteAcademicStatus = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `AcademicStatusMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsAcademicStatus = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `AcademicStatusMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };