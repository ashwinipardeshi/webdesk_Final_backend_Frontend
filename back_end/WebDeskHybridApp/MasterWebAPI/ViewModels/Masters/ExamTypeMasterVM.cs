using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.Masters
{
    public class ExamTypeMasterVM: CommonProps
    {
        [Required(ErrorMessage = "College Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid College Id")]
        public long CollegeId { get; set; }        
        public string? CollegeName { get; set; } = null!;
       
        [Required(ErrorMessage = "Please Enter Description")]      
        public string Description { get; set; } = null!;
    }
}
