using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.GlobalMasters
{
    public class StateGMasterVM:CommonProps
    {
        [Required(ErrorMessage = "Minority Country Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid Country Id")]
        public long CountryId { get; set; }
        public string? CountryName { get; set; }        
    }
}
