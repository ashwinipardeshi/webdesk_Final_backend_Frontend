using CommonApp;
using MasterWebAPI.Filters;
using MasterWebAPI.Services.MasterContract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MasterWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    [Authorize] // JWT
   
    public class CommonController : ControllerBase
    {
        private readonly ICommonServices _service;
        public CommonController(ICommonServices service)
        {
            _service = service;
        }

        #region GetOptionsCommonGMaster
        /// <summary>
        /// GetOptionsCommonGMaster
        /// </summary>
        /// <returns></returns>
       
        [HttpGet]
        public async Task<IActionResult> GetOptionsCommonGMaster()
        {
            var res = await _service.GetOptionsCommonGMaster();
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetOptionsCommonGMaster

        #region GetOptionsCommonGDetails
        /// <summary>
        /// GetOptionsCommonGDetails
        /// </summary>
        /// <returns></returns>
       
        [HttpGet("{CommonMasterId}")]
        public async Task<IActionResult> GetOptionsCommonGDetails(long CommonMasterId)
        {
            if (CommonMasterId  < 1 )
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            var res = await _service.GetOptionsCommonGDetails(CommonMasterId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetOptionsCommonGDetails

        #region GetOptionsCommonMaster
        /// <summary>
        /// GetOptionsCommonMaster
        /// </summary>
        /// <returns></returns>
       
        [HttpGet]
        public async Task<IActionResult> GetOptionsCommonMaster()
        {
            var res = await _service.GetOptionsCommonMaster();
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetOptionsCommonMaster

        #region GetOptionsCommonDetails
        /// <summary>
        /// GetOptionsCommonDetails
        /// </summary>
        /// <returns></returns>
       
        [HttpGet("{CollegeId}/{CommonMasterId}")]
        public async Task<IActionResult> GetOptionsCommonDetails(long CollegeId, long CommonMasterId)
        {
            if (CollegeId < 1  && CommonMasterId < 1)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
            var res = await _service.GetOptionsCommonDetails(CollegeId, CommonMasterId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetOptionsCommonDetails

        #region GetAllErrorLogs
        /// <summary>
        /// GetAllErrorLogs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllErrorLogs()
        {
            var res = await _service.GetAllErrorLogs();
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetAllErrorLogs
    }
}