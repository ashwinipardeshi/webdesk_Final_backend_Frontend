using System.ComponentModel.DataAnnotations;

namespace Authenticate.ViewModels
{
    public class ChangePasswordVM
    {
        public long userId { get; set; }       

        [Required]
        public string Password { get; set; }

        [Required]
        public string NewPassword { get; set; }
     
    }
}
