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
    public class OnlineAdmissionStudentDetailsController : ControllerBase
    {
        private readonly IOnlineOdataAdmissionService _service;
        public OnlineAdmissionStudentDetailsController(IOnlineOdataAdmissionService service)
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
        public async Task<IEnumerable<OnlineAdmissionODataVM>> Get()
        {
            return await _service.GetStudentDetails();
        }
        #endregion Get
    }
}
