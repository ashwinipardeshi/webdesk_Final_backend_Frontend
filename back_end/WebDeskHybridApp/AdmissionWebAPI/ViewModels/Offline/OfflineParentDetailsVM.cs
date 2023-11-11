using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineParentDetailsVM : CommonProps
    {
        public long Id { get; set; }
        public long UserId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid StudentAdmission Id")]
        public long StudentAdmissionId { get; set; }
        public int? Relation { get; set; }
        public string? LivingStatus { get; set; }
        public string? Title { get; set; }
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Qualification { get; set; }
        public string? Profession { get; set; }
        public string? EmployedIn { get; set; }
        public string? OrganizationName { get; set; }
        public string? Designation { get; set; }
        public string? Income { get; set; }
        public string? WhatsAppMobileNo { get; set; }
        public string? MobileNo { get; set; }
        public string? MailId { get; set; }
        public bool? IsDefaultCommunication { get; set; }
        public string? GuaradianRelation { get; set; }
        public string? GuaradianAddress { get; set; }
    }
}
