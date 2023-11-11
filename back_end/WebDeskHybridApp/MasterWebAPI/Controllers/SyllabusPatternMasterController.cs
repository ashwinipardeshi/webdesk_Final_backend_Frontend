using Microsoft.AspNetCore.Mvc;
using CommonApp;
using MasterWebAPI.ViewModels.Masters;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.Filters;
using Microsoft.AspNetCore.Authorization;

namespace MasterMicroservicesWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [ApiController]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [Authorize] // JWT
   [AuthorizedAction] // RoleBasedMenus
    public class SyllabusPatternMasterController : ControllerBase
    {
        private readonly ISyllabusPatternService _service;
        public SyllabusPatternMasterController(ISyllabusPatternService service)
        {
            _service = service;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        
        [HttpGet("{collegeId}/{academicYearMasterId}/{programMasterId}")]
        public async Task<IActionResult> GetAll(long collegeId, long academicYearMasterId, long programMasterId)
        {
            if (collegeId < 1  && academicYearMasterId < 1  && programMasterId < 1)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            var res = await _service.GetAll(collegeId,academicYearMasterId,programMasterId);
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
            if (id < 1 )
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
        /// <param name="syllabusPatternMasterVM"></param>
        /// <returns></returns>
       
        [HttpPost]
        public async Task<IActionResult> Insert(SyllabusPatternMasterVM syllabusPatternMasterVM)
        {
            if (syllabusPatternMasterVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.Insert(syllabusPatternMasterVM);
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
        /// <param name="syllabusPatternMasterVM"></param>
        /// <returns></returns>
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, SyllabusPatternMasterVM syllabusPatternMasterVM)
        {
            if (id != syllabusPatternMasterVM.Id || syllabusPatternMasterVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.Update(syllabusPatternMasterVM);
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
        [HttpGet("{collegeId}/{academicYearMasterId}/{programMasterId}")]
        public async Task<IActionResult> GetOptions(long collegeId, long academicYearMasterId, long programMasterId)
        {
            if (collegeId < 1  && academicYearMasterId < 1 && programMasterId < 1)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            var res = await _service.GetOptions(collegeId,academicYearMasterId,programMasterId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetOptions
    }
}
