import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllDocument = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `DocumentMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdDocument = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `DocumentMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addDocument = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `DocumentMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateDocument = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `DocumentMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteDocument = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `DocumentMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsDocument = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `DocumentMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };