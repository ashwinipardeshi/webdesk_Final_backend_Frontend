using System.ComponentModel.DataAnnotations;

namespace Authenticate.ViewModels
{
    public class OnlineUserVM
    {
        public long Id { get; set; }

        [Required]
        public long RoleId { get; set; }
        [Required]
        public long CollegeId { get; set; }
        [Required]
        public long DepartmentId { get; set; }

        [Required]
        public long AcademicYearId { get; set; }

        public string Name { get; set; } = null!;

        public string EmailId { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Mobile { get; set; } = null!;

        public bool IsActive { get; set; } 

        public DateTime CreatedDate { get; set; }
    }
}
