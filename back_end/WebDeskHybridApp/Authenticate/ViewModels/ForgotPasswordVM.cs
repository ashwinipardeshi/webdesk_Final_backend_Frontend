using System.ComponentModel.DataAnnotations;

namespace Authenticate.ViewModels
{
    public class ForgotPasswordVM
    {
        [Required]
        public string? EmailId { get; set; }        

    }
}
