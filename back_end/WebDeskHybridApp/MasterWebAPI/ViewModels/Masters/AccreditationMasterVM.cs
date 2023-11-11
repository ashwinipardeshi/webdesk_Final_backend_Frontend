using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.Masters
{
    public class AccreditationMasterVM : CommonProps
    {
        [Required(ErrorMessage = "College Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid College Id")]
        public long CollegeId { get; set; }
        public string? CollegeName { get; set; }

        [Required(ErrorMessage = " Stream Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Stream Id")]
        public long StreamId { get; set; }
        public string? StreamName { get; set; }

        [Required(ErrorMessage = "Year is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Year")]
        public int Year { get; set; }

        [Required(ErrorMessage = "Enter The Grade"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Grade")]
        public string Grade { get; set; } = null!;

        [Required, DataType(DataType.Date)]
        public DateTime VaildTill { get; set; }        
    }
}
