using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.Common
{
    public class OptionVM
    {
        public long Id { get; set; }
       
        [Required(ErrorMessage = "Enter The Name"),RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Name")]      
        public string? Name { get; set; }
    }
}
