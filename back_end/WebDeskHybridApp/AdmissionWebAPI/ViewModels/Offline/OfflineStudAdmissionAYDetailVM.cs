using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineStudAdmissionAYDetailVM : CommonProps
    {
        public long UserId { get; set; }
        public long StudentAdmissionId { get; set; }

        [Required(ErrorMessage = "Enter The Name..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid AcademicYear Id")]
        public long AcademicYearId { get; set; }
        public long? ProgramYearId { get; set; }
        public long? ProgramId { get; set; }
        public long? BranchId { get; set; }
        public long? AcademicStatusId { get; set; }
        public string? ReasonOfAcademicStatus { get; set; }
        public long? AdmissionCategoryId { get; set; }
        public int? ExamStatus { get; set; }
        public int? PassoutStatus { get; set; }
    }
}
