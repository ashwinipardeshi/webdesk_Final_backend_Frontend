using Authenticate.Controllers;
using Authenticate.Services.Contract;
using Authenticate.ViewModels;
using CommonApp;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AuthenticationUnitTestApp
{
    public class UserUnitTestCase
    {
        private readonly Mock<IUserService> _mockService;
        private readonly UserController _controller;

        public UserUnitTestCase()
        {
            _mockService = new Mock<IUserService>();
            //_controller = new UserController(_mockService.Object);
        }
        [SetUp]
        public void Setup()
        {

        }
        [Test]
        public async Task Login()
        {
            var res = (ObjectResult)await _controller.Login(new SignInVM()
            {
               
                EmailId = "",
                Password= "",
                IPAddress="",
                
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Created)
            {
                Assert.Pass();
            }
        }
        [Test]
        public async Task Logout_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.Logout(1, "siddhi");
           
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Created)
            {
                Assert.Pass();
            }
        }
        [Test]
        public async Task Insert_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.Insert(new UserVM()
            {
                Name = "Unit Test Insert",
                CollegeId = 1,
                DepartmentId = 1,
                EmailId = "",
                Password = "",
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
            var res = (ObjectResult)await _controller.Insert(new UserVM()
            {
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        public async Task ChangePassword_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.ChangePassword(1,new ChangePasswordVM()
            {
                userId=1,
                Password ="",
                NewPassword="",
                
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Created)
            {
                Assert.Pass();
            }
        }

        public async Task changeForgotPassword()
        {
            var res = (ObjectResult)await _controller.ChangeForgotPassword(new ChangeForgotPasswordVM()
            {
             UserId=1,  
             NewPassword="",
            });
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }
       


    }
}
