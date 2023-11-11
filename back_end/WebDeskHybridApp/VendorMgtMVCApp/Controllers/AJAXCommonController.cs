using Microsoft.AspNetCore.Mvc;
using VendorMgtMVCApp.Services.Contract;
using VendorMgtMVCApp.ViewModels;

namespace VendorMgtMVCApp.Controllers
{
    public class AJAXCommonController : Controller
    {
        private readonly IVendorMasterService _service;
        public AJAXCommonController(IVendorMasterService service)
        {
            _service = service;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(VendorMasterVM vendorMasterVM)
        {
            bool status = false;
            if (ModelState.IsValid)
            {
                vendorMasterVM.CollegeId = 1;
                var res = await _service.Insert(vendorMasterVM);
                if (res > 0)
                {
                    status = true;
                    return new JsonResult(new { status, res });
                }
            }
            return new JsonResult(new { status });
        }
    }
}