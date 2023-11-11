using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.GlobalMasters
{
    public class TalukaGMasterVM: CommonProps
    {
        [Required(ErrorMessage = "District Master Id is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid District Master Id")]
        public long DistrictId { get; set; }       
        public string? DistrictName { get; set; } 
    }
}
