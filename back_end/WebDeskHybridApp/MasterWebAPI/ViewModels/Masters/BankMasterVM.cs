using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.Masters
{
    public class BankMasterVM: CommonProps
    {
        [Required(ErrorMessage = "College Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid College Id")]
        public long CollegeId { get; set; }
        public string? CollegeName { get; set; }= null!;

        [Required(ErrorMessage = "Enter The A/c type"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid A/c type")]
        public string Actype { get; set; } = null!;

        [Required, MinLength(11, ErrorMessage = "Account number should be greater than 11 characters"),
        RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Account number")]
        public string Acnumber { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Acount Holder Name"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Acount Holder Name")]
        public string AcholderName { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Acount Branch Name"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Acount Branch Name")]
        public string BranchName { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Acount Branch Address"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Acount Branch Address")]
        public string BranchAddress { get; set; } = null!;

        [Required(ErrorMessage = "Enter The IFSC Code"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid IFSC Code")]      
        public string Ifsc { get; set; } = null!;

        [Required(ErrorMessage = "Enter The MICR Code"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid MICR Code")]
        public string Micr { get; set; } = null!;        
    }
}
