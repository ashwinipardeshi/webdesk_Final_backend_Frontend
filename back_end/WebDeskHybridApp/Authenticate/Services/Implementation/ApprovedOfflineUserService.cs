using Authenticate.Data;
using Authenticate.Filters.PasswordHasherFilters;
using Authenticate.Models;
using Authenticate.Services.Contract;
using Authenticate.Utility;
using Authenticate.ViewModels;
using CommonApp.Services.Contract;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Authenticate.Services.Implementation
{
    public class ApprovedOfflineUserService : IApprovedOfflineUserService
    {
        private readonly AuthenticationDevFinalDbContext _context;
        protected readonly IEmailService _emailService;

        public ApprovedOfflineUserService(AuthenticationDevFinalDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        #region ApproveOfflineUser
        /// <summary>
        /// ApproveOfflineUser
        /// </summary>
        /// <param name="offlineAdmissionApproveDataVM"></param>
        /// <returns></returns>
        public async Task<long?> ApproveOfflineUser(OfflineAdmissionApproveDataVM offlineAdmissionApproveDataVM)
        {
            if (offlineAdmissionApproveDataVM != null)
            {
                string newpassword = PasswordService.CreatePassword(8);
                PasswordHasher<OfflineAdmissionApproveDataVM> passwordHasher = new PasswordHasher<OfflineAdmissionApproveDataVM>();
                UserMaster userMaster = new UserMaster()
                {
                    EmailId = offlineAdmissionApproveDataVM.StudentMailId,
                    Password = passwordHasher.HashPassword(offlineAdmissionApproveDataVM, newpassword),
                    RoleId = offlineAdmissionApproveDataVM.RoleId,
                    CollegeId = offlineAdmissionApproveDataVM.CollegeId,
                    AcademicYearId = offlineAdmissionApproveDataVM.AcademicYearId,
                    DepartmentId = offlineAdmissionApproveDataVM.DepartmentId,
                    RefTableId = offlineAdmissionApproveDataVM.studentAdmissionId,
                    RefTableName = "StudentAdmission",
                    Name = offlineAdmissionApproveDataVM.FirstName,
                    Mobile = offlineAdmissionApproveDataVM.Mobile,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedBy = offlineAdmissionApproveDataVM.createdBy,
                    CreatedDate = DateTime.UtcNow,
                };
                EntityEntry<UserMaster> created = _context.Add(userMaster);
                if (_context.SaveChanges() > 0)
                {
                    string ebody = $"<h1>Dear {offlineAdmissionApproveDataVM.FirstName}</h1>\r\n<p>Welcome to WebDeskERP ABC College</p>\r\n<p>Your Credentails</p>\r\n<p>Email: {offlineAdmissionApproveDataVM.StudentMailId}</p>\r\n<p>Password: {newpassword}</p>";
                    await _emailService.sendMail(offlineAdmissionApproveDataVM.StudentMailId, "WebDeskERP - Admission Confirmed", ebody);
                    return created.Entity.Id;
                }
            }
            return null;
        }
        #endregion ApproveOfflineUser
    }
}
