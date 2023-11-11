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
    public class RoleMenuMasterController : ControllerBase
    {
        private readonly IRoleMenuMasterService _service;
        public RoleMenuMasterController(IRoleMenuMasterService service)
        {
            _service = service;
        }

        #region Get
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAll(long roleId)
        {
            var res = await _service.GetAll(roleId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion Get

        #region Upsert
        /// <summary>
        /// UpsertRoleMenusert
        /// </summary>
        /// <param name="roleMenuMasterInsertVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertRoleMenus(RoleMenuMasterInsertVM roleMenuMasterInsertVM)
        {
            if (roleMenuMasterInsertVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertRoleMenus(roleMenuMasterInsertVM);
            if (res.HasValue && res.Value == true)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert
    }
}

