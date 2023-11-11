using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineBankDetailsVM : CommonProps
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Enter The OnlineStudentAdmission Id..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid OnlineStudentAdmission Id")]
        public long OnlineStudentAdmissionId { get; set; }
        public string? PersonType { get; set; } = null!;
        public string? AccountType { get; set; } = null!;       
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
