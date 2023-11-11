import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllAdmissionType = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `AdmissionTypeMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdAdmissionType = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `AdmissionTypeMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addAdmissionType = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `AdmissionTypeMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateAdmissionType = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `AdmissionTypeMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteAdmissionType = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `AdmissionTypeMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsAdmissionType = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `AdmissionTypeMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };