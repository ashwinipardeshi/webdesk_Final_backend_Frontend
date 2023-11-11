using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionStudentProgramDetailsVM:CommonProps
    {
        public long StudentAdmissionId { get; set; }
        public long? UserId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid College Id")]
        public long CollegeId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid Academic Year Id")]
        public long AcademicYearId { get; set; }

        public long? SeatTypeId { get; set; }

        public long? CandidatureTypeId { get; set; }

        public string StudentCode { get; set; } = null!;
        public string? Prnno { get; set; }
        public string? StateMeritListNo { get; set; }
        public string? NationalMeritListNo { get; set; }
        public long? AdmittedThrough { get; set; }
        public DateTime? AdmisssionDate { get; set; }
        public string? StateMeritMarks { get; set; }
        public string? NationalMeritMarks { get; set; }
        public long? DomicileId { get; set; }
        public string? MahaDbtApplicationNo { get; set; }
        public long? ModeOfAdmission { get; set; }
        public string? EligiblityNo { get; set; }
        public long? ReligionId { get; set; }
        public long? StudentCategoryId { get; set; }
        public long? CasteId { get; set; }
        public long? SubCasteId { get; set; }
        public long? MinorityId { get; set; }
        public long? MinorityDetailsId { get; set; }          
        public string? Region { get; set; }

    }
}
