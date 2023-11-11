namespace VendorMgtWebAPI.ViewModels
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

      //  public string? BillType { get; set; } = null!;

        public bool FinalBill { get; set; }

        public bool AdvanceBill { get; set; }

        public string BillNo { get; set; } = null!;

        public DateTime BillDate { get; set; }

        public string InwardNo { get; set; } = null!;

        public DateTime InwardDate { get; set; }

        public double BasicBillAmount { get; set; }

        public double? AdvanceAmountGiven { get; set; }

        public double? Cgst { get; set; }

        public double? Sgst { get; set; }

        public double? Igst { get; set; }

        public double? Ugst { get; set; }

        public double? Gsttotal { get; set; }

        public double TotalBillAmount { get; set; }

        public double Advance { get; set; }

        public double Balance { get; set; }

        public double Tds { get; set; }

        public string Section { get; set; } = null!;

        public double Tdsamount { get; set; }

        public double SecurityDeposite { get; set; }

        public double OtherRecovery { get; set; }

        public double FinalPayableAmount { get; set; }

        public long DebitAccountNumberId { get; set; }

        public string Tan { get; set; } = null!;

        public string Remark { get; set; } = null!;

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public long CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
}
