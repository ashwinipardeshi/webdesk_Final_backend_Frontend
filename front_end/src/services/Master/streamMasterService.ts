import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllStream = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `StreamMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdStream = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `StreamMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addStream = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `StreamMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateStream = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `StreamMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteStream = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `StreamMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsStream = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `StreamMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };