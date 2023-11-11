using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.Masters
{
    public class CollegeMasterVM: CommonProps
    {
       
        [Required(ErrorMessage = "Enter The Short Name"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Short Name")]
        public string ShortName { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Description"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Description")]
        public string Description { get; set; } = null!;

        [Required(ErrorMessage = "Enter The University"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid University")]
        public string University { get; set; } = null!;

        [Required(ErrorMessage = "Enter The University"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid University")]

        public string Category { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Address"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Address")]
        public string Address { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Website"), RegularExpression(@"((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)", ErrorMessage = "Not a valid website URL")]
        public string Website { get; set; } = null!;

        [Required(ErrorMessage = "Enter Email or Phone")]
        /* /<email-pattern>|<phone-pattern>/ */
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$|^\+?\d{0,2}\-?\d{4,5}\-?\d{5,6}", ErrorMessage = "Please enter a valid email address or phone number")]
        public string Email { get; set; } = null!;

        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^\(?([0-9]{2})[-. ]?([0-9]{4})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$", ErrorMessage = "Not a valid Phone number")]
        public string PhoneNo { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Contact Person name"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Contact Person ")]

        public string Cpname { get; set; } = null!;

        [Required(ErrorMessage = "Enter Cp email")]
        /* /<email-pattern>|<phone-pattern>/ */
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$|^\+?\d{0,2}\-?\d{4,5}\-?\d{5,6}", ErrorMessage = "Please enter a valid Cp email")]
        public string Cpemail { get; set; } = null!;

        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^\(?([0-9]{2})[-. ]?([0-9]{4})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$", ErrorMessage = "Not a valid Contact Person Mobile")]
        public string Cpmob { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Type"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Type")]
        public string Type { get; set; } = null!;
    }
}
