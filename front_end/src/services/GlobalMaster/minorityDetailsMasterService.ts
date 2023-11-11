import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";
export const getAllMinorityDetails = async () => {
    const response = await http.get({
      url: BASE_URL + `MinorityDetailsGMaster/GetAll`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdMinorityDetails = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `MinorityDetailsGMaster/Get/${id}`,
    });
   
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const addMinorityDetails = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `MinorityDetailsGMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const updateMinorityDetails = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `MinorityDetailsGMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const deleteMinorityDetails = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `MinorityDetailsGMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsMinorityDetails = async () => {
    const response = await http.get({
      url: BASE_URL + `MinorityDetailsGMaster/GetOptions`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  

  