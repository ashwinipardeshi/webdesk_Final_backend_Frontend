import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllSMTPConfig = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `SMTPConfigMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdSMTPConfig = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `SMTPConfigMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const addSMTPConfig = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `SMTPConfigMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const updateSMTPConfig = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `SMTPConfigMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const deleteSMTPConfig = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `SMTPConfigMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsSMTPConfig = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `SMTPConfigMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  