using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.Masters
{
    public class SyllabusPatternMasterVM : CommonProps
    {
        [Required(ErrorMessage = "College Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid College Id")]
        public long CollegeId { get; set; }
        public string? CollegeName { get; set; }

        [Required(ErrorMessage = "Academic Master Id is  required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Academic Master Id")]
        public long AcademicMasterId { get; set; }
        public string? AcademicName { get; set; }

        [Required(ErrorMessage = "Program Master Id is  required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Program Master Id")]
        public long ProgramMasterId { get; set; }
        public string? ProgramMasterName { get; set; }
    }
}
