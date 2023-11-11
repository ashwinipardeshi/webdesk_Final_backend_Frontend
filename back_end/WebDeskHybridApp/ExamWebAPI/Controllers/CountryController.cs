using ExamWebAPI.Services.Contracts;
using ExamWebAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ExamWebAPI.Controllers
{
    [Route("restapi/v1.0/[controller]/[action]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _service;
        public CountryController(ICountryService service)
        {
            _service = service;
        }

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="countryGmasterVM"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Insert(CountryGMasterVM countryGmasterVM)
        {
            if (countryGmasterVM == null)
            {
                return NoContent();
            }
            var res = _service.Insert(countryGmasterVM);
            if (res)
                return Ok(res);
            return NoContent();
        }
        #endregion Insert
    }
}
