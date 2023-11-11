using AdmissionWebAPI.Filters;
using AdmissionWebAPI.Services.Common.Contract;
using CommonApp;
using Microsoft.AspNetCore.Mvc;

namespace AdmissionWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    public class ErrorLogsController : ControllerBase
    {
        private readonly IErrorLogService _service;
        public ErrorLogsController(IErrorLogService service)
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
