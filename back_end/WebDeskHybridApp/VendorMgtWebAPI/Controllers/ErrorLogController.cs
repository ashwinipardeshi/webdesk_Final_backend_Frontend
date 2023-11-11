using CommonApp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.Services.RESTServices.Implementation;

namespace VendorMgtWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [ApiController]
    public class ErrorLogController : ControllerBase
    {

        private readonly IErrorLogService _service;
        public ErrorLogController(ErrorLogService service)
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
