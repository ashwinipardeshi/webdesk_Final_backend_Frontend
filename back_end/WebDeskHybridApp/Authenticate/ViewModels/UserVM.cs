namespace Authenticate.ViewModels
{
    public class UserVM
    {
        public long Id { get; set; }

        public long RoleId { get; set; }

        public long CollegeId { get; set; }

        public long DepartmentId { get; set; }

        public long? AcademicYearId { get; set; }

        public string Name { get; set; } = null!;

        public string? Mobile { get; set; }

        public string EmailId { get; set; } = null!;

        public string Password { get; set; } = null!;   
        
        public bool IsActive { get; set; }

        public long CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}
