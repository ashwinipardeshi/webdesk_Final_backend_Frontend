using AdmissionWebAPI.Services.Common.Contract;
using AdmissionWebAPI.Utility;
using AdmissionWebAPI.ViewModels.Common;
using Newtonsoft.Json;

namespace AdmissionWebAPI.Services.Common.Implementation
{
    public class GetMasterNameFromId : IGetMasterNameFromId
    {
        public async Task<List<OptionVM>> GetAllOptions(string tablename)
        {
            using (var httpClient = new HttpClient())
            {
                var baseURL = StaticConfigurationManager.AppSetting["Ports:MasterURL"];
                using (var response = await httpClient.GetAsync($"{baseURL}/CommonGetOption/GetMasterOptions/{tablename}"))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var apiResponse = await response.Content.ReadAsStringAsync();
                        var res = JsonConvert.DeserializeObject<APIResponseGetOption<OptionVM>>(apiResponse).result;
                        return res;
                    }
                    return null;
                }
            }
        }

        

        public async Task<string?> GetMasterNameFromIdAPI(string tablename, long? Id)
        {
            using (var httpClient = new HttpClient())
            {
                string? baseURL = StaticConfigurationManager.AppSetting["Ports:MasterURL"];
                using (var response = await httpClient.GetAsync($"{baseURL}/CommonGetOption/GetMasterNameFromId/{tablename}/{Id}"))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        string? name = JsonConvert.DeserializeObject<APIResponse<string?>>(apiResponse).result;
                        return name;
                    }
                    return null;
                }
            }
        }
    }

    internal class APIResponse<T>
    {
        public string? result { get; set; }
    }

    internal class APIResponseGetOption<T>
    {
        public List<T>? result { get; set; }

    }
}
