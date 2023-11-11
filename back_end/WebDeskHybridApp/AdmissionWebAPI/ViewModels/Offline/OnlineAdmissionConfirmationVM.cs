using System.ComponentModel.DataAnnotations;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OnlineAdmissionConfirmationVM
    {
        [Required(ErrorMessage = "Enter The Id..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid Student Admission Id")]
        public long OnlineStudentAdmissionId { get; set; }
        public long AdmissionCategoryId { get; set; }
        public long ApplicationStatusId { get; set; }       
        public string? AdmissionStatus { get; set; }
        public long ApplicationRejectReasonId { get; set; }
    }
}
