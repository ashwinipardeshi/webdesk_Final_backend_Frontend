using System.ComponentModel.DataAnnotations;
using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.ViewModels.Online
{
    public class OnlineAdmissionODataVM : CommonProps
    {
        public long Id { get; set; }

        public long OnlineUserId { get; set; }

        public long CollegeId { get; set; }

        public string? CollegeName { get; set; }

        public long AcademicYearId { get; set; }

        public string? AcademicYearName { get; set; }

        public string? ApplicationFor { get; set; }

        public long? AdmissionTypeId { get; set; }

        public string? ApplicationTypeName { get; set; }

        public long? SeatTypeId { get; set; }

        public string? SeatTypeName { get; set; }

        public long? CandidatureTypeId { get; set; }

        public string? CandidatureTypeName { get; set; }

        public long? DomicileId { get; set; }

        public string? DomicileName { get; set; }

        public long? ReligionId { get; set; }

        public string? ReligionName { get; set; }

        public long? StudentCategoryId { get; set; }

        public string? StudentCategoryName { get; set; }

        public long? CasteId { get; set; }

        public string? CasteName { get; set; }

        public long? SubCasteId { get; set; }

        public string? SubCasteName { get; set; }

        public long? MinorityId { get; set; }

        public string? MinorityName { get; set; }

        public long? MinorityDetailsId { get; set; }

        public string? MinorityDetailsName { get; set; }

        public long? StudentAdmissionId { get; set; }

        public string? StudentAdmissionName { get; set; }

        public long? ProgramYearId { get; set; }

        public string? ProgramYearName { get; set; }

        public long? BranchId { get; set; }

        public long? ProgramMasterId { get; set; }

        public string? ProgramMasterName { get; set; }

        public string? BranchName { get; set; }

        public long? AcademicStatusId { get; set; }

        public string? AcademicStatusName { get; set; }

        //public long? PayingCategoryId { get; set; }

        public string? PayingCategoryName { get; set; }

        public long? AnnualIncomeId { get; set; }

        public string? AnnualIncomeName { get; set; }

        public string? StudentCode { get; set; }

        public string? Prnno { get; set; }

        public string? StateMeritListNo { get; set; }

        public string? NationalMeritListNo { get; set; }

        public string? StateMeritMarks { get; set; }

        public string? NationalMeritMarks { get; set; }

        public string? DteapplicationNo { get; set; }

        public string? HomeUniversity { get; set; }

        public string? MahaDbtApplicationNo { get; set; }

        public long? ModeOfAdmission { get; set; }

        public string? ModeOfAdmissionName { get; set; }

        public long? AllotmentCategory { get; set; }

        public string? AllotmentCategoryName { get; set; }

        public long? BelongCaste { get; set; }

        public string? BelongCasteName { get; set; }

        public long? AdmittedThrough { get; set; }

        public string? AdmittedThroughName { get; set; }

        public string? Grno { get; set; }

        public string? Title { get; set; }

        public string LastName { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string? MiddleName { get; set; }

        public string? NameAsMarkSheet { get; set; }

        public string? Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public int? PlaceOfBirth { get; set; }

        public string? TalukaOfBirth { get; set; }

        public string? MaritalStatus { get; set; }

        public long? BloodGroup { get; set; }

        public string? BloodGroupName { get; set; }

        public int? ChildNoInFamily { get; set; }

        public string? MotherTounge { get; set; }

        public string? Nationality { get; set; }

        public string? StudentMailId { get; set; }

        public string? AlternateMailId { get; set; }

        public string? AadharNo { get; set; }

        public string? PanNo { get; set; }

        public bool? IsRegisteredWithElection { get; set; }

        public string? VoterId { get; set; }

        public string? MobileNo { get; set; }

        public bool? PhysicallyChallaged { get; set; }

        public long? DisabilityType { get; set; }

        public string? DisabilityTypeName { get; set; }

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

        public string? Region { get; set; }

        public long? ApplicationNoId { get; set; }

        public string? ApplicationNo { get; set; }

        public string? AdmissionStatus { get; set; }

        public long? ApplicationRejectReasonId { get; set; }

        public string? ApplicationRejectReasonName { get; set; }

        public bool? IsHardCopySubmitted { get; set; }

        public bool? IsProfileComplete { get; set; }

        public string? ReasonOfAcademicStatus { get; set; }

        public long? ApplicationStatusId { get; set; }

        public string? ApplicationStatusName { get; set; }

        // Communication

        public long? PermanentCountryId { get; set; }

        public string? PermanentCountryName { get; set; }

        public string? PermanentCity { get; set; }

        public long? PermanentStateId { get; set; }

        public string? PermanentStateName { get; set; }

        public long? PermanentDistrictId { get; set; }

        public string? PermanentDistrictName { get; set; }

        public long? PermanentTalukaId { get; set; }

        public string? PermanentTalukaName { get; set; }

        public string? PermanentFlatNo { get; set; }

        public string? PermanentBuildingName { get; set; }

        public int? PermanentPinCode { get; set; }

        public string? PermanentLandMark { get; set; }

        public string? PermanentAddressMigration { get; set; }

        public long? CorrespondenceCountryId { get; set; }

        public string? CorrespondenceCountryName { get; set; }

        public string? CorrespondenceCity { get; set; }

        public long? CorrespondenceStateId { get; set; }

        public string? CorrespondenceStateName { get; set; }

        public long? CorrespondenceDistrictId { get; set; }

        public string? CorrespondenceDistrictName { get; set; }

        public long? CorrespondenceTalukaId { get; set; }

        public string? CorrespondenceTalukaName { get; set; }

        public string? CorrespondenceFlatNo { get; set; }

        public string? CorrespondenceBuildingName { get; set; }

        public int? CorrespondencePinCode { get; set; }

        public string? CorrespondenceLandMark { get; set; }

        public string? CorrespondenceAddressMigration { get; set; }

        public long? SubmittedCnt { get; set; }

        public long? RejectedCnt { get; set; }

        public long? ConfirmedCnt { get; set; }

        public long? InCompletedCnt { get; set; }
    }
}
