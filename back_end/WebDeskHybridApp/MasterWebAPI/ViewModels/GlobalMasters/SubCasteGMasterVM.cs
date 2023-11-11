using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.GlobalMasters
{
    public class SubCasteGMasterVM:CommonProps
    {
        [Required(ErrorMessage = "Caste Master Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Caste Master Id")]
        public long CasteMasterId { get; set; }
        public string? CasteName { get; set; }   
    }
}
