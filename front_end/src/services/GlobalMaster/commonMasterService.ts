import { BASE_URL } from "../../constant/baseURL";
import { http } from "../../utils/httpService";

export const CommonMasterService = async (id:number) => {
    const response = await http.get({
      url: BASE_URL + `Common/GetOptionsCommonGDetails/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };


  export const CommonMasterApplicationForService = async (id:number,collegeId:number) => {
    const response = await http.get({
      url:  `${BASE_URL}Common/GetOptionsCommonDetails/${collegeId}/${id}`,
    });
    if (response.code) {
      return Promise.reject(response);
    }
    return response;
  };
