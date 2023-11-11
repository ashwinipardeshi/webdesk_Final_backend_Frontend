using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineDocumentListVM: CommonProps
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Enter The OnlineStudentAdmission Id..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid OnlineStudentAdmission Id")]
        public long OnlineStudentAdmissionId { get; set; }
        public long? DocumentId { get; set; }
        public string? DocumentPath { get; set; }
    }
}
