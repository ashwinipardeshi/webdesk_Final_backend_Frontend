using MasterWebAPI.ViewModels.Common;
using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.Masters
{
    public class ProgramMasterVM : CommonProps
    {
        [Required(ErrorMessage = "College Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid College Id")]
        public long CollegeId { get; set; }
        public string? CollegeName { get; set; }

        [Required(ErrorMessage = "Program Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Program Id")]
        public long ProgramTypeId { get; set; }
        public string? ProgramTypeName { get; set; }

        [Required(ErrorMessage = "Stream Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Stream Id")]
        public long StreamId { get; set; }
        public string? StreamName { get; set; }

        [Required(ErrorMessage = "Enter The Short Name"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Short Name")]
        public string ShortName { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Description"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Description")]
        public string Description { get; set; } = null!;
    }
}
