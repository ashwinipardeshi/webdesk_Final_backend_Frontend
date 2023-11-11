using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace VendorMgtMVCApp.ViewModels
{
    public class VendorBillVM
    {
        public long Id { get; set; }
        public long VendorMasterId { get; set; }

        public string? VendorName { get; set; }

        public long CollegeId { get; set; }

        public string? CollegeName { get; set; }

        public long BankMasterId { get; set; }

        public string? BankName { get; set; }

        [DisplayName("FINAL BILL")]
        public bool FinalBill { get; set; }

        [DisplayName("ADVANCE BILL")]
        public bool AdvanceBill { get; set; }

        [Required(ErrorMessage = "Enter Bill Number")]
        public string BillNo { get; set; } = null!;

        [Required(ErrorMessage = "Enter Bill Date")]
        [DataType(DataType.DateTime)]
        public DateTime BillDate { get; set; }

        [Required(ErrorMessage = "Enter Inward Number")]
        public string InwardNo { get; set; } = null!;

        [Required(ErrorMessage = "Enter Inward Date")]
        [DataType(DataType.DateTime)]
        public DateTime InwardDate { get; set; }

        [Required(ErrorMessage = "Enter Basic Bill Amount")]
        public double BasicBillAmount { get; set; }

        [Required(ErrorMessage = "Enter Advance Amount Given")]
        public double AdvanceAmountGiven { get; set; }

        public double? Cgst { get; set; }

        public double? Sgst { get; set; }

        public double? Igst { get; set; }

        public double? Ugst { get; set; }

        public double? Gsttotal { get; set; }

        [Required(ErrorMessage = "Enter Total Bill Amount")]
        public double TotalBillAmount { get; set; }

        [Required(ErrorMessage = "Enter Advance")]
        public double Advance { get; set; }

        [Required(ErrorMessage = "Enter Balance")]
        public double Balance { get; set; }

        [Required(ErrorMessage = "Enter Tds")]
        public double Tds { get; set; }

        [Required(ErrorMessage = "Enter Section")]
        public string Section { get; set; } = null!;

        [Required(ErrorMessage = "Enter Tds amount")]
        public double Tdsamount { get; set; }

        [Required(ErrorMessage = "Enter Security Deposite")]
        public double SecurityDeposite { get; set; }

        [Required(ErrorMessage = "Enter OtherRecovery")]
        public double OtherRecovery { get; set; }

        [Required(ErrorMessage = "Enter Final Payable Amount")]
        public double FinalPayableAmount { get; set; }

        public long DebitAccountNumberId { get; set; }

        [Required(ErrorMessage = "Enter Your TAN")]
        public string Tan { get; set; } = null!;

        public string? Remark { get; set; } = null!;

        [DisplayName("Active Status")]
        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public long CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}
