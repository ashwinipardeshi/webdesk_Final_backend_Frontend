import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllDivision = async (collegeId: number) => {
    const response = await http.get({
      url: `${BASE_URL}DivisionMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdDivision = async (id: number) => {
    const response = await http.get({
      url: `${BASE_URL}DivisionMaster/Get/${id}`,
    });
    
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addDivision = async (data: any) => {
    const response = await http.post({
      url:`${BASE_URL}DivisionMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateDivision = async (data: any) => {
    const response = await http.put({
      url:`${BASE_URL}DivisionMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteDivision = async (id: string) => {
    const response = await http.delete({
      url:`${BASE_URL}DivisionMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsDivision = async (collegeId: number) => {
    const response = await http.get({
      url:`${BASE_URL}DivisionMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };