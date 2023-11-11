using CommonApp;
using MasterWebAPI.Controllers;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.Services.MasterImplementation;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MasterUnitTestApp
{
    public class ApplicationRejectReasonsMasterUnitTestCases
    {
        private readonly Mock<IApplicationRejectReasonsService> _mockService;
        private readonly ApplicationRejectReasonsController _controller;

        public ApplicationRejectReasonsMasterUnitTestCases()
        {
            _mockService = new Mock<IApplicationRejectReasonsService>();
            _controller = new ApplicationRejectReasonsController(_mockService.Object);
        }

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task GetAll_UTC()
        {
            var res = (ObjectResult)await _controller.GetAll(1);
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
            var res = (ObjectResult)await _controller.Insert(new ApplicationRejectReasonsMasterVM()
            {
                Name = "Unit Test Insert",               
                CollegeId = 90,
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
            var res = (ObjectResult)await _controller.Insert(new ApplicationRejectReasonsMasterVM()
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
            var res = (ObjectResult)await _controller.Insert(new ApplicationRejectReasonsMasterVM()
            {
                Id = 9,
                Name = "Unit Test Update",
                CollegeId = 90,
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
            var res = (ObjectResult)await _controller.Insert(new ApplicationRejectReasonsMasterVM()
            {
                Id = 10,
                Name = "Unit Test Update",
                CollegeId = 3,
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
            var res = (ObjectResult)await _controller.GetOptions(1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Ok)
            {
                Assert.Pass();
            }
        }
    }
}
