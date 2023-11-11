import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllReservationCategory = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `ReservationCategoryMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getByIdReservationCategory = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `ReservationCategoryMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const addReservationCategory = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `ReservationCategoryMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const updateReservationCategory = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `ReservationCategoryMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const deleteReservationCategory = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `ReservationCategoryMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsReservationCategory = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `ReservationCategoryMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  