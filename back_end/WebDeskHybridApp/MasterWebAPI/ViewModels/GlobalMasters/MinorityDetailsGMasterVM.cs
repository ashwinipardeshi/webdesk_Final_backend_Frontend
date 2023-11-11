using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.GlobalMasters
{
    public class MinorityDetailsGMasterVM:CommonProps
    {
        [Required(ErrorMessage = "Minority Master Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Minority Master Id")]
        public long MinorityMasterId { get; set; }       
        public string? MinorityName { get; set; }  
    }
}
