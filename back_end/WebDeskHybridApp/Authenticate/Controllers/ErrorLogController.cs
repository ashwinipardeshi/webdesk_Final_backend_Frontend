using Authenticate.Filters;
using Authenticate.Services.Contract;
using CommonApp;
using Microsoft.AspNetCore.Mvc;

namespace Authenticate.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
   
    public class ErrorLogController : ControllerBase
    {
        private readonly IErrorLogService _service;
        public ErrorLogController(IErrorLogService service)
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
