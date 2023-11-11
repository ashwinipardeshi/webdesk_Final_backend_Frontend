using CommonApp;
using Microsoft.AspNetCore.Mvc;
using VendorMgtWebAPI.ViewModels;
using VendorMgtWebAPI.Services.RESTServices.Contract;

namespace VendorMgtWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [ApiController]
    public class VendorBillsController : ControllerBase
    {
            private readonly IVendorBillsServices _service;
            public VendorBillsController(IVendorBillsServices service)
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
            #endregion GetAll

            #region Insert
            /// <summary>
            /// Insert
            /// </summary>
            /// <param name="vendorBillVM"></param>
            /// <returns></returns>
            [HttpPost]
            public async Task<IActionResult> Insert(VendorBillVM vendorBillVM)
            {
                if (vendorBillVM == null)
                {
                    return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
                }
                var res = await _service.Insert(vendorBillVM);
                if (res.HasValue && res.Value > 0)
                    return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Created, true, res as dynamic, CommonCodes.Insert);
                 return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
        #endregion Insert

            #region Update
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="id"></param>
        /// <param name="vendorBillVM"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, VendorBillVM vendorBillVM)
        {
            if (id != vendorBillVM.Id || vendorBillVM == null)
            {
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false);
            }
            var res = await _service.Update(vendorBillVM);
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
