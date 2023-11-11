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
    public class ApproveOfflineUserController : ControllerBase
    {
        private readonly IApprovedOfflineUserService _service;
        public ApproveOfflineUserController(IApprovedOfflineUserService service)
        {
            _service = service;
        }

        #region ApproveOfflineUser
        /// <summary>
        /// ApproveOfflineUser
        /// </summary>
        /// <param name="offlineAdmissionApproveDataVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> ApproveOfflineUser(OfflineAdmissionApproveDataVM offlineAdmissionApproveDataVM)
        {
            var res = await _service.ApproveOfflineUser(offlineAdmissionApproveDataVM);
            if (res.HasValue)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Update);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion ApproveOfflineUser
    }
}
