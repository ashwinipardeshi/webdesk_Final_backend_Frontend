using CommonApp;
using MasterWebAPI.Filters;
using Microsoft.AspNetCore.Mvc;

namespace MasterWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    public class AccessDeniedMasterController : ControllerBase
    {
        #region AccessDenied
        /// <summary>
        /// AccessDeniedAPI
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult AccessDeniedAPI()
        {
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.AccessDenied, false, null, string.Empty);
        }
        #endregion AccessDenied
    }
}
