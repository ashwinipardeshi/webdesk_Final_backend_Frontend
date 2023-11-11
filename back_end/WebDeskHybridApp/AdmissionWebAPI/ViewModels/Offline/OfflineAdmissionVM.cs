using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Offline
{
    public class OfflineAdmissionVM:CommonProps
    {
        public virtual OfflineStudAdmissionAYDetailInsertVM? offlineStudAdmissionAYDetailInsertVM { get; set; }
        public virtual IList<OfflineParentDetailsVM>? offlineParentDetailsVMList { get; set; } = new List<OfflineParentDetailsVM>();
        public virtual IList<OfflinePreviousAcademicDetailsVM>? offlinePreviousAcademicDetailsVMList { get; set; } = new List<OfflinePreviousAcademicDetailsVM>();
       
        public virtual IList<OfflineHscmarkDetailVM?> offlineHscmarkDetailVMList { get; set; } = new List<OfflineHscmarkDetailVM>();
        public virtual IList<OfflineEntranceExamDetailsVM>? offlineEntranceExamDetailsVMList { get; set; } = new List<OfflineEntranceExamDetailsVM>();
        public virtual IList<OfflineBankDetailsVM>? offlineBankDetailsVMList { get; set; } = new List<OfflineBankDetailsVM>();
        public virtual IList<OfflineDocumentListVM>? offlineDocumentListVMList { get; set; } = new List<OfflineDocumentListVM>();
        public virtual IList<OfflineInsuranceDetailsVM>? offlineInsuranceDetailsVMList { get; set; } = new List<OfflineInsuranceDetailsVM>();
        public virtual IList<OfflineVehicleInformationsVM>? offlineVehicleInformationsVMList { get; set; } = new List<OfflineVehicleInformationsVM>();
        public long Id { get; set; }
        public long UserId { get; set; }

        [Required(ErrorMessage = "Enter The Name")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid College Id")]
        public long CollegeId { get; set; }

        [Required(ErrorMessage = "Enter The Name")]
        [RegularExpression(@"^[1-9][0-9]*$", ErrorMessage = "Please Enter Valid AcademicYear Id")]
        public long AcademicYearId { get; set; }

        public string? CollegeName { get; set; }

        public string? ApplicationFor { get; set; }

        public long? AdmissionTypeId { get; set; }

        public long? SeatTypeId { get; set; }

        public long? CandidatureTypeId { get; set; }

        public long? DomicileId { get; set; }

        public long? ReligionId { get; set; }

        public long? StudentCategoryId { get; set; }

        public long? CasteId { get; set; }

        public long? SubCasteId { get; set; }

        public long? MinorityId { get; set; }

        public long? MinorityDetailsId { get; set; }

        public long? PermanentCountryId { get; set; }

        public string? PermanentCity { get; set; }

        public long? PermanentStateId { get; set; }

        public long? PermanentDistrictId { get; set; }

        public long? PermanentTalukaId { get; set; }

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

        public string StudentCode { get; set; } = null!;

        public string? Prnno { get; set; }

        public string? StateMeritListNo { get; set; }

        public string? NationalMeritListNo { get; set; }

        public string? StateMeritMarks { get; set; }

        public string? NationalMeritMarks { get; set; }

        public string? DteapplicationNo { get; set; }

        public string? HomeUniversity { get; set; }

        public string? MahaDbtApplicationNo { get; set; }

        public long? ModeOfAdmission { get; set; }

        public string? EligiblityNo { get; set; }

        public long? AllotmentCategory { get; set; }

        public long? BelongCaste { get; set; }

        public long? AdmittedThrough { get; set; }

        public string? Grno { get; set; }

        public string? Title { get; set; }

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

        public string? TalukaOfBirth { get; set; }

        public string? MaritalStatus { get; set; }

        public long? BloodGroup { get; set; }

        public int? ChildNoInFamily { get; set; }

        public byte? NoOfSiblings { get; set; }

        public string? MotherTounge { get; set; }

        public string? Nationality { get; set; }

        public string? StudentMailId { get; set; }

        public string? AlternateMailId { get; set; }

        public string? AadharNo { get; set; }

        public string? PanNo { get; set; }

        public bool? IsRegisteredWithElection { get; set; }

        public string? VoterId { get; set; }

        public string? MobileNo { get; set; }

        public string? WhatsAppMobileNo { get; set; }

        public bool? PhysicallyChallaged { get; set; }

        public long? DisabilityType { get; set; }

        public bool? IsMinority { get; set; }

        public string? AlternateMobileNo { get; set; }

        public string? EmergencyContactNo { get; set; }

        public string? LanguageKnown { get; set; }

        public string? PassportNo { get; set; }

        public DateTime? PassportExpiryDate { get; set; }

        public bool? IsEmployeed { get; set; }

        public bool? IsGapInEducation { get; set; }

        public int? NoOfYearsInGap { get; set; }

        public bool? IsGraduationResultDeclare { get; set; }

        public bool? IsDefenceParent { get; set; }

        public string? DefenceType { get; set; }

        public string? StudentImage { get; set; }

        public string? StudentSignature { get; set; }

        public string? ChoiceCode { get; set; }

        public string? Region { get; set; }

        public string? PermanentFlatNo { get; set; }

        public string? PermanentBuildingName { get; set; }

        public int? PermanentPinCode { get; set; }

        public string? PermanentLandMark { get; set; }

        public string? PermanentAddressMigration { get; set; }

        public string? CorrespondenceBuildingName { get; set; }

        public string? CorrespondenceFlatNo { get; set; }

        public int? CorrespondencePinCode { get; set; }

        public string? CorrespondenceLandMark { get; set; }

        public string? CorrespondenceAddressMigration { get; set; }

        public bool? IsProfileComplete { get; set; }

        public string? DrivingLicenceNo { get; set; }

        public bool? IsPermanantCommunication { get; set; }

        public bool? IsCorrespondenceCommunication { get; set; }

        public bool? IsLocalCommunication { get; set; }

        public string? ParentMailId { get; set; }

        public string? ParentMobileNo { get; set; }

    }
}
