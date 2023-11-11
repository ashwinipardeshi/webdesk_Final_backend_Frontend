using AdmissionWebAPI.Filters;
using AdmissionWebAPI.Services.OfflineContract;
using AdmissionWebAPI.ViewModels.Offline;
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
    public class OfflineAdmissionController : ControllerBase
    {
        private readonly IOfflineAdmissionService _service;
        public OfflineAdmissionController(IOfflineAdmissionService service)
        {
            _service = service;
        }

        #region Get
        /// <summary>
        /// Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(long userId)
        {
            var res = await _service.Get(userId);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="offlineCommonVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Insert(OfflineCommonStudentInsertVM offlineCommonStudentVM)
        {
            if (offlineCommonStudentVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, CommonCodes.NoContentData);
            }
            var res = await _service.Insert(offlineCommonStudentVM);
            if (res.HasValue && res.Value > 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            else if (res.HasValue && res.Value == 0)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.EmailExist);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, CommonCodes.NoContentData);
        }
        #endregion Insert

        #region Upsert Program
        /// <summary>
        /// UpsertofflineAdmissionProgram
        /// </summary>
        /// <param name="offlineCommonVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertofflineAdmissionProgram(OfflineCommonVM offlineCommonVM)
        {
            if (offlineCommonVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertofflineAdmissionProgram(offlineCommonVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
           
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Program

        #region Upsert StudentDetails
        /// <summary>
        /// UpsertofflineAdmissionStudent
        /// </summary>
        /// <param name="offlineStudentAdmissionVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertofflineAdmissionStudent(OfflineAdmissionStudentDetailsVM offlineStudentAdmissionVM)
        {
            if (offlineStudentAdmissionVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertofflineAdmissionStudent(offlineStudentAdmissionVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert StudentDetails

        #region Upsert Communication
        /// <summary>
        /// UpsertofflineAdmissionCommunication
        /// </summary>
        /// <param name="offlineAdmissionCommunicationDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertofflineAdmissionCommunication(OfflineAdmissionCommunicationDetailsVM offlineAdmissionCommunicationDetailsVM)
        {
            if (offlineAdmissionCommunicationDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertofflineAdmissionCommunication(offlineAdmissionCommunicationDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Communication

        #region Upsert Parent
        /// <summary>
        /// UpsertofflineAdmissionParent
        /// </summary>
        /// <param name="offlineAdmissionParentDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertofflineAdmissionParent(OfflineAdmissionParentDetailsVM offlineAdmissionParentDetailsVM)
        {
            if (offlineAdmissionParentDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertofflineAdmissionParent(offlineAdmissionParentDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Parent

        #region Upsert Academic
        /// <summary>
        /// UpsertofflineAdmissionAcademic
        /// </summary>
        /// <param name="offlineAdmissionAcademicDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertofflineAdmissionAcademic(OfflineAdmissionAcademicDetailsVM offlineAdmissionAcademicDetailsVM)
        {
            if (offlineAdmissionAcademicDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertofflineAdmissionAcademic(offlineAdmissionAcademicDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Academic

        #region Upsert Bank
        /// <summary>
        /// UpsertonlineAdmissionBank
        /// </summary>
        /// <param name="offlineAdmissionBankDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertOfflineAdmissionBank(OfflineAdmissionBankDetailsVM offlineAdmissionBankDetailsVM)
        {
            if (offlineAdmissionBankDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertOfflineAdmissionBank(offlineAdmissionBankDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Bank

        #region Upsert Insurance
        /// <summary>
        /// UpsertonlineAdmissionInsurance
        /// </summary>
        /// <param name="offlineAdmissionInsuranceDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertOfflineAdmissionInsurance(OfflineAdmissionInsuranceDetailsVM offlineAdmissionInsuranceDetailsVM)
        {
            if (offlineAdmissionInsuranceDetailsVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertOfflineAdmissionInsurance(offlineAdmissionInsuranceDetailsVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Insurance

        #region Upsert Vehical
        /// <summary>
        /// UpsertonlineAdmissionVehical
        /// </summary>
        /// <param name="offlineAdmissionVehicalDetailsVM"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpsertofflineAdmissionVehical(OfflineAdmissionVehicleInformationsVM offlineAdmissionVehicleInformationVM)
        {
            if (offlineAdmissionVehicleInformationVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.UpsertofflineAdmissionVehical(offlineAdmissionVehicleInformationVM);
            if (res.HasValue && res.Value)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
        }
        #endregion Upsert Vehical
    }
}
