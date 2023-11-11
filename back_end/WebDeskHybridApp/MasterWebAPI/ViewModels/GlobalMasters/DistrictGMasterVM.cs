using MasterWebAPI.ViewModels.Common;
using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.GlobalMasters
{
    public class DistrictGMasterVM: CommonProps
    {        
        [Required(ErrorMessage = "State Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid State Id")]
        public long StateId { get; set; }       
        public string? StateName { get; set; }
    }
}
