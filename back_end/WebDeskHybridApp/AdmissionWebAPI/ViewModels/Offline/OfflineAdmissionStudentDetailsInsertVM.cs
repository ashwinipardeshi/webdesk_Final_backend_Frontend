using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionStudentDetailsInsertVM:CommonProps
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        
        [Required(ErrorMessage = "Enter The Value..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid College Id")]
        public long CollegeId { get; set; }

        [Required(ErrorMessage = "Enter The Value..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid AcademicYear Id")]
        public long AcademicYearId { get; set; }
        public string Title { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string? MiddleName { get; set; }
        public string? NameAsMarkSheet { get; set; }
        public string? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public long? SeatTypeId { get; set; }
        public long? DomicileId { get; set; }
        public long? ReligionId { get; set; }
         public long? StudentCodeId { get; set; }
        public string? StudentCode { get; set; }
        public long? AllotmentCategory { get; set; }
        public long? StudentCategoryId { get; set; }
        public DateTime? AdmisssionDate { get; set; }

        [Required(ErrorMessage = "Enter The Value..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid AdmittedThrough Id")]
        public long? AdmittedThrough { get; set; }

        [Required(ErrorMessage = "Please Enter The Student MailId..")]
        public string? StudentMailId { get; set; }
        public string? MobileNo { get; set; }
        public string? Region { get; set; }
        public string? DrivingLicenceNo { get; set; }
        public bool? IsPermanantCommunication { get; set; }
        public bool? IsCorrespondenceCommunication { get; set; }
        public bool? IsLocalCommunication { get; set; }
        public string? ParentMailId { get; set; }
        public string? ParentMobileNo { get; set; }
    }
}
