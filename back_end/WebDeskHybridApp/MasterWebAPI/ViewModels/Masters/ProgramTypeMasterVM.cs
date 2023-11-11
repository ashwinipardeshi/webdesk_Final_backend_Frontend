using MasterWebAPI.ViewModels.Common;
using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.Masters
{
    public class ProgramTypeMasterVM : CommonProps
    {
        [Required(ErrorMessage = "College Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid College Id")]
        public long CollegeId { get; set; }
        public string? CollegeName { get; set; }

        [Required(ErrorMessage = "Enter The Description"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Description")]
        public string Description { get; set; } = null!;
    }
}
