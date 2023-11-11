using CommonApp;
using MasterWebAPI.Filters;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MasterWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [ApiController]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [Authorize] // JWT
   [AuthorizedAction] // RoleBasedMenus
    public class DivisionMasterController : ControllerBase
    {
        private readonly IDivisionService _service;
        public DivisionMasterController(IDivisionService service)
        {
            _service = service;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        
        [HttpGet("{collegeId}")]
        public async Task<IActionResult> GetAll(long collegeId)
        {
            if (collegeId < 1)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            var res = await _service.GetAll(collegeId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetAll

        #region Get
        /// <summary>
        /// Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
       
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            if (id < 1)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            var res = await _service.Get(id);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="divisionMasterVM"></param>
        /// <returns></returns>
        
        [HttpPost]
        public async Task<IActionResult> Insert(DivisionMasterVM divisionMasterVM)
        {
            if (divisionMasterVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.Insert(divisionMasterVM);
            if (res.HasValue && res.Value > 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            else if (res.HasValue && res.Value == 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.ExitsData, true, res, CommonCodes.Exits);
            else
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Insert

        #region Update
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="id"></param>
        /// <param name="divisionMasterVM"></param>
        /// <returns></returns>
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, DivisionMasterVM divisionMasterVM)
        {
            if (id != divisionMasterVM.Id || divisionMasterVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.Update(divisionMasterVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Update);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Update

        #region Delete
        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var res = await _service.Delete(id);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Delete);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Delete

        #region GetOptions
        /// <summary>
        /// GetOptions
        /// </summary>
        /// <returns></returns>
        [HttpGet("{collegeId}")]
        public async Task<IActionResult> GetOptions(long collegeId)
        {
            if (collegeId < 1)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            var res = await _service.GetOptions(collegeId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetOptions
    }
}
