import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";


export const getAllCasteCategory = async () => {
    const response = await http.get({
      url: BASE_URL + `CasteCategoryGMaster/GetAll`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };


  export const getByIdCasteCategory = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `CasteCategoryGMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const addCasteCategory = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `CasteCategoryGMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const updateCasteCategory = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `CasteCategoryGMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const deleteCasteCategory = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `CasteCategoryGMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsCasteCategory = async () => {
    const response = await http.get({
      url: BASE_URL + `CasteCategoryGMaster/GetOptions`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  