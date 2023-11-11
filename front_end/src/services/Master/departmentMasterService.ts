import { http } from "../../utils/httpService";
import { BASE_URL } from "../../constant/baseURL";

export const getAllDepartment = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `DepartmentMaster/GetAll/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const getByIdDepartment = async (id: number) => {
    const response = await http.get({
      url: BASE_URL + `DepartmentMaster/Get/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const addDepartment = async (data: any) => {
    const response = await http.post({
      url: BASE_URL + `DepartmentMaster/Insert`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const updateDepartment = async (data: any) => {
    const response = await http.put({
      url: BASE_URL + `DepartmentMaster/Update/${data.id}`,
      body: JSON.stringify(data),
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };

  export const deleteDepartment = async (id: string) => {
    const response = await http.delete({
      url: BASE_URL + `DepartmentMaster/Delete/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
  
  export const getOptionsDepartment = async (collegeId: number) => {
    const response = await http.get({
      url: BASE_URL + `DepartmentMaster/GetOptions/${collegeId}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };