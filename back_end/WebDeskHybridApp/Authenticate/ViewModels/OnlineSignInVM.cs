using System.ComponentModel.DataAnnotations;

namespace Authenticate.ViewModels
{
    public class OnlineSignInVM
    {
        [Required]
        public string? EmailId { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
