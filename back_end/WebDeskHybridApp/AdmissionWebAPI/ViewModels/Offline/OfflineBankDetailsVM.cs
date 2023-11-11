using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineBankDetailsVM : CommonProps
    {
        public long Id { get; set; }
        public long UserId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid StudentAdmission Id")]
        public long StudentAdmissionId { get; set; }
        public string? PersonType { get; set; }
        public string? AccountType { get; set; }
        public string? Ifsccode { get; set; }
        public string? BankName { get; set; }
        public string? BranchName { get; set; }
        public string? BranchCode { get; set; }
        public string? BankAddress { get; set; }
        public string? AccountNo { get; set; }
        public string? AccountHolderName { get; set; }
        public string? Micrcode { get; set; }
        public string? CanceledChequePath { get; set; }
        public bool? IsAccLinkedWithAadhar { get; set; }
    }
}
