using MasterWebAPI.ViewModels.Common;
using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.GlobalMasters
{
    public class CommonSubjectListGMasterVM : CommonProps
    {
        [Required(ErrorMessage = "Enter The Type"), RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Type")]
        public string Type { get; set; } = null!;
    }
}
