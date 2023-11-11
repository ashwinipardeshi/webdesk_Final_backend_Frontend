using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineDocumentListVM: CommonProps
    {
        public long Id { get; set; }

        public long UserId { get; set; }

        [Required(ErrorMessage = "Enter The Name")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid College Id")]
        public long CollegeId { get; set; }

        [Required(ErrorMessage = "Enter The Name")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid AcademicYear Id")]
        public long? AcademicYearId { get; set; }

        public long StudentAdmissionId { get; set; }

        public long? DocumentId { get; set; }

        public string? DocumentPath { get; set; }
    }
}
