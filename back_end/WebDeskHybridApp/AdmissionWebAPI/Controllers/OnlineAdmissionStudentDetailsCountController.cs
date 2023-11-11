using AdmissionWebAPI.Filters;
using AdmissionWebAPI.Services.OnlineContract;
using AdmissionWebAPI.ViewModels.Online;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AdmissionWebAPI.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    public class OnlineAdmissionStudentDetailsCountController : ControllerBase
    {
        private readonly IOnlineOdataCountAdmissionService _service;
        public OnlineAdmissionStudentDetailsCountController(IOnlineOdataCountAdmissionService service)
        {
            _service = service;
        }

        #region Get
        /// <summary>
        /// GetStudentDetails
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [EnableQuery]
        public async Task<OnlineStudentAdmissionODataVM?> Get()
        {
            return await _service.GetStudentDetailsCount();
        }
        #endregion Get
    }
}
