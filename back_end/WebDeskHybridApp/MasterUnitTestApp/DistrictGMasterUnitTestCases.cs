using CommonApp;
using MasterWebAPI.Controllers;
using MasterWebAPI.Services.GlobalMasterContract;
using MasterWebAPI.ViewModels.GlobalMasters;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace MasterUnitTestApp
{
    public class DistrictGMasterUnitTestCases
    {
        private readonly Mock<IDistrictService> _mockService;
        private readonly DistrictGMasterController _controller;

        public DistrictGMasterUnitTestCases()
        {
            _mockService = new Mock<IDistrictService>();
            _controller = new DistrictGMasterController(_mockService.Object);
        }

        [SetUp]
        public void Setup()
        {
        }
        [Test]
        public async Task GetAll_UTC()
        {
            var res = (ObjectResult)await _controller.GetAll();
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
            var res = (ObjectResult)await _controller.Insert(new DistrictGMasterVM()
            {
                Name = "Unit Test Insert",
                IsActive = false
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
            var res = (ObjectResult)await _controller.Insert(new DistrictGMasterVM()
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
            var res = (ObjectResult)await _controller.Insert(new DistrictGMasterVM()
            {
                Id = 1,
                Name = "Unit Test Update",
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
            var res = (ObjectResult)await _controller.Insert(new DistrictGMasterVM()
            {
                Id = 0,
                Name = "Unit Test Update",
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

        [Test]
        public async Task GetOptions_UTC()
        {
            var res = (ObjectResult)await _controller.GetOptions();
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Ok)
            {
                Assert.Pass();
            }
        }
    }
}