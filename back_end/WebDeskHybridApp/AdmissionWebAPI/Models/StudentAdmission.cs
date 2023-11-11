using System;
using System.Collections.Generic;

namespace AdmissionWebAPI.Models;

public partial class StudentAdmission
{
    public long Id { get; set; }

    public long UserId { get; set; }

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

    public string? LocalFlatNo { get; set; }

    public string? LocalBuildingName { get; set; }

    public long? LocalCountryId { get; set; }

    public string? LocalCity { get; set; }

    public long? LocalStateId { get; set; }

    public long? LocalDistrictId { get; set; }

    public long? LocalTalukaId { get; set; }

    public int? LocalPinCode { get; set; }

    public string? LocalLandMark { get; set; }

    public long? StudentCodeId { get; set; }

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

    public string LastName { get; set; } = null!;

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

    public int? CorrespondencePinCode { get; set; }

    public string? CorrespondenceLandMark { get; set; }

    public string? CorrespondenceAddressMigration { get; set; }

    public bool? IsProfileComplete { get; set; }

    public string? DrivingLicenceNo { get; set; }

    public string? CorrespondenceFlatNo { get; set; }

    public bool? IsPermanantCommunication { get; set; }

    public bool? IsCorrespondenceCommunication { get; set; }

    public bool? IsLocalCommunication { get; set; }

    public string? ParentMailId { get; set; }

    public string? ParentMobileNo { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public long CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public long? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public virtual ICollection<BankDetail> BankDetails { get; set; } = new List<BankDetail>();

    public virtual ICollection<CurrentAcademicDetail> CurrentAcademicDetails { get; set; } = new List<CurrentAcademicDetail>();

    public virtual ICollection<DocumentList> DocumentLists { get; set; } = new List<DocumentList>();

    public virtual ICollection<EntranceExamDetail> EntranceExamDetails { get; set; } = new List<EntranceExamDetail>();

    public virtual ICollection<HscmarkDetail> HscmarkDetails { get; set; } = new List<HscmarkDetail>();

    public virtual ICollection<InsuranceDetail> InsuranceDetails { get; set; } = new List<InsuranceDetail>();

    public virtual ICollection<ParentDetail> ParentDetails { get; set; } = new List<ParentDetail>();

    public virtual ICollection<PhDdetail> PhDdetails { get; set; } = new List<PhDdetail>();

    public virtual ICollection<PreviousAcademicDetail> PreviousAcademicDetails { get; set; } = new List<PreviousAcademicDetail>();

    public virtual ICollection<SscmarkDetail> SscmarkDetails { get; set; } = new List<SscmarkDetail>();

    public virtual ICollection<StudAdmissionAcademicYearDetail> StudAdmissionAcademicYearDetails { get; set; } = new List<StudAdmissionAcademicYearDetail>();

    public virtual ICollection<VehicleInformation> VehicleInformations { get; set; } = new List<VehicleInformation>();
}
