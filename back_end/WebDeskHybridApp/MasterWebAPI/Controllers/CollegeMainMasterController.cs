using CommonApp;
using MasterWebAPI.Filters;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasterWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [ApiController]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    public class CollegeMainMasterController : ControllerBase
    {
        private readonly ICollegeMainService _service;
        public CollegeMainMasterController(ICollegeMainService service)
        {
            _service = service;
        }

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="collegeMainMasterVM"></param>
        /// <returns></returns>

        [HttpPost]
        public async Task<IActionResult> Insert(CollegeMasterVM collegeMainMasterVM)
        {
            var res = await _service.Insert(collegeMainMasterVM);
            if (res.HasValue)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Accepted, true, res as dynamic, CommonCodes.Update);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Insert

        
    }
}
