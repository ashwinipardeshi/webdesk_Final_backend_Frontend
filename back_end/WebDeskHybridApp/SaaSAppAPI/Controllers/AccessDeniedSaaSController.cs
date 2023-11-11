using CommonApp;
using Microsoft.AspNetCore.Mvc;
using SaaSAppAPI.Filters;

namespace SaaSAppAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    public class AccessDeniedSaaSController : ControllerBase
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
