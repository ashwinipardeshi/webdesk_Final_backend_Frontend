using CommonApp;
using ExamWebAPI.Filters;
using Microsoft.AspNetCore.Mvc;

namespace ExamWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    public class AccessDeniedController : ControllerBase
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
