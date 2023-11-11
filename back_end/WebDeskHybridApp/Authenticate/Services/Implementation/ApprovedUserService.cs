using Authenticate.Data;
using Authenticate.Filters.PasswordHasherFilters;
using Authenticate.Models;
using Authenticate.Services.Contract;
using Authenticate.Utility;
using Authenticate.ViewModels;
using CommonApp.Services.Contract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Authenticate.Services.Implementation
{
    public class ApprovedUserService : IApprovedUserService
    {
        private readonly AuthenticationDevFinalDbContext _context;
        protected readonly IEmailService _emailService;

        public ApprovedUserService(AuthenticationDevFinalDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        #region ApproveOnlineUser
        /// <summary>
        /// ApproveOnlineUser
        /// </summary>
        /// <param name="onlineAdmissionAcceptDataVM"></param>
        /// <returns></returns>
        public async Task<long?> ApproveOnlineUser(OnlineAdmissionAcceptDataVM onlineAdmissionAcceptDataVM)
        {
            var getOnlineUserData = _context.OnlineUsers.Where(u => u.Id == onlineAdmissionAcceptDataVM.userId && u.IsActive && u.IsDeleted == false).FirstOrDefault();
            if (getOnlineUserData != null)
            {
                UserMaster userMaster = new UserMaster()
                {
                    EmailId = getOnlineUserData.EmailId,
                    Password = getOnlineUserData.Password,
                    RoleId = 4, // *Need to Update from Online to Offline ==> Get Offline User Role For Specific College & Update
                    CollegeId = getOnlineUserData.CollegeId,
                    AcademicYearId = getOnlineUserData.AcademicYearId,
                    DepartmentId = getOnlineUserData.DepartmentId,
                    RefTableId = onlineAdmissionAcceptDataVM.studentAdmissionId,
                    RefTableName = "StudentAdmission",
                    Name = getOnlineUserData.Name,
                    Mobile = getOnlineUserData.Mobile,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedBy = onlineAdmissionAcceptDataVM.createdBy,
                    CreatedDate = DateTime.UtcNow,
                };      
                
                EntityEntry<UserMaster> created = _context.Add(userMaster);
                if (_context.SaveChanges() > 0)
                {
                    // OnlineUser ISActive = False
                     getOnlineUserData.IsActive = false;
                    _context.Entry(getOnlineUserData).State = EntityState.Modified;
                    _context.SaveChanges();

                    string ebody = $"<h1>Dear {getOnlineUserData.Name}</h1>\r\n<p>Welcome to WebDeskERP ABC College</p>\r\n<p>Your Credentails</p>\r\n<p>Email: {getOnlineUserData.EmailId}</p>";
                    await _emailService.sendMail(getOnlineUserData.EmailId, "WebDeskERP - Admission Confirmed", ebody);
                    return created.Entity.Id;
                }
            }        
            return null;
        }
        #endregion ApproveOnlineUser    
    }
}
