using System.ComponentModel.DataAnnotations;

namespace Authenticate.ViewModels
{
    public class SignInVM
    {
        [Required]
        public string? EmailId { get; set; }

        [Required]
        public string? Password { get; set; }

        public string? IPAddress { get; set; }
    }
}
