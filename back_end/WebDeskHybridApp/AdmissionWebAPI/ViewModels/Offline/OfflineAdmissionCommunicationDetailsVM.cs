namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionCommunicationDetailsVM
    {
        public long StudentAdmissionId { get; set; }

        public long UserId { get; set; }    

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

        public string? LocalFlatNo { get; set; }

        public string? LocalBuildingName { get; set; }

        public long? LocalCountryId { get; set; }

        public string? LocalCity { get; set; }

        public long? LocalStateId { get; set; }

        public long? LocalDistrictId { get; set; }

        public long? LocalTalukaId { get; set; }

        public int? LocalPinCode { get; set; }

        public string? LocalLandMark { get; set; }

        public bool? IsPermanantCommunication { get; set; }

        public bool? IsCorrespondenceCommunication { get; set; }

        public bool? IsLocalCommunication { get; set; }

        public bool IsActive { get; set; }
    }
}
