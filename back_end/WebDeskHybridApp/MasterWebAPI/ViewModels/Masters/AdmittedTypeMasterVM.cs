using MasterWebAPI.ViewModels.Common;
using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.Masters
{
    public class AdmittedTypeMasterVM :CommonProps
    {
        [Display(Name = "College Id")]
        [Required(ErrorMessage = "College Id is required.")]
        public long CollegeId { get; set; }
        public string? CollegeName { get; set; }
    }
}
