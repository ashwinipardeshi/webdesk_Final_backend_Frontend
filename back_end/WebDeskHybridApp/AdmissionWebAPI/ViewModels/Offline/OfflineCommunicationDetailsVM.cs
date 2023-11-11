using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineCommunicationDetailsVM : CommonProps
    {
        public long UserId { get; set; }

        [Required(ErrorMessage = "Enter The Name")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid College Id")]
        public long CollegeId { get; set; }

        [Required(ErrorMessage = "Enter The Name")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid AcademicYear Id")]
        public long AcademicYearId { get; set; }

        [Required(ErrorMessage = "Enter The Name")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid StudentAdmission Id")]
        public long StudentAdmissionId { get; set; }
        public string? PermanentFlatNo { get; set; }
        public string? PermanentBuildingName { get; set; }
        public int? PermanentPinCode { get; set; }
        public string? PermanentLandMark { get; set; }
        public long? PermanentCountryId { get; set; }
        public string? PermanentCity { get; set; }
        public long? PermanentStateId { get; set; }
        public long? PermanentDistrictId { get; set; }
        public long? PermanentTalukaId { get; set; }
        public string? CorrespondenceFlatNo { get; set; }
        public string? CorrespondenceBuildingName { get; set; }
        public int? CorrespondencePinCode { get; set; }
        public string? CorrespondenceLandMark { get; set; }
        public long? CorrespondenceCountryId { get; set; }
        public string? CorrespondenceCity { get; set; }
        public long? CorrespondenceStateId { get; set; }
        public long? CorrespondenceDistrictId { get; set; }
        public long? CorrespondenceTalukaId { get; set; }
    }
}
