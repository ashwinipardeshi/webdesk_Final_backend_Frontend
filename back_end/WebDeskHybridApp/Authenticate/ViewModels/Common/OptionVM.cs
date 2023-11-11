using System.ComponentModel.DataAnnotations;

namespace Authenticate.ViewModels.Common
{
    public class OptionVM
    {
        [Required]
        public long Id { get; set; }
        
        public string? Name { get; set; }
    }
}
