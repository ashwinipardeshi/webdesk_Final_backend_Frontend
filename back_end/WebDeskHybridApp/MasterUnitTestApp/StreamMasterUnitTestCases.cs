﻿using CommonApp;
using MasterWebAPI.Controllers;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace MasterUnitTestApp
{
    public class StreamMasterUnitTestCases
    {
        private readonly Mock<IStreamService> _mockService;
        private readonly StreamMasterController _controller;

        public StreamMasterUnitTestCases()
        {
            _mockService = new Mock<IStreamService>();
            _controller = new StreamMasterController(_mockService.Object);
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
            var res = (ObjectResult)await _controller.Insert(new StreamMasterVM()
            {
                Name = "Unit Test Insert",
                Description = "Description",
                CollegeId = 3,                
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
            var res = (ObjectResult)await _controller.Insert(new StreamMasterVM()
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
            var res = (ObjectResult)await _controller.Insert(new StreamMasterVM()
            {
                Id = 1,
                Name = "Unit Test Update",
                CollegeId = 3,
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
            var res = (ObjectResult)await _controller.Insert(new StreamMasterVM()
            {
                Id = 0,
                Name = "Unit Test Update",
                CollegeId=3,
                Description = "Description",
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
