using CommonApp;
using MasterWebAPI.Filters;
using MasterWebAPI.Services.Common.Contract;
using Microsoft.AspNetCore.Mvc;

namespace MasterWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
   
    public class CommonGetOptionController : ControllerBase
    {
        private readonly ICommonGetOptionService _service;
        public CommonGetOptionController(ICommonGetOptionService service)
        {
            _service = service;
        }

        #region GetMasterNameFromId
        /// <summary>
        /// GetMasterNameFromId
        /// </summary>
        /// <param name="tablename"></param>
        /// <param name="Id"></param>
        /// <returns></returns>
       
        [HttpGet("{tablename}/{Id}")]
        public async Task<IActionResult> GetMasterNameFromId(string tablename, long Id)
        {
            var res = await _service.GetMasterNameFromId(tablename, Id);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetMasterNameFromId

        #region GetMasterOptions
        /// <summary>
        /// GetMasterOptions
        /// </summary>
        /// <param name="tablename"></param>
        /// <param name="Id"></param>
        /// <returns></returns>
       
        [HttpGet("{tablename}")]
        public async Task<IActionResult> GetMasterOptions(string tablename)
        {
            var res = await _service.GetMasterOptions(tablename);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetMasterNameFromId
    }
}
