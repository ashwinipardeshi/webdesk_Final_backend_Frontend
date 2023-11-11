using CommonApp;
using Microsoft.AspNetCore.Mvc;
using SaaSAppAPI.Filters;
using SaaSAppAPI.Services.Common.Contract;
using SaaSAppAPI.Services.HTTPServices;
using SaaSAppAPI.Utility;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [TypeFilter(typeof(CustomExceptionFilterAttribute))]
    [ApiController]
    public class GenericHTTPController : ControllerBase
    {
        private readonly IHTTPRequestService _service;
        private readonly ICommonServices _service1;
        public GenericHTTPController(IHTTPRequestService service, ICommonServices service1)
        {
            _service = service;
            _service1 = service1;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            string baseurl = StaticConfigurationManager.AppSetting["Ports:MasterURL"];
            var res = await _service.HTTPGetAllRequestCall<CountryGMasterVM>($"{baseurl}/CountryGMaster/GetAll");
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            string baseurl = StaticConfigurationManager.AppSetting["Ports:MasterURL"];
            var res = await _service.HTTPGetRequestCall<CountryGMasterVM>($"{baseurl}/CountryGMaster/Get/{id}");
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }

        [HttpGet]
        public async Task<IActionResult> Insert()
        {
            string baseurl = StaticConfigurationManager.AppSetting["Ports:MasterURL"];
            CountryGMasterVM countryGMasterVM = new CountryGMasterVM()
            {
                Name = "Dubai",
                IsActive = true,
                CreatedBy = 1,
                CreatedDate = DateTime.Now
            };
            var res = await _service.HTTPPostRequestCall<CountryGMasterVM>($"{baseurl}/CountryGMaster/Insert", countryGMasterVM);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }

        [HttpGet]
        public async Task<IActionResult> Update()
        {
            string baseurl = StaticConfigurationManager.AppSetting["Ports:MasterURL"];
            CountryGMasterVM countryGMasterVM = new CountryGMasterVM()
            {
                Id = 74,
                Name = "Nasik",
                IsActive = true,
                CreatedBy = 1,
                CreatedDate = DateTime.Now
            };
            var res = await _service.HTTPPutRequestCall<CountryGMasterVM>($"{baseurl}/CountryGMaster/Update/74", countryGMasterVM);
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }

        [HttpGet]
        public async Task<IActionResult> Delete()
        {
            string baseurl = StaticConfigurationManager.AppSetting["Ports:MasterURL"];
            var res = await _service.HTTPDeleteRequestCall($"{baseurl}/CountryGMaster/Delete/74");
            if (res != null)
                return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.Ok, true, res, string.Empty);
            return APIResponseFinal.Response((int)CommonCodes.APIResErrorCodes.NoContent, false, res, string.Empty);
        }
    }
}
