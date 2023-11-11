using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.Masters
{
    public class AcademicYearMasterVM 
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Enter The Name"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Name")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "College Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid College Id")]
        public long CollegeId { get; set; }
        public string? CollegeName { get; set; } = null!;

        [Required(ErrorMessage = "Stream Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Stream Id")]
        public long StreamId { get; set; }
        public string? StreamName { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Description"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Description")]
        public string Description { get; set; } = null!;

        [Required, DataType(DataType.Date)]
        public DateTime StartYear { get; set; }

        [Required, DataType(DataType.Date)]
        public DateTime EndYear { get; set; }

        [Required, Range(typeof(bool), "false", "true", ErrorMessage = "IsActive Field is required")]
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
