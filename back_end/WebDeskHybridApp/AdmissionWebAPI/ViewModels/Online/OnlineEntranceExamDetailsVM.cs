using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineEntranceExamDetailsVM : CommonProps
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Enter The OnlineStudentAdmission Id..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid OnlineStudentAdmission Id")]
        public long OnlineStudentAdmissionId { get; set; }
        public string? EntranceType { get; set; }
        public string? RollNumber { get; set; }
        public double? PhysicsMarks { get; set; }
        public double? ChemistryMarks { get; set; }
        public double? MathsMarks { get; set; }
        public double? TotalMarks { get; set; }
    }
}
