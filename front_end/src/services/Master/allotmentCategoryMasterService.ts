import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllAllotmentCategory = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `AllotmentCategory/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdAllotmentCategory = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `AllotmentCategory/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addAllotmentCategory = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `AllotmentCategory/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateAllotmentCategory = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `AllotmentCategory/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteAllotmentCategory = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `AllotmentCategory/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsAllotmentCategory = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `AllotmentCategory/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };