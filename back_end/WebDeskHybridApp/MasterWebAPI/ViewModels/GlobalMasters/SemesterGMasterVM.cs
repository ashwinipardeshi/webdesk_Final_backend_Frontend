using System.ComponentModel.DataAnnotations;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.ViewModels.GlobalMasters
{
    public class SemesterGMasterVM : CommonProps
    {
        [Required(ErrorMessage = "SortOrder is required."), RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Enter Valid SortOrder")]
        public int SortOrder { get; set; }
    }
}
