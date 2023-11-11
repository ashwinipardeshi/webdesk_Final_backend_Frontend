using AdmissionWebAPI.Filters;
using AdmissionWebAPI.Services.OfflineContract;
using AdmissionWebAPI.ViewModels.Offline;
using CommonApp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AdmissionWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    [Authorize] // JWT
    [AuthorizedAction] // RoleBasedMenus
    public class OnlineAdmissionConfirmationController : ControllerBase
    {
        private readonly IOnlineAdmissionConfirmationService _onlineService;
        public OnlineAdmissionConfirmationController(IOnlineAdmissionConfirmationService onlineService)
        {
            _onlineService = onlineService;
        }

        #region AdmissionAccept
        /// <summary>
        /// OnlineAdmissionConfirmationVM
        /// </summary>
        /// <param name="onlineAdmissionConfirmationVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> AdmissionAccept(OnlineAdmissionConfirmationVM onlineAdmissionConfirmationVM)
        {
            var res = await _onlineService.AdmissionAccept(onlineAdmissionConfirmationVM);
            if (res.HasValue && res.Value > 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true,res as dynamic, CommonCodes.AdmissionConfirm);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion AdmissionAccept

        #region AdmissionReject
        /// <summary>
        /// OnlineAdmissionConfirmationVM
        /// </summary>
        /// <param name="onlineAdmissionConfirmationVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> AdmissionReject(OnlineAdmissionConfirmationVM onlineAdmissionConfirmationVM)
        {
            var res = await _onlineService.AdmissionReject(onlineAdmissionConfirmationVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res as dynamic, CommonCodes.AdmissionReject);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion AdmissionReject 

        #region AdmissionStatusUpdate
        /// <summary>
        /// OnlineAdmissionConfirmationVM
        /// </summary>
        /// <param name="onlineAdmissionConfirmationVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> AdmissionStatusUpdate(OnlineAdmissionConfirmationVM onlineAdmissionConfirmationVM)
        {
            var res = await _onlineService.AdmissionStatusUpdate(onlineAdmissionConfirmationVM);      
            if (res.HasValue && res.Value)
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res as dynamic, CommonCodes.Update);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion AdmissionStatusUpdate
    }
}
