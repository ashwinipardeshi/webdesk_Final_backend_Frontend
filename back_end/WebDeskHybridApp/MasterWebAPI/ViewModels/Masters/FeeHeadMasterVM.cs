using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.Masters
{
    public class FeeHeadMasterVM: CommonProps
    {
        [Required(ErrorMessage = "College Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid College Id")]
        public long CollegeId { get; set; }
        public string?CollegeName { get; set; } = null!;

        [Required(ErrorMessage = "FeeHead Type Master Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid FeeHead Type Master Id")]
        public long FeeHeadTypeMasterId { get; set; }

        [Required(ErrorMessage = "Fees are required.")]
        public decimal Fees { get; set; }

        [Required(ErrorMessage = "FeeHead Description is required."), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Enter Valid Description")]
        public string Description { get; set; } = null!;        
    }
}
