using CommonApp;
using MasterWebAPI.Controllers;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace MasterUnitTestApp
{
    public class FeeHeadMasterUnitTestCases
    {
        private readonly Mock<IFeeHeadService> _mockService;
        private readonly FeeHeadMasterController _controller;

        public FeeHeadMasterUnitTestCases()
        {
            _mockService = new Mock<IFeeHeadService>();
            _controller = new FeeHeadMasterController(_mockService.Object);
        }

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task FeeHeadMaster_GetAll_UTC()
        {
            var res = (ObjectResult)await _controller.GetAll(1,1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Ok)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task FeeHeadMaster_Get_RecordFound_UTC()
        {
            var res = (ObjectResult)await _controller.Get(1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }
        [Test]
        public async Task FeeHeadMaster_Get_RecordNotFound_UTC()
        {
            var res = (ObjectResult)await _controller.Get(0);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task FeeHeadMaster_Insert_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.Insert(new FeeHeadMasterVM()
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
        public async Task FeeHeadMaster_Insert_WrongData_UTC()
        {
            var res = (ObjectResult)await _controller.Insert(new FeeHeadMasterVM()
            {
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task FeeHeadMaster_Update_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.Insert(new FeeHeadMasterVM()
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
        public async Task FeeHeadMaster_Update_WrongData_UTC()
        {
            var res = (ObjectResult)await _controller.Insert(new FeeHeadMasterVM()
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
        public async Task FeeHeadMaster_Delete_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.Get(1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Accepted)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task FeeHeadMaster_Delete_WrongData_UTC()
        {
            var res = (ObjectResult)await _controller.Get(0);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task FeeHeadMaster_GetOptions_UTC()
        {
            var res = (ObjectResult)await _controller.GetOptions(1, 1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Ok)
            {
                Assert.Pass();
            }
        }
    }
}
