using VendorMgtWebAPI.Models;

namespace VendorMgtWebAPI.ViewModels
{
    public class VendorMasterVM
    {
        public long Id { get; set; }

        public long CollegeId { get; set; }

        public string Name { get; set; } = null!;

        public string Address { get; set; } = null!;

        public string ContactNo { get; set; } = null!;

        public string Gstno { get; set; } = null!;

        public string Pan { get; set; } = null!;

        public string Tan { get; set; } = null!;

        public string? EmailId { get; set; }

        public string? Website { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public long CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

  //      public virtual IList<VendorBanksMasterVM> VendorBanksMasters { get; set; } = new List<VendorBanksMasterVM>();

    //    public virtual IList<VendorBillVM> VendorBills { get; set; } = new List<VendorBillVM>();
    }
}
