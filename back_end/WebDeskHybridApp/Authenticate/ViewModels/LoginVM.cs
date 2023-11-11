namespace Authenticate.ViewModels
{
    public class LoginVM
    {
        public long Id { get; set; }
        public long? RoleId { get; set; }
        public long? CollegeId { get; set; }
        public long? AcademicYearId { get; set; }
        public string? Name { get; set; }
        public long? DepartmentId { get; set; }
        public string? EmailId { get; set; }
        public string? Token { get; set; }
        public string? Mobile { get; set; }
        public DynamicMenuVM? DynamicMenu { get; set; }
        public bool IsUserMaster { get; set; }
    }
}
