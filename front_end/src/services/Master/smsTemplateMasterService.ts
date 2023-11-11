import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllSMSTemplate = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `SMSTemplateMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdSMSTemplate = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `SMSTemplateMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addSMSTemplate = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `SMSTemplateMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateSMSTemplate = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `SMSTemplateMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteSMSTemplate = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `SMSTemplateMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsSMSTemplate = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `SMSTemplateMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };