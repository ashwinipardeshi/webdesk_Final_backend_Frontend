import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllDesignation = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `DesignationMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getByIdDesignation = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `DesignationMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const addDesignation = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `DesignationMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const updateDesignation = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `DesignationMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const deleteDesignation = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `DesignationMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsDesignation = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `DesignationMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  