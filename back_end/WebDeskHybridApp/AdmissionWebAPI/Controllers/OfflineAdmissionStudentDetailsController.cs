using AdmissionWebAPI.Filters;
using AdmissionWebAPI.Services.OfflineContract;
using AdmissionWebAPI.ViewModels.Offline;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace AdmissionWebAPI.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    public class OfflineAdmissionStudentDetailsController : ControllerBase
    {
        private readonly IOfflineOdataAdmissionService _service;
        public OfflineAdmissionStudentDetailsController(IOfflineOdataAdmissionService service)
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
        public async Task<IEnumerable<OfflineAdmissionOdataVM>> Get()
        {
            return await _service.GetStudentDetails();
        }
        #endregion Get
    }
}