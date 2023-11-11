import { http } from "../../utils/httpService";
import { AUTHENTICATION_BASE_URL } from "../../constant/baseURL";

export const getAllMenu = async () => {
    const response = await http.get({
      url: AUTHENTICATION_BASE_URL + `MenuMaster/GetAll`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdMenu = async (id: number) => {
    const response = await http.get({
      url: AUTHENTICATION_BASE_URL + `MenuMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addMenu = async (data: any) => {
    const response = await http.post({
      url: AUTHENTICATION_BASE_URL + `MenuMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateMenu = async (data: any) => {
    const response = await http.put({
      url: AUTHENTICATION_BASE_URL + `MenuMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteMenu = async (id: string) => {
    const response = await http.delete({
      url: AUTHENTICATION_BASE_URL + `MenuMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsMenu = async () => {
    const response = await http.get({
      url: AUTHENTICATION_BASE_URL + `MenuMaster/GetOptions`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };