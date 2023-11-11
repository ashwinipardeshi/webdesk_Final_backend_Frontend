import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllProgramType = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `ProgramTypeMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdProgramType = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `ProgramTypeMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addProgramType = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `ProgramTypeMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateProgramType = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `ProgramTypeMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteProgramType = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `ProgramTypeMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsProgramType = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `ProgramTypeMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };