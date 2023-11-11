using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflinePhdDetailsVM : CommonProps
    {
        public long Id { get; set; }
        public long UserId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid StudentAdmission Id")]
        public long StudentAdmissionId { get; set; }
        public long? Faculty { get; set; }
        public string? Subject { get; set; }
        public string? ResearchTopic { get; set; }
        public string? PresentOccupationOrEmployment { get; set; }
        public string? EmploymentName { get; set; }
        public string? EmploymentAddress { get; set; }
        public string? ProfessionalExperienceNature { get; set; }
        public string? InstituteOfProfessionalExp { get; set; }
        public string? ProfessionaExpPeriod { get; set; }
        public string? MphilDissertationTitle { get; set; }
        public bool? IsProposalTopicRelateMphil { get; set; }
        public string? ReasearchGuideName { get; set; }
        public string? CoGuideName { get; set; }
        public string? ApprovedName { get; set; }
        public string? AddressOfApproved { get; set; }
        public string? ResearchPlace { get; set; }
    }
}
