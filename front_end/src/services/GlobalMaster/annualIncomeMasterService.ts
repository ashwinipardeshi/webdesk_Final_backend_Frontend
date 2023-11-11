
import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllAnnualIncome = async () => {
  const response = await http.get({
    url: BASE_URL + `AnnualIncomeGMaster/GetAll`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getByIdAnnualIncome = async (id: number) => {
  const response = await http.get({
    url: BASE_URL + `AnnualIncomeGMaster/Get/${id}`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const addAnnualIncome = async (data: any) => {
  const response = await http.post({
    url: BASE_URL + `AnnualIncomeGMaster/Insert`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const updateAnnualIncome = async (data: any) => {
  const response = await http.put({
    url: BASE_URL + `AnnualIncomeGMaster/Update/${data.id}`,
    body: JSON.stringify(data),
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const deleteAnnualIncome = async (id: string) => {
  const response = await http.delete({
    url: BASE_URL + `AnnualIncomeGMaster/Delete/${id}`,
  });

  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};

export const getOptionsAnnualIncome = async () => {
  const response = await http.get({
    url: BASE_URL + `AnnualIncomeGMaster/GetOptions`,
  });
  if (response.code) {
    return Promise.reject(response);
  }
  return response;
};
