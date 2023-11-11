using System.ComponentModel.DataAnnotations;

namespace VendorMgtWebAPI.ViewModels.Common
{
    public class CommonProps 
    {
        [Required, Range(typeof(bool), "false", "true", ErrorMessage = "IsActive Field is required")]
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
