using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.Common
{
    public class CommonProps: OptionVM
    {
        [Required, Range(typeof(bool), "false", "true", ErrorMessage = "IsActive Field is required")]
        public bool IsActive { get; set; }       
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
