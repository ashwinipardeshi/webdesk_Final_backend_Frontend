using AdmissionWebAPI.Filters;
using AdmissionWebAPI.Services.OnlineContract;
using AdmissionWebAPI.ViewModels.Online;
using CommonApp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdmissionWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    [Authorize] // JWT
    [AuthorizedAction] // RoleBasedMenus
    public class OnlineAdmissionController : ControllerBase
    {
        private readonly IOnlineAdmissionService _service;
        public OnlineAdmissionController(IOnlineAdmissionService service)
        {
            _service = service;
        }

        #region Get
        /// <summary>
        /// Get
        /// </summary>
        /// <param name="onlineUserId"></param>
        /// <returns></returns>
        [HttpGet("{onlineUserId}")]
        public async Task<IActionResult> Get(long onlineUserId)
        {
            var res = await _service.Get(onlineUserId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="onlineAdmissionStudentDetailsVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Insert(OnlineAdmissionStudentDetailsVM onlineAdmissionStudentDetailsVM)
        {
            if (onlineAdmissionStudentDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.Insert(onlineAdmissionStudentDetailsVM);
            if (res.HasValue && res.Value > 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Insert

        #region Upsert Student
        /// <summary>
        /// UpsertonlineAdmissionStudent
        /// </summary>
        /// <param name="onlineAdmissionStudentDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertonlineAdmissionStudent(OnlineAdmissionStudentDetailsVM onlineAdmissionStudentDetailsVM)
        {
            if (onlineAdmissionStudentDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertonlineAdmissionStudent(onlineAdmissionStudentDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Student

        #region Upsert Parent
        /// <summary>
        /// UpsertonlineAdmissionParent
        /// </summary>
        /// <param name="onlineAdmissionParentDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertonlineAdmissionParent(OnlineAdmissionParentDetailsVM onlineAdmissionParentDetailsVM)
        {
            if (onlineAdmissionParentDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertonlineAdmissionParent(onlineAdmissionParentDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Parent

        #region Upsert Communication
        /// <summary>
        /// UpsertonlineAdmissionCommunication
        /// </summary>
        /// <param name="onlineAdmissionCommunicationDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertonlineAdmissionCommunication(OnlineAdmissionCommunicationDetailsVM onlineAdmissionCommunicationDetailsVM)
        {
            if (onlineAdmissionCommunicationDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertonlineAdmissionCommunication(onlineAdmissionCommunicationDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Communication

        #region Upsert Academic
        /// <summary>
        /// UpsertonlineAdmissionAcademic
        /// </summary>
        /// <param name="onlineAdmissionAcademicDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertonlineAdmissionAcademic(OnlineAdmissionAcademicDetailsVM onlineAdmissionAcademicDetailsVM)
        {
            if (onlineAdmissionAcademicDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertonlineAdmissionAcademic(onlineAdmissionAcademicDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Academic

        #region Upsert Bank
        /// <summary>
        /// UpsertonlineAdmissionBank
        /// </summary>
        /// <param name="onlineAdmissionBankDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertonlineAdmissionBank(OnlineAdmissionBankDetailsVM onlineAdmissionBankDetailsVM)
        {
            if (onlineAdmissionBankDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertonlineAdmissionBank(onlineAdmissionBankDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Bank
    }
}
