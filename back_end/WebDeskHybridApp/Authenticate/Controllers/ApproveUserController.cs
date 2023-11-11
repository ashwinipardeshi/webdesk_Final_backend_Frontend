using Authenticate.Filters;
using Authenticate.Services.Contract;
using Authenticate.ViewModels;
using CommonApp;
using Microsoft.AspNetCore.Mvc;

namespace Authenticate.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    public class ApproveUserController : ControllerBase
    {
        private readonly IApprovedUserService _service;
        public ApproveUserController(IApprovedUserService service)
        {
            _service = service;
        }

        #region ApproveOnlineUser
        /// <summary>
        /// ApproveOnlineUser
        /// </summary>
        /// <param name="onlineAdmissionAcceptDataVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> ApproveOnlineUser(OnlineAdmissionAcceptDataVM onlineAdmissionAcceptDataVM)
        {
            var res = await _service.ApproveOnlineUser(onlineAdmissionAcceptDataVM);
            if (res.HasValue)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Update);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion ApproveOnlineUser

        //#region ApproveOnlineUser
        ///// <summary>
        ///// ApproveOnlineUser
        ///// </summary>
        ///// <param name="onlineAdmissionAcceptDataVM"></param>
        ///// <returns></returns>
        //[HttpPut]
        //public async Task<IActionResult> ApproveOnlineUser(OnlineAdmissionAcceptDataVM onlineAdmissionAcceptDataVM)
        //{
        //    var res = await _service.ApproveUser(onlineAdmissionAcceptDataVM);
        //    if (res.HasValue && res.Value)
        //        return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Update);
        //    return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        //}
        //#endregion ApproveOnlineUser

    }
}
