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
    public class OnlineUserController : ControllerBase
    {
        private readonly IOnlineUserService _service;
        public OnlineUserController(IOnlineUserService service)
        {
            _service = service;
        }

        #region SignUP
        /// <summary>
        /// SignUP
        /// </summary>
        /// <param name="onlineUserVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> SignUP(OnlineUserVM onlineUserVM)
        {
            if (onlineUserVM == null)              
            {
                    return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, CommonCodes.NoContentData);
            }
            var res = await _service.SignUP(onlineUserVM);
            if (res.HasValue && res.Value > 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            else if (res.HasValue && res.Value == 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.EmailExist);

            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, CommonCodes.NoContentData);
        }
        #endregion SignUP

        #region OnlineUserProfile
        /// <summary>
        /// OnlineUserProfile
        /// </summary>
        /// <param name="id"></param>
        /// <param name="onlineUserVM"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> OnlineUserProfile(long id, OnlineUserVM onlineUserVM)
        {
            if (id != onlineUserVM.Id || onlineUserVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.OnlineUserProfile(onlineUserVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Update);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion OnlineUserProfile
    }
}