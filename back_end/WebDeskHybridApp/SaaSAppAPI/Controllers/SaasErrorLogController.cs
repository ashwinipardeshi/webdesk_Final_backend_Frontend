using CommonApp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaaSAppAPI.Filters;
using SaaSAppAPI.Services.RESTServices.Contract;

namespace SaaSAppAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    
    public class SaasErrorLogController : ControllerBase
    {
        private readonly ISaasErrorLogService _service;
        public SaasErrorLogController(ISaasErrorLogService service)
        {
            _service = service;
        }

        #region GetAllErrorLogs
        /// <summary>
        /// GetAllErrorLogs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllErrorLogs()
        {
            var res = await _service.GetAllErrorLogs();
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetAllErrorLogs
    }
}
