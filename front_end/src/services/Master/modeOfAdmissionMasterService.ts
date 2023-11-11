import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllModeOfAdmission = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `ModeOfAdmissionMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdModeOfAdmission = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `ModeOfAdmissionMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addModeOfAdmission = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `ModeOfAdmissionMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateModeOfAdmission = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `ModeOfAdmissionMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteModeOfAdmission = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `ModeOfAdmissionMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsModeOfAdmission = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `ModeOfAdmissionMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };