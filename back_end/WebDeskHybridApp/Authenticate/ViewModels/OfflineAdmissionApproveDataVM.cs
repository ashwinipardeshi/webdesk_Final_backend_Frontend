namespace Authenticate.ViewModels
{
    public class OfflineAdmissionApproveDataVM
    {
        public long studentAdmissionId { get; set; }
        public long CollegeId { get; set; }
        public long AcademicYearId { get; set; }
        public long RoleId { get; set; }
        public long DepartmentId { get; set; }
        public string StudentMailId { get; set; }
        public string FirstName { get; set; }
        public string? Mobile { get; set; }
        public long createdBy { get; set; }
    }
}
