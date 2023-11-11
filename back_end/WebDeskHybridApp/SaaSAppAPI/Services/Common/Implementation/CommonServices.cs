using SaaSAppAPI.Utility;
using Newtonsoft.Json;
using SaaSAppAPI.Data;
using SaaSAppAPI.Services.Common.Contract;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.Common.Implementation
{
    public class CommonServices : ICommonServices
    {
        private readonly SaaSdevDbFinalContext _context;
        public CommonServices(SaaSdevDbFinalContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GetRoleMenusURLs
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public async Task<List<RoleMenusURLVM>> GetRoleMenusURLs(long roleId)
        {
            using (var httpClient = new HttpClient())
            {
                var baseURL = StaticConfigurationManager.AppSetting["Ports:AuthenticateURL"];
                using (var response = await httpClient.GetAsync($"{baseURL}/User/GetRoleMenusURLs/{roleId}"))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        return JsonConvert.DeserializeObject<APIResponse<RoleMenusURLVM?>>(apiResponse).result;
                    }
                    return null;
                }
            }
        }    
        internal class APIResponse<T>
        {
            public List<T> result { get; set; }
        }
    }
}
