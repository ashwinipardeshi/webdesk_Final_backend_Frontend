/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllTimeSlot = async () => {
  const response = await http.get({
    url: BASE_URL + `TimeSlotGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdTimeSlot = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `TimeSlotGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addTimeSlot = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `TimeSlotGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateTimeSlot = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `TimeSlotGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteTimeSlot = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `TimeSlotGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
