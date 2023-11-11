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
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly IRoleMenuService _roleMenuService;
        public UserController(IUserService service, IRoleMenuService roleMenuService)
        {
            _service = service;
            _roleMenuService = roleMenuService;
        }

        #region Login
        /// <summary>
        /// Login
        /// </summary>
        /// <param name="signInVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Login(SignInVM signInVM)
        {
            if (signInVM == null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, CommonCodes.NoContentData);
            var res = await _service.Login(signInVM);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, CommonCodes.NoContentData);

        }
        #endregion Login

        #region Logout
        /// <summary>
        /// Logout
        /// </summary>
        /// <returns></returns>
        [HttpPut("{userId}/{ipaddress}")]
        public async Task<IActionResult> Logout(long userId, string ipaddress)
        {
            if (userId < 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            var res = await _service.Logout(userId, ipaddress);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion Logout

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="userVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Insert(UserVM userVM)
        {          
            if (userVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, CommonCodes.NoContentData);
            }
            var res = await _service.Insert(userVM);
            if (res.HasValue && res.Value > 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            else if (res.HasValue && res.Value == 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.EmailExist);
           
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, CommonCodes.NoContentData);
        }
        #endregion Insert

        #region ChangePassword
        /// <summary>
        /// changePasswordVM
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="changePasswordVM"></param>
        /// <returns></returns>
        [HttpPut("{userId}")]
        public async Task<IActionResult> ChangePassword(long userId, ChangePasswordVM changePasswordVM)
        {
            if (userId != changePasswordVM.userId || changePasswordVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            }
            var res = await _service.ChangePassword(changePasswordVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Update);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
        }
        #endregion ChangePassword

        #region ChangeForgotPassword
        /// <summary>
        /// ChangeForgotPassword
        /// </summary>
        /// <param name="changeForgotPasswordVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> ChangeForgotPassword(ChangeForgotPasswordVM changeForgotPasswordVM)
        {
            var res = await _service.ChangeForgotPassword(changeForgotPasswordVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Update);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
        }
        #endregion ChangeForgotPassword

        #region ForgotPassword
        /// <summary>
        /// ForgotPassword
        /// </summary>
        /// <param name="emailId"></param>
        /// <returns></returns>
        [HttpGet("{emailId}")]
        public async Task<IActionResult> ForgotPassword(string emailId)
        {
            var res = await _service.ForgotPassword(emailId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, CommonCodes.EmailSent);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion ForgotPassword

        #region UserProfileUpdate
        /// <summary>
        /// UserProfileUpdate
        /// </summary>
        /// <param name="id"></param>
        /// <param name="userVM"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> OfflineUserProfileUpdate(long id, UserVM userVM)
        {
            if (id != userVM.Id || userVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            }
            var res = await _service.UserProfileUpdate(userVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Update);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
        }
        #endregion UserProfileUpdate

        #region GetRoleMenusURLs
        /// <summary>
        /// GetRoleMenusURLs
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpGet("{roleId}")]
        public async Task<IActionResult> GetRoleMenusURLs(long roleId)
        {
            var res = await _roleMenuService.GetRoleMenusURLs(roleId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetRoleMenusURLs

        #region AccessDenied
        /// <summary>
        /// AccessDenied
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult AccessDenied()
        {
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.AccessDenied, false, null, string.Empty);
        }
        #endregion AccessDenied
    }
}
