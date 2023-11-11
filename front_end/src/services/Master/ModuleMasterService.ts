import { SASS_APP_BASE_URL } from "../../constant/baseURL";
import { http } from "../../utils/httpService";

export const getAllModule = async () => {
    const response = await http.get({
      url: SASS_APP_BASE_URL + `ModuleMaster/GetAll`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdModule = async (id: number) => {
    const response = await http.get({
      url: SASS_APP_BASE_URL + `ModuleMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addModule = async (data: any) => {
    const response = await http.post({
      url: SASS_APP_BASE_URL + `ModuleMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateModule = async (data: any) => {
    const response = await http.put({
      url: SASS_APP_BASE_URL + `ModuleMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteModule = async (id: string) => {
    const response = await http.delete({
      url: SASS_APP_BASE_URL + `ModuleMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsModule = async () => {
    const response = await http.get({
      url: SASS_APP_BASE_URL + `ModuleMaster/GetOptions`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };