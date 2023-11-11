import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllEvaluation = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `EvaluationMaster/GetAll/${collegeId}`,
    });
    console.log(response)
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdEvaluation = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `EvaluationMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addEvaluation = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `EvaluationMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateEvaluation = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `EvaluationMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteEvaluation = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `EvaluationMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsEvaluation = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `EvaluationMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };