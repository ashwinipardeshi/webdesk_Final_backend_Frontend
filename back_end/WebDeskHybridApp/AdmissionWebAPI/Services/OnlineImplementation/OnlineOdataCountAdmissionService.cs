using AdmissionWebAPI.Data;
using AdmissionWebAPI.Services.Common.Contract;
using AdmissionWebAPI.Services.OnlineContract;
using AdmissionWebAPI.ViewModels.Online;
using Microsoft.EntityFrameworkCore;

namespace AdmissionWebAPI.Services.OnlineImplementation
{
    public class OnlineOdataCountAdmissionService : IOnlineOdataCountAdmissionService
    {
        private readonly AdmissionDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly long academicYearId;
        public OnlineOdataCountAdmissionService(AdmissionDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IGetMasterNameFromId masterNameService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;

            string uId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("UserId"))?.Value;
            string cId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value;
            string ayId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("AcademicYearId"))?.Value;

            long.TryParse(uId, out userId);
            long.TryParse(cId, out collegeId);
            long.TryParse(ayId, out academicYearId);
        }

        public async Task<OnlineStudentAdmissionODataVM?> GetStudentDetailsCount()
        {
            var submittedCount = await _context.OnlineStudentAdmissions.Where(o => o.IsActive && !o.IsDeleted).CountAsync();

            var RejectedCount = await _context.OnlineStudentAdmissions.Where(o => o.IsActive && !o.IsDeleted && o.AdmissionStatus.Contains("REJECT")).CountAsync();

            var ConfirmedCount = await _context.OnlineStudentAdmissions.Where(o => o.IsActive && !o.IsDeleted && o.AdmissionStatus.Contains("CONFIRM")).CountAsync();

            var InCompletedCount = await _context.OnlineStudentAdmissions.Where(o => o.IsActive && !o.IsDeleted && o.AdmissionStatus.Contains("INCOMPLETE")).CountAsync();

            var CountData = await _context.OnlineStudentAdmissions.Where(e => e.IsDeleted == false).Select(e => new OnlineStudentAdmissionODataVM()
            {
                SubmittedCnt = submittedCount,
                RejectedCnt= RejectedCount,
                ConfirmedCnt= ConfirmedCount,
                InCompletedCnt= InCompletedCount

            }).FirstOrDefaultAsync<OnlineStudentAdmissionODataVM>();

            return CountData;
        }
    }
}
