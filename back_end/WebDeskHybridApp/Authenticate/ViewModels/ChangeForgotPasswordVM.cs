using System.ComponentModel.DataAnnotations;

namespace Authenticate.ViewModels
{
    public class ChangeForgotPasswordVM
    {
        public long? UserId { get; set; }    

        [Required(ErrorMessage = "Please Enter Your Password")]
        public string? NewPassword { get; set; }
    }
}
