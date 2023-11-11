using System.ComponentModel.DataAnnotations;

namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineAdmissionCommunicationDetailsVM
    {
        [Required(ErrorMessage = "Enter The OnlineUser Id..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid OnlineUser Id")]
        public long OnlineUserId { get; set; }

        [Required(ErrorMessage = "Enter The OnlineStudentAdmission Id..")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid OnlineStudentAdmission Id")]
        public long OnlineStudentAdmissionId { get; set; }
        public string? PermanentFlatNo { get; set; }
        public string? PermanentBuildingName { get; set; }
        public int? PermanentPinCode { get; set; }
        public string? PermanentLandMark { get; set; }
        public string? PermanentAddressMigration { get; set; }
        public long? PermanentCountryId { get; set; }
        public string? PermanentCity { get; set; }
        public long? PermanentStateId { get; set; }
        public long? PermanentDistrictId { get; set; }
        public long? PermanentTalukaId { get; set; }
        public string? CorrespondenceFlatNo { get; set; }
        public string? CorrespondenceBuildingName { get; set; }
        public int? CorrespondencePinCode { get; set; }
        public string? CorrespondenceLandMark { get; set; }
        public string? CorrespondenceAddressMigration { get; set; }
        public long? CorrespondenceCountryId { get; set; }
        public string? CorrespondenceCity { get; set; }
        public long? CorrespondenceStateId { get; set; }
        public long? CorrespondenceDistrictId { get; set; }
        public long? CorrespondenceTalukaId { get; set; }
        public bool IsActive { get; set; }
    }
}
