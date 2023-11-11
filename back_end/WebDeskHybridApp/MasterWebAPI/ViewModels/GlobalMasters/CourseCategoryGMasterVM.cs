using MasterWebAPI.ViewModels.Common;
using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.GlobalMasters
{
    public class CourseCategoryGMasterVM : CommonProps
    {
        [RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Description")]
        public string? Description { get; set; }
    }
}
