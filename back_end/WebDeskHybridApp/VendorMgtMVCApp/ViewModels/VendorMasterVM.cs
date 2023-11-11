using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace VendorMgtMVCApp.ViewModels
{
    public class VendorMasterVM
    {
        public long Id { get; set; }

        public long CollegeId { get; set; }

        public string? CollegeName { get; set; }

        [Required]
        [DisplayName("Name")]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}$", ErrorMessage = "Invalid Vendor Name")]
        public string Name { get; set; } = null!;

        [Required]
        [DisplayName("Address")]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}$", ErrorMessage = "Invalid Address")]
        public string Address { get; set; } = null!;

        [Required]
        [DisplayName("Contact No")]
        [RegularExpression(@"^[0-9]{1,13}$", ErrorMessage = "Invalid ContactNo")]
        public string ContactNo { get; set; } = null!;

        [Required]
        [DisplayName("GST No")]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}[0-9]{1,13}$", ErrorMessage = "Invalid  GstNo")]
        public string Gstno { get; set; } = null!;

        [Required]
        [DisplayName("PAN")]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}[0-9]{1,13}$", ErrorMessage = "Invalid  Pan")]
        public string Pan { get; set; } = null!;

        [Required]
        [DisplayName("TAN")]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}[0-9]{1,13}$", ErrorMessage = "Invalid  Tan")]
        public string Tan { get; set; } = null!;

        [Required]
        [DisplayName("Email ID")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Invalid Email")]
        public string? EmailId { get; set; }

        [Required]
        [DisplayName("Website")]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}$", ErrorMessage = "Invalid Website")]
        public string? Website { get; set; }

        [DisplayName("Active Status")]
        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public long CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

     //   public virtual IList<VendorBanksMasterVM> VendorBanksMasters { get; set; } = new List<VendorBanksMasterVM>();

      //  public virtual IList<VendorBillVM> VendorBills { get; set; } = new List<VendorBillVM>();
    }
}
