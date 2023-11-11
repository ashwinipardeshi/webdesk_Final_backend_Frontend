/* eslint-disable import/no-cycle */
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllAppointmentType = async () => {
  const response = await http.get({
    url: BASE_URL + `AppointmentTypeGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdAppointmentType = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `AppointmentTypeGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addAppointmentType = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `AppointmentTypeGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateAppointmentType = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `AppointmentTypeGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteAppointmentType = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `AppointmentTypeGMaster/Delete/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsAppointmentType = async () => {
  const response = await http.get({
    url: BASE_URL + `AppointmentTypeGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
