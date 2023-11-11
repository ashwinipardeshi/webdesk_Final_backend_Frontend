import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllSeatType = async (collegeId: number) => {
  const response = await http.get({
    url: BASE_URL + `SeatTypeMaster/GetAll/${collegeId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdSeatType = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `SeatTypeMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addSeatType = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `SeatTypeMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateSeatType = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `SeatTypeMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteSeatType = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `SeatTypeMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsSeatType = async (collegeId: number) => {
  const response = await http.get({
    url: BASE_URL + `SeatTypeMaster/GetOptions/${collegeId}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
