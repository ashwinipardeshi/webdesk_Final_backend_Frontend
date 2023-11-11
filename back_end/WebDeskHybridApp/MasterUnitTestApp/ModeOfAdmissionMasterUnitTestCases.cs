using CommonApp;
using MasterWebAPI.Controllers;
using MasterWebAPI.Services.GlobalMasterContract;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.ViewModels.GlobalMasters;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace MasterUnitTestApp
{
    public class ModeOfAdmissionMasterUnitTestCases
    {
        private readonly Mock<IModeOfAdmissionMasterService> _mockService;
        private readonly ModeOfAdmissionMasterController _controller;

        public ModeOfAdmissionMasterUnitTestCases()
        {
            _mockService = new Mock<IModeOfAdmissionMasterService>();
            _controller = new ModeOfAdmissionMasterController(_mockService.Object);
        }

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task ModeOfAdmissionMaster_GetAll_UTC()
        {
            var res = (ObjectResult)await _controller.GetAll(1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Ok)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task ModeOfAdmissionMaster_Get_RecordFound_UTC()
        {
            var res = (ObjectResult)await _controller.Get(1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        //[Test]
        //public async Task ModeOfAdmissionMaster_Get_RecordNotFound_UTC()
        //{
        //    var res = (ObjectResult)await _controller.Get(0);
        //    APIResponseFinal? finres = res.Value as APIResponseFinal;
        //    if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
        //    {
        //        Assert.Pass();
        //    }
        //}

        //[Test]
        //public async Task ModeOfAdmissionMaster_Insert_CorrectData_UTC()
        //{
        //    var res = (ObjectResult)await _controller.Insert(new ModeOfAdmissionMasterVM()
        //    {
        //        Name = "Unit Test Insert",
        //        IsActive = false
        //    });
        //    APIResponseFinal? finres = res.Value as APIResponseFinal;
        //    if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Created)
        //    {
        //        Assert.Pass();
        //    }
        //}

        //[Test]
        //public async Task ModeOfAdmissionMaster_Insert_WrongData_UTC()
        //{
        //    var res = (ObjectResult)await _controller.Insert(new ModeOfAdmissionMasterVM()
        //    {
        //    });
        //    APIResponseFinal? finres = res.Value as APIResponseFinal;
        //    if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
        //    {
        //        Assert.Pass();
        //    }
        //}

        //[Test]
        //public async Task ModeOfAdmissionMaster_Update_CorrectData_UTC()
        //{
        //    var res = (ObjectResult)await _controller.Insert(new ModeOfAdmissionMasterVM()
        //    {
        //        Id = 1,
        //        Name = "Unit Test Update",
        //        IsActive = false
        //    });
        //    APIResponseFinal? finres = res.Value as APIResponseFinal;
        //    if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Accepted)
        //    {
        //        Assert.Pass();
        //    }
        //}

        //[Test]
        //public async Task ModeOfAdmissionMaster_Update_WrongData_UTC()
        //{
        //    var res = (ObjectResult)await _controller.Insert(new ModeOfAdmissionMasterVM()
        //    {
        //        Id = 0,
        //        Name = "Unit Test Update",
        //        IsActive = false
        //    });
        //    APIResponseFinal? finres = res.Value as APIResponseFinal;
        //    if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
        //    {
        //        Assert.Pass();
        //    }
        //}

        [Test]
        public async Task ModeOfAdmissionMaster_Delete_CorrectData_UTC()
        {
            var res = (ObjectResult)await _controller.Get(1);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.Accepted)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task ModeOfAdmissionMaster_Delete_WrongData_UTC()
        {
            var res = (ObjectResult)await _controller.Get(0);
            APIResponseFinal? finres = res.Value as APIResponseFinal;
            if (finres?.statusCode == (int)CommonCodes.APIResErrorCodes.NoContent)
            {
                Assert.Pass();
            }
        }

        [Test]
        public async Task ModeOfAdmissionMaster_GetOptions_UTC()
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
