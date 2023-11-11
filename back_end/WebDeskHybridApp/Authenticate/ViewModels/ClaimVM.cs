namespace Authenticate.ViewModels
{
    public class ClaimVM
    {
        public long Id { get; set; }
        public long? RoleId { get; set; }
        public long? CollegeId { get; set; }
        public long? AcademicYearId { get; set; }
        public long? DepartmentId { get; set; }
        public string? ipAddress { get; set;}
    }
}
