using MasterWebAPI.Data;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.Utility;
using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MasterWebAPI.Services.MasterImplementation
{
    public class CommonServices : ICommonServices
    {
        private readonly MasterDevFinalDbContext _context;
        public CommonServices(MasterDevFinalDbContext context)
        {
            _context = context;
        }

        #region GetOptionsCommonGMaster
        /// <summary>
        /// GetOptionsCommonGMaster
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<OptionNewVM?>> GetOptionsCommonGMaster()
        {
            return await _context.CommonGmasters.Where(e => e.IsActive == true).Select(e => new OptionNewVM()
            {
                Id = e.Id,
                Name = e.Name
            }).ToListAsync<OptionNewVM>();
        }
        #endregion GetOptionsCommonGMaster

        #region GetOptionsCommonGDetails
        /// <summary>
        /// GetOptionsCommonGDetails
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<OptionNewVM?>> GetOptionsCommonGDetails(long CommonGMasterId)
        {
            return await _context.CommonGmasterDetails.Where(c => c.CommonGmasterId == CommonGMasterId).Select(c => new OptionNewVM()
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync<OptionNewVM>();
        }
        #endregion GetOptionsCommonGDetails

        #region GetOptionsCommonMaster
        /// <summary>
        /// GetOptionsCommonMaster
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<OptionNewVM?>> GetOptionsCommonMaster()
        {
            return await _context.CommonMasters.Where(e => e.IsActive == true).Select(e => new OptionNewVM()
            {
                Id = e.Id,
                Name = e.Name
            }).ToListAsync<OptionNewVM>();
        }
        #endregion GetOptionsCommonMaster

        #region GetOptionsCommonDetails
        /// <summary>
        /// GetOptionsCommonDetails
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<OptionNewVM?>> GetOptionsCommonDetails(long CollegeId, long CommonMasterId)
        {
            return await _context.CommonMasterDetails.Where(c => c.CollegeId == CollegeId && c.CommonMasterId == CommonMasterId).Select(c => new OptionNewVM()
            {
                Id = c.Id,
                Name = c.Name
            }).ToListAsync<OptionNewVM>();
        }
        #endregion GetOptionsCommonDetails

        #region GetAllErrorLogs
        /// <summary>
        /// GetAllErrorLogs
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<ErrorLogVM?>> GetAllErrorLogs()
        {
            return await _context.ErrorLogs.OrderByDescending(e => e.Id).Select(e => new ErrorLogVM()
            {
                Id = e.Id,
                Controller = e.Controller,
                Action = e.Action,
                Message = e.Message,
                StackTrace = e.StackTrace,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate
            }).ToListAsync<ErrorLogVM?>();
        }
        #endregion GetAllErrorLogs

        /// <summary>
        /// GetRoleMenusURLs
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        
        public async Task<List<RoleMenusURLVM>> GetRoleMenusURLs(long roleId)
        {
            using (var httpClient = new HttpClient())
            {
                string? baseURL = StaticConfigurationManager.AppSetting["Ports:AuthenticateURL"];
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
