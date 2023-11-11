using Authenticate.Controllers;
using Authenticate.Models;
using Authenticate.Services.Contract;
using Authenticate.ViewModels;
using CommonApp;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AuthenticationUnitTestApp
{
    public class OnlineUserUnitTestCases
    {
        private readonly Mock<IOnlineUserService> _mockService;
        private readonly OnlineUserController _controller;

        public OnlineUserUnitTestCases()
        {
            _mockService = new Mock<IOnlineUserService>();
            _controller = new OnlineUserController(_mockService.Object);
        }

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task SignUP_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.SignUP(new OnlineUserVM()
            {
                RoleId=1,
                CollegeId=1,
                DepartmentId=1,
                Name="abc",
                EmailId ="abc@gmail.com",
                Password = "12345",
                Mobile= "1234567890",
                IsActive = true
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Created)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task SignUP_WrongData_UTC()
        {
            var res = (ObjectResult)await _controller.SignUP(new OnlineUserVM()
            {
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task OnlineUserProfile_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.OnlineUserProfile(1,new OnlineUserVM()
            {
                RoleId = 1,
                CollegeId = 1,
                DepartmentId = 1,
                Name = "abc",
                EmailId = "abc@gmail.com",
                Password = "12345",
                Mobile = "1234567890",
                IsActive = true
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Accepted)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task OnlineUserProfile_WrongData_UTC()
        {
            var res = (ObjectResult)await _controller.OnlineUserProfile(1,new OnlineUserVM()
            {
                RoleId = 1,
                CollegeId = 92,
                DepartmentId = 1,
                Name = "abc",
                EmailId = "abc@gmil.com",
                Password = "12345",
                Mobile = "1234567890",
                IsActive = true
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

    }
}
