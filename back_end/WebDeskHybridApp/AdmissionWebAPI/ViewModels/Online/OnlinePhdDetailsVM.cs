using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlinePhdDetailsVM : CommonProps
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Enter The OnlineStudentAdmission Id..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid OnlineStudentAdmission Id")]
        public long OnlineStudentAdmissionId { get; set; }
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
