using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionStudentDetailsVM:CommonProps
    {
        public long StudentAdmissionId { get; set; }

        public long UserId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid College Id")]
        public long CollegeId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid AcademicYear Id")]
        public long AcademicYearId { get; set; }

        public long? DomicileId { get; set; }

        public long? ReligionId { get; set; }

        public long? StudentCategoryId { get; set; }

        public long? CasteId { get; set; }

        public long? SubCasteId { get; set; }

        public long? MinorityId { get; set; }

        public long? MinorityDetailsId { get; set; }

        public string Title { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Name")]
        [RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid Last Name")]
        public string LastName { get; set; } = null!;

        [Required(ErrorMessage = "Enter The Name")]
        [RegularExpression(@"^((?!string).)*$", ErrorMessage = "Please Enter Valid First Name")]
        public string FirstName { get; set; } = null!;

        public string? MiddleName { get; set; }

        public string? NameAsMarkSheet { get; set; }

        public DateTime? AdmisssionDate { get; set; }

        public string? Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public int? PlaceOfBirth { get; set; }

        public string? MaritalStatus { get; set; }

        public int? BloodGroup { get; set; }

        public int? ChildNoInFamily { get; set; }

        public byte? NoOfSiblings { get; set; }

        public string? MotherTounge { get; set; }

        public string? Nationality { get; set; }

        public string? StudentMailId { get; set; }

        public string? AadharNo { get; set; }

        public string? PanNo { get; set; }

        public string? VoterId { get; set; }

        public string? MobileNo { get; set; }

        public string? WhatsAppMobileNo { get; set; }

        public bool? PhysicallyChallaged { get; set; }

        public int? DisabilityType { get; set; }

        public bool? IsMinority { get; set; }

        public string? EmergencyContactNo { get; set; }

        public string? LanguageKnown { get; set; }

        public string? PassportNo { get; set; }

        public bool? IsDefenceParent { get; set; }

        public string? DefenceType { get; set; }

        public string? Region { get; set; }

        public string? DrivingLicenceNo { get; set; }
      
        public DateTime? PassportExpiryDate { get; set; }

        public long? AnnualIncomeId { get; set; }
    }
}