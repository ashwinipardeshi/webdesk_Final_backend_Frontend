using CommonApp;
using Microsoft.AspNetCore.Mvc;
using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorBanksMasterController : ControllerBase
    {
        private readonly IVendorBanksMasterService _service;
        public VendorBanksMasterController(IVendorBanksMasterService service)
        {
            _service = service;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var res = await _service.GetAll();
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
        #endregion GetAl

        //#region Get
        ///// <summary>
        ///// Get
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>

        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get(long id)
        //{
        //    if (id < 1)
        //        return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, null, string.Empty);
        //    var res = await _service.Get(id);
        //    if (res != null)
        //        return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
        //    return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        //}
        //#endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="vendorBanksMasterVM"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Insert(VendorBanksMasterVM vendorBanksMasterVM)
        {
            if (vendorBanksMasterVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.Insert(vendorBanksMasterVM);
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
        /// <param name="vendorBanksMasterVM"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, VendorBanksMasterVM vendorBanksMasterVM)
        {
            if (id != vendorBanksMasterVM.Id || vendorBanksMasterVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.Update(vendorBanksMasterVM);
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
    }
}
