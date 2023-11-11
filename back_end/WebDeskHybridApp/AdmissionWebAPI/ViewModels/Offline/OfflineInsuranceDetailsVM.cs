using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineInsuranceDetailsVM : CommonProps
    {
        public long Id { get; set; }
        public long UserId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid StudentAdmission Id")]
        public long StudentAdmissionId { get; set; }
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? Relation { get; set; }
        public string? StudentParentBeneficiary { get; set; }
        public string? StudentParentBenefit { get; set; }

        [Required(ErrorMessage = "Enter The Value..")]
        [RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Sum Insured")]
        public string SumInsured { get; set; } = null!;
        public double? InsurancePremium { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? Age { get; set; }
        public string? AadharNo { get; set; }
    }
}
