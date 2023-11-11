using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineStudAdmissionAYDetailInsertVM :CommonProps
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid AcademicYear Id")]
        public long AcademicYearId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid ProgramYear Id")]
        public long? ProgramYearId { get; set; }

        [Required(ErrorMessage = "Enter The Value")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid Branch Id")]
        public long? BranchId { get; set; }
        public long? AcademicStatusId { get; set; }
        public long? AdmissionCategoryId { get; set; }
        public long? AnnualIncomeId { get; set; }
        public string? ReasonOfAcademicStatus { get; set; }
        public long? ProgramId { get; set; }
        public int? ExamStatus { get; set; }
        public int? PassoutStatus { get; set; }
    }
}
