using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class OnlineStudentAdmission
{
    public long Id { get; set; }

    public long OnlineUserId { get; set; }

    public long CollegeId { get; set; }

    public long AcademicYearId { get; set; }

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

    public long? StudentAdmissionId { get; set; }

    public long? ProgramYearId { get; set; }

    public long? ProgramMasterId { get; set; }

    public long? BranchId { get; set; }

    public long? AcademicStatusId { get; set; }

    public long? PayingCategoryId { get; set; }

    public long? AnnualIncomeId { get; set; }

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

    public long? AllotmentCategory { get; set; }

    public long? BelongCaste { get; set; }

    public long? AdmittedThrough { get; set; }

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

    public string? PermanentFlatNo { get; set; }

    public string? PermanentBuildingName { get; set; }

    public int? PermanentPinCode { get; set; }

    public string? PermanentLandMark { get; set; }

    public string? PermanentAddressMigration { get; set; }

    public string? CorrespondenceFlatNo { get; set; }

    public string? CorrespondenceBuildingName { get; set; }

    public int? CorrespondencePinCode { get; set; }

    public string? CorrespondenceLandMark { get; set; }

    public string? CorrespondenceAddressMigration { get; set; }

    public long? ApplicationNoId { get; set; }

    public string? ApplicationNo { get; set; }

    public string? AdmissionStatus { get; set; }

    public long? ApplicationRejectReasonId { get; set; }

    public bool? IsHardCopySubmitted { get; set; }

    public bool? IsProfileComplete { get; set; }

    public string? ReasonOfAcademicStatus { get; set; }

    public long? ApplicationStatusId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<OnlineBankDetail> OnlineBankDetails { get; set; } = new List<OnlineBankDetail>();

    public virtual ICollection<OnlineDocumentList> OnlineDocumentLists { get; set; } = new List<OnlineDocumentList>();

    public virtual ICollection<OnlineEntranceExamDetail> OnlineEntranceExamDetails { get; set; } = new List<OnlineEntranceExamDetail>();

    public virtual ICollection<OnlineHscmarkDetail> OnlineHscmarkDetails { get; set; } = new List<OnlineHscmarkDetail>();

    public virtual ICollection<OnlineInsuranceDetail> OnlineInsuranceDetails { get; set; } = new List<OnlineInsuranceDetail>();

    public virtual ICollection<OnlineParentDetail> OnlineParentDetails { get; set; } = new List<OnlineParentDetail>();

    public virtual ICollection<OnlinePhDdetail> OnlinePhDdetails { get; set; } = new List<OnlinePhDdetail>();

    public virtual ICollection<OnlinePreviousAcademicDetail> OnlinePreviousAcademicDetails { get; set; } = new List<OnlinePreviousAcademicDetail>();

    public virtual ICollection<OnlineSscmarkDetail> OnlineSscmarkDetails { get; set; } = new List<OnlineSscmarkDetail>();

    public virtual ICollection<OnlineVehicleInformation> OnlineVehicleInformations { get; set; } = new List<OnlineVehicleInformation>();
}
