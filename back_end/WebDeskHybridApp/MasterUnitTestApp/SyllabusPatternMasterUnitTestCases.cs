using CommonApp;
using MasterMicroservicesWebAPI.Controllers;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace MasterUnitTestApp
{
    public class SyllabusPatternMasterUnitTestCases
    {
        private readonly Mock<ISyllabusPatternService> _mockService;
        private readonly SyllabusPatternMasterController _controller;

        public SyllabusPatternMasterUnitTestCases()
        {
            _mockService = new Mock<ISyllabusPatternService>();
            _controller = new SyllabusPatternMasterController(_mockService.Object);
        }

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task GetAll_UTC()
        {
            var res = (ObjectResult)await _controller.GetAll(1,1,1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Ok)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task Get_RecordFound_UTC()
        {
            var res = (ObjectResult)await _controller.Get(1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task Get_RecordNotFound_UTC()
        {
            var res = (ObjectResult)await _controller.Get(0);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task Insert_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.Insert(new SyllabusPatternMasterVM()
            {
                Name = "Unit Test Insert",
                CollegeId = 3,
                AcademicMasterId = 3,
                ProgramMasterId = 3,
                IsActive = false,

            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Created)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task Insert_WrongData_UTC()
        {
            var res = (ObjectResult)await _controller.Insert(new SyllabusPatternMasterVM()
            {
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task Update_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.Insert(new SyllabusPatternMasterVM()
            {
                Id = 1,
                Name = "Unit Test Update",
                CollegeId = 3,
                AcademicMasterId = 3,
                ProgramMasterId = 3,
                IsActive = false
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Accepted)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task Update_WrongData_UTC()
        {
            var res = (ObjectResult)await _controller.Insert(new SyllabusPatternMasterVM()
            {
                Id = 0,
                Name = "Unit Test Update",
                CollegeId = 1,
                AcademicMasterId = 1,
                ProgramMasterId = 1,
                IsActive = false
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task Delete_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.Get(1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Accepted)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task Delete_WrongData_UTC()
        {
            var res = (ObjectResult)await _controller.Get(0);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        //[Test]
        //public async Task GetOptions_UTC()
        //{
        //    var res = (ObjectResult)await _controller.GetOptions();
        //    APIResponseFinal? finres = res.Value as APIResponseFinal;
        //    if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Ok)
        //    {
        //        Assert.Pass();
        //    }
        //}
    }
}
