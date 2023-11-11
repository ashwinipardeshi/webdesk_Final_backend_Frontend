using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace VendorMgtMVCApp.ViewModels
{
    public class VendorBanksMasterVM
    {
        public long Id { get; set; }

        [DisplayName("Vendor Names")]
        public long VendorMasterId { get; set; }

        public string? VendorName { get; set; }

        public long CollegeId { get; set; }

        public string? CollegeName { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}$", ErrorMessage = "Invalid Name")]
        [DisplayName("Bank Name")]
        public string Name { get; set; } = null!;

        [Required]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}$", ErrorMessage = "Invalid Branch Name")]
        [DisplayName("Branch Name")]
        public string BranchName { get; set; } = null!;

        [Required]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}$", ErrorMessage = "Invalid Account Name")]
        [DisplayName("Account Name")]
        public string AccountName { get; set; } = null!;

        [Required]
        [RegularExpression(@"^[a-zA-Z''-'.(),\s]{1,100}$", ErrorMessage = "Invalid Account Type")]
        [DisplayName("Account Type")]
        public string AccountType { get; set; } = null!;

        [Required]
        [RegularExpression(@"^[0-9]{1,20}$", ErrorMessage = "Invalid Account No")]
        [DisplayName("Account No.")]
        public string AccountNo { get; set; } = null!;

        [Required]
        [RegularExpression(@"^[0-9]{1,20}$", ErrorMessage = "Invalid IFSC")]
        [DisplayName("IFSC Code")]
        public string Ifsccode { get; set; } = null!;

        [DisplayName("Active Status")]
        public bool IsActive { get; set; }

        [DisplayName("Created By")]
        public long? CreatedBy { get; set; }

        [DisplayName("Created DateTime")]
        public DateTime? CreatedDate { get; set; }

        [DisplayName("Updated By")]
        public long? UpdatedBy { get; set; }

        [DisplayName("Updated DateTime")]
        public DateTime? UpdatedDate { get; set; }
    }
}
