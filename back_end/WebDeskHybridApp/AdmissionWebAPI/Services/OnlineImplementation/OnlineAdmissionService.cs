using AdmissionWebAPI.Data;
using AdmissionWebAPI.Models;
using AdmissionWebAPI.RedisServices;
using AdmissionWebAPI.Services.Common.Contract;
using AdmissionWebAPI.Services.OnlineContract;
using AdmissionWebAPI.ViewModels.Online;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace AdmissionWebAPI.Services.OnlineImplementation
{
    public class OnlineAdmissionService : IOnlineAdmissionService
    {
        private readonly AdmissionDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly long academicYearId;
        private readonly IGetMasterNameFromId _masterNameService;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetOnlineAdmission";
        public OnlineAdmissionService(AdmissionDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IGetMasterNameFromId masterNameService, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _masterNameService = masterNameService;
            _redisService = redisService;

            string uId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("UserId"))?.Value;
            string cId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value;
            string ayId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("AcademicYearId"))?.Value;

            long.TryParse(uId, out userId);
            long.TryParse(cId, out collegeId);
            long.TryParse(ayId, out academicYearId);
        }

        #region Get
        /// <summary>
        /// Get
        /// </summary>
        /// <param name="onlineUserId"></param>
        /// <returns></returns>
        public async Task<OnlineAdmissionVM?> Get(long onlineUserId)
        {
            if (userId != onlineUserId)
                return null;

            var response = new OnlineAdmissionVM();
            var responseList = await _redisService.GetRedisCacheData<List<OnlineAdmissionVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(o => o.OnlineUserId == userId).FirstOrDefault<OnlineAdmissionVM>();
            else
            {
                // Student Details & Communication
                response = await _context.OnlineStudentAdmissions.Where(o => o.CollegeId == collegeId && o.AcademicYearId == academicYearId && o.OnlineUserId == userId && o.IsDeleted == false).Select(o => new OnlineAdmissionVM()
                {
                    Id = o.Id, // OnlineStudentAdmissionId
                    OnlineUserId = onlineUserId,
                    CollegeId = collegeId,
                    AcademicYearId = academicYearId,
                    StudentCode = o.StudentCode,
                    AdmissionTypeId = o.AdmissionTypeId,
                    Prnno = o.Prnno,
                    CandidatureTypeId = o.CandidatureTypeId,
                    StateMeritListNo = o.StateMeritListNo,
                    NationalMeritListNo = o.NationalMeritListNo,
                    StateMeritMarks = o.StateMeritMarks,
                    NationalMeritMarks = o.NationalMeritMarks,
                    DteapplicationNo = o.DteapplicationNo,
                    HomeUniversity = o.HomeUniversity,
                    MahaDbtApplicationNo = o.MahaDbtApplicationNo,
                    SeatTypeId = o.SeatTypeId,
                    ModeOfAdmission = o.ModeOfAdmission,
                    AllotmentCategory = o.AllotmentCategory,
                    BelongCaste = o.BelongCaste,
                    AdmittedThrough = o.AdmittedThrough,
                    Grno = o.Grno,
                    Title = o.Title,
                    LastName = o.LastName,
                    FirstName = o.FirstName,
                    MiddleName = o.MiddleName,
                    NameAsMarkSheet = o.NameAsMarkSheet,
                    Gender = o.Gender,
                    DateOfBirth = o.DateOfBirth,
                    PlaceOfBirth = o.PlaceOfBirth,
                    TalukaOfBirth = o.TalukaOfBirth,
                    MaritalStatus = o.MaritalStatus,
                    BloodGroup = o.BloodGroup,
                    ChildNoInFamily = o.ChildNoInFamily,
                    MotherTounge = o.MotherTounge,
                    Nationality = o.Nationality,
                    StudentMailId = o.StudentMailId,
                    AlternateMailId = o.AlternateMailId,
                    AadharNo = o.AadharNo,
                    PanNo = o.PanNo,
                    IsRegisteredWithElection = o.IsRegisteredWithElection,
                    VoterId = o.VoterId,
                    MobileNo = o.MobileNo,
                    PhysicallyChallaged = o.PhysicallyChallaged,
                    DisabilityType = o.DisabilityType,
                    DomicileId = o.DomicileId,
                    ReligionId = o.ReligionId,
                    StudentCategoryId = o.StudentCategoryId,
                    CasteId = o.CasteId,
                    SubCasteId = o.SubCasteId,
                    IsMinority = o.IsMinority,
                    MinorityId = o.MinorityId,
                    MinorityDetailsId = o.MinorityDetailsId,
                    AlternateMobileNo = o.AlternateMobileNo,
                    EmergencyContactNo = o.EmergencyContactNo,
                    LanguageKnown = o.LanguageKnown,
                    PassportNo = o.PassportNo,
                    PassportExpiryDate = o.PassportExpiryDate,
                    IsEmployeed = o.IsEmployeed,
                    IsGapInEducation = o.IsGapInEducation,
                    NoOfYearsInGap = o.NoOfYearsInGap,
                    IsGraduationResultDeclare = o.IsGraduationResultDeclare,
                    IsDefenceParent = o.IsDefenceParent,
                    DefenceType = o.DefenceType,
                    StudentImage = o.StudentImage,
                    StudentSignature = o.StudentSignature,
                    StudentAdmissionId = o.StudentAdmissionId,
                    ProgramYearId = o.ProgramYearId,
                    ProgramMasterId = o.ProgramMasterId,
                    BranchId = o.BranchId,
                    AcademicStatusId = o.AcademicStatusId,
                    ReasonOfAcademicStatus = o.ReasonOfAcademicStatus,
                    AdmissionStatus = o.AdmissionStatus,
                    AnnualIncomeId = o.AnnualIncomeId,
                    PermanentFlatNo = o.PermanentFlatNo,
                    PermanentBuildingName = o.PermanentBuildingName,
                    PermanentCountryId = o.PermanentCountryId,
                    PermanentCity = o.PermanentCity,
                    PermanentStateId = o.PermanentStateId,
                    PermanentDistrictId = o.PermanentDistrictId,
                    PermanentTalukaId = o.PermanentTalukaId,
                    PermanentPinCode = o.PermanentPinCode,
                    PermanentLandMark = o.PermanentLandMark,
                    PermanentAddressMigration = o.PermanentAddressMigration,
                    CorrespondenceBuildingName = o.CorrespondenceBuildingName,
                    CorrespondenceCountryId = o.CorrespondenceCountryId,
                    CorrespondenceCity = o.CorrespondenceCity,
                    CorrespondenceStateId = o.CorrespondenceStateId,
                    CorrespondenceDistrictId = o.CorrespondenceDistrictId,
                    CorrespondenceTalukaId = o.CorrespondenceTalukaId,
                    CorrespondencePinCode = o.CorrespondencePinCode,
                    CorrespondenceLandMark = o.CorrespondenceLandMark,
                    CorrespondenceAddressMigration = o.CorrespondenceAddressMigration,
                    CorrespondenceFlatNo = o.CorrespondenceFlatNo,
                    ApplicationStatusId = o.ApplicationStatusId,
                    ApplicationRejectReasonId = o.ApplicationRejectReasonId,
                    ApplicationFor = o.ApplicationFor,
                    ApplicationNo = o.ApplicationNo,
                    Region = o.Region,
                    ApplicationNoId = o.ApplicationNoId,
                    IsActive = o.IsActive,
                    CreatedBy = o.CreatedBy,
                    CreatedDate = o.CreatedDate,
                    UpdatedBy = o.UpdatedBy,
                    UpdatedDate = o.UpdatedDate,

                    #region Parent
                    onlineParentDetailsVMList = o.OnlineParentDetails.Where(pd => pd.IsDeleted == false).Select(pd => new OnlineParentDetailsVM()
                    {
                        Id = pd.Id,
                        OnlineStudentAdmissionId = pd.OnlineStudentAdmissionId,
                        Relation = pd.Relation,
                        LivingStatus = pd.LivingStatus,
                        LastName = pd.LastName,
                        MiddleName = pd.MiddleName,
                        FirstName = pd.FirstName,
                        DateOfBirth = pd.DateOfBirth,
                        Qualification = pd.Qualification,
                        Profession = pd.Profession,
                        EmployedIn = pd.EmployedIn,
                        OrganizationName = pd.OrganizationName,
                        Designation = pd.Designation,
                        Income = pd.Income,
                        MobileNo = pd.MobileNo,
                        MailId = pd.MailId,
                        IsDefaultCommunication = pd.IsDefaultCommunication,
                        Image = pd.Image,
                        Signature = pd.Signature,
                        GuaradianRelation = pd.GuaradianRelation,
                        GuaradianAddress = pd.GuaradianAddress,
                        IsActive = pd.IsActive,
                        CreatedBy = pd.CreatedBy,
                        CreatedDate = pd.CreatedDate,
                        UpdatedBy = pd.UpdatedBy,
                        UpdatedDate = pd.UpdatedDate
                    }).ToList<OnlineParentDetailsVM>(),
                    #endregion Parent

                    #region Pervious Academic
                    onlinePreviousAcademicDetailsVMList = o.OnlinePreviousAcademicDetails.Where(pa => pa.IsDeleted == false).Select(pa => new OnlinePreviousAcademicDetailsVM()
                    {
                        Id = pa.Id,
                        OnlineStudentAdmissionId = pa.OnlineStudentAdmissionId,
                        AcademicClass = pa.AcademicClass,
                        SchoolCollege = pa.SchoolCollege,
                        BoardUniversity = pa.BoardUniversity,
                        Month = pa.Month,
                        Year = pa.Year,
                        SeatNo = pa.SeatNo,
                        MarksObtained = pa.MarksObtained,
                        OutOf = pa.OutOf,
                        Percentage = pa.Percentage,
                        IsActive = pa.IsActive,
                        CreatedBy = pa.CreatedBy,
                        CreatedDate = pa.CreatedDate,
                        UpdatedBy = pa.UpdatedBy,
                        UpdatedDate = pa.UpdatedDate
                    }).ToList<OnlinePreviousAcademicDetailsVM>(),
                    #endregion Pervious Academic

                    #region HSC Mark
                    onlineHscmarkDetailsVMList = o.OnlineHscmarkDetails.Where(hsc => hsc.IsDeleted == false).Select(hsc => new OnlineHscmarkDetailVM()
                    {
                        Id = hsc.Id,
                        OnlineStudentAdmissionId = hsc.OnlineStudentAdmissionId,
                        PhysicsMarks = hsc.PhysicsMarks,
                        ChemistryMarks = hsc.ChemistryMarks,
                        MathsMarks = hsc.MathsMarks,
                        BiologyMarks = hsc.BiologyMarks,
                        EnglishMarks = hsc.EnglishMarks,
                        VocationSubject = hsc.VocationSubject,
                        VocationSubjectMarks = hsc.VocationSubjectMarks,
                        QualifyingTotal = hsc.QualifyingTotal,
                        IsActive = hsc.IsActive,
                        CreatedBy = hsc.CreatedBy,
                        CreatedDate = hsc.CreatedDate,
                        UpdatedBy = hsc.UpdatedBy,
                        UpdatedDate = hsc.UpdatedDate
                    }).ToList<OnlineHscmarkDetailVM >(),
                    #endregion HSC Mark

                    #region EntranceExam
                    onlineEntranceExamDetailsVMList = o.OnlineEntranceExamDetails.Where(eo => eo.IsDeleted == false).Select(eo => new OnlineEntranceExamDetailsVM()
                    {
                        Id = eo.Id,
                        OnlineStudentAdmissionId = eo.OnlineStudentAdmissionId,
                        RollNumber = eo.RollNumber,
                        EntranceType = eo.EntranceType,
                        PhysicsMarks = eo.PhysicsMarks,
                        ChemistryMarks = eo.ChemistryMarks,
                        MathsMarks = eo.MathsMarks,
                        TotalMarks = eo.TotalMarks,
                        IsActive = eo.IsActive,
                        CreatedBy = eo.CreatedBy,
                        CreatedDate = eo.CreatedDate,
                        UpdatedBy = eo.UpdatedBy,
                        UpdatedDate = eo.UpdatedDate
                    }).ToList<OnlineEntranceExamDetailsVM>(),
                    #endregion EntranceExam

                    #region Bank
                    onlineBankDetailsVMList = o.OnlineBankDetails.Where(b => b.IsDeleted == false).Select(b => new OnlineBankDetailsVM()
                    {
                        Id = b.Id,
                        OnlineStudentAdmissionId = b.OnlineStudentAdmissionId,
                        BankName = b.BankName,
                        PersonType = b.PersonType,
                        BranchName = b.BranchName,
                        BranchCode = b.BranchCode,
                        BankAddress = b.BankAddress,
                        AccountType = b.AccountType,
                        Ifsccode = b.Ifsccode,
                        AccountNo = b.AccountNo,
                        AccountHolderName = b.AccountHolderName,
                        Micrcode = b.Micrcode,
                        CanceledChequePath = b.CanceledChequePath,
                        IsAccLinkedWithAadhar = b.IsAccLinkedWithAadhar,
                        IsActive = b.IsActive,
                        CreatedBy = b.CreatedBy,
                        CreatedDate = b.CreatedDate,
                        UpdatedBy = b.UpdatedBy,
                        UpdatedDate = b.UpdatedDate
                    }).ToList<OnlineBankDetailsVM>()
                    #endregion Bank
                }).FirstOrDefaultAsync<OnlineAdmissionVM>();
            }
            if (response == null)
                return null;
            return response;
        }

        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="onlineStudentVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(OnlineAdmissionStudentDetailsVM onlineAdmissionStudentDetailsVM)
        {
            if (userId != onlineAdmissionStudentDetailsVM.OnlineUserId)
                return null;
            var onlineStudentAdmissions = await _context.OnlineStudentAdmissions.Where(o => o.CollegeId == collegeId && o.AcademicYearId == academicYearId && o.OnlineUserId == userId && o.IsActive && o.IsDeleted == false).FirstOrDefaultAsync();
            if (onlineStudentAdmissions == null)
            {
                long? maxApplicationNoId = await _context.OnlineStudentAdmissions.Where(o => o.CollegeId == collegeId && o.IsActive && o.IsDeleted == false).MaxAsync(o => o.ApplicationNoId);
                long applicationNo = maxApplicationNoId ?? 0; // Need to Update 00000001
                applicationNo += 1;

                // Only Insert Student Details
                EntityEntry<OnlineStudentAdmission> created = await _context.OnlineStudentAdmissions.AddAsync(new OnlineStudentAdmission()
                {
                    OnlineUserId = userId,
                    CollegeId = collegeId,
                    AcademicYearId = academicYearId,
                    StudentCode = onlineAdmissionStudentDetailsVM.StudentCode,
                    AdmissionTypeId = onlineAdmissionStudentDetailsVM.AdmissionTypeId,
                    Prnno = onlineAdmissionStudentDetailsVM.Prnno,
                    CandidatureTypeId = onlineAdmissionStudentDetailsVM.CandidatureTypeId,
                    StateMeritListNo = onlineAdmissionStudentDetailsVM.StateMeritListNo,
                    NationalMeritListNo = onlineAdmissionStudentDetailsVM.NationalMeritListNo,
                    StateMeritMarks = onlineAdmissionStudentDetailsVM.StateMeritMarks,
                    NationalMeritMarks = onlineAdmissionStudentDetailsVM.NationalMeritMarks,
                    DteapplicationNo = onlineAdmissionStudentDetailsVM.DteapplicationNo,
                    HomeUniversity = onlineAdmissionStudentDetailsVM.HomeUniversity,
                    MahaDbtApplicationNo = onlineAdmissionStudentDetailsVM.MahaDbtApplicationNo,
                    SeatTypeId = onlineAdmissionStudentDetailsVM.SeatTypeId,
                    ModeOfAdmission = onlineAdmissionStudentDetailsVM.ModeOfAdmission,
                    AllotmentCategory = onlineAdmissionStudentDetailsVM.AllotmentCategory,
                    BelongCaste = onlineAdmissionStudentDetailsVM.BelongCaste,
                    AdmittedThrough = onlineAdmissionStudentDetailsVM.AdmittedThrough,
                    Grno = onlineAdmissionStudentDetailsVM.Grno,
                    Title = onlineAdmissionStudentDetailsVM.Title,
                    LastName = onlineAdmissionStudentDetailsVM.LastName,
                    FirstName = onlineAdmissionStudentDetailsVM.FirstName,
                    MiddleName = onlineAdmissionStudentDetailsVM.MiddleName,
                    NameAsMarkSheet = onlineAdmissionStudentDetailsVM.NameAsMarkSheet,
                    Gender = onlineAdmissionStudentDetailsVM.Gender,
                    DateOfBirth = onlineAdmissionStudentDetailsVM.DateOfBirth,
                    PlaceOfBirth = onlineAdmissionStudentDetailsVM.PlaceOfBirth,
                    TalukaOfBirth = onlineAdmissionStudentDetailsVM.TalukaOfBirth,
                    MaritalStatus = onlineAdmissionStudentDetailsVM.MaritalStatus,
                    BloodGroup = onlineAdmissionStudentDetailsVM.BloodGroup,
                    ChildNoInFamily = onlineAdmissionStudentDetailsVM.ChildNoInFamily,
                    MotherTounge = onlineAdmissionStudentDetailsVM.MotherTounge,
                    Nationality = onlineAdmissionStudentDetailsVM.Nationality,
                    StudentMailId = onlineAdmissionStudentDetailsVM.StudentMailId,
                    AlternateMailId = onlineAdmissionStudentDetailsVM.AlternateMailId,
                    AadharNo = onlineAdmissionStudentDetailsVM.AadharNo,
                    PanNo = onlineAdmissionStudentDetailsVM.PanNo,
                    IsRegisteredWithElection = onlineAdmissionStudentDetailsVM.IsRegisteredWithElection,
                    VoterId = onlineAdmissionStudentDetailsVM.VoterId,
                    MobileNo = onlineAdmissionStudentDetailsVM.MobileNo,
                    PhysicallyChallaged = onlineAdmissionStudentDetailsVM.PhysicallyChallaged,
                    DisabilityType = onlineAdmissionStudentDetailsVM.DisabilityType,
                    DomicileId = onlineAdmissionStudentDetailsVM.DomicileId,
                    ReligionId = onlineAdmissionStudentDetailsVM.ReligionId,
                    StudentCategoryId = onlineAdmissionStudentDetailsVM.StudentCategoryId,
                    CasteId = onlineAdmissionStudentDetailsVM.CasteId,
                    SubCasteId = onlineAdmissionStudentDetailsVM.SubCasteId,
                    IsMinority = onlineAdmissionStudentDetailsVM.IsMinority,
                    MinorityId = onlineAdmissionStudentDetailsVM.MinorityId,
                    MinorityDetailsId = onlineAdmissionStudentDetailsVM.MinorityDetailsId,
                    AlternateMobileNo = onlineAdmissionStudentDetailsVM.AlternateMobileNo,
                    EmergencyContactNo = onlineAdmissionStudentDetailsVM.EmergencyContactNo,
                    LanguageKnown = onlineAdmissionStudentDetailsVM.LanguageKnown,
                    PassportNo = onlineAdmissionStudentDetailsVM.PassportNo,
                    PassportExpiryDate = onlineAdmissionStudentDetailsVM.PassportExpiryDate,
                    IsEmployeed = onlineAdmissionStudentDetailsVM.IsEmployeed,
                    IsGapInEducation = onlineAdmissionStudentDetailsVM.IsGapInEducation,
                    NoOfYearsInGap = onlineAdmissionStudentDetailsVM.NoOfYearsInGap,
                    IsGraduationResultDeclare = onlineAdmissionStudentDetailsVM.IsGraduationResultDeclare,
                    IsDefenceParent = onlineAdmissionStudentDetailsVM.IsDefenceParent,
                    DefenceType = onlineAdmissionStudentDetailsVM.DefenceType,
                    StudentImage = onlineAdmissionStudentDetailsVM.StudentImage,
                    StudentSignature = onlineAdmissionStudentDetailsVM.StudentSignature,
                    StudentAdmissionId = onlineAdmissionStudentDetailsVM.StudentAdmissionId,
                    ProgramYearId = onlineAdmissionStudentDetailsVM.ProgramYearId,
                    ProgramMasterId = onlineAdmissionStudentDetailsVM.ProgramMasterId,
                    BranchId = onlineAdmissionStudentDetailsVM.BranchId,
                    AcademicStatusId = onlineAdmissionStudentDetailsVM.AcademicStatusId,
                    ReasonOfAcademicStatus = onlineAdmissionStudentDetailsVM.ReasonOfAcademicStatus,
                    AdmissionStatus = onlineAdmissionStudentDetailsVM.AdmissionStatus,
                    AnnualIncomeId = onlineAdmissionStudentDetailsVM.AnnualIncomeId,
                    ApplicationNoId = applicationNo,
                    ApplicationNo = applicationNo.ToString("D8"),
                    ApplicationFor = onlineAdmissionStudentDetailsVM.ApplicationFor,
                    Region = onlineAdmissionStudentDetailsVM.Region,
                    IsActive = onlineAdmissionStudentDetailsVM.IsActive,
                    IsDeleted = false,
                    CreatedBy = userId,
                    CreatedDate = DateTime.UtcNow
                });
                if (_context.SaveChanges() > 0)
                    await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return created.Entity.Id;
            }
            return null;
        }
        #endregion Insert

        #region Student
        /// <summary>
        /// UpsertonlineAdmissionStudent
        /// </summary>
        /// <param name="onlineAdmissionStudentDetailsVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertonlineAdmissionStudent(OnlineAdmissionStudentDetailsVM onlineAdmissionStudentDetailsVM)
        {
            if (userId != onlineAdmissionStudentDetailsVM.OnlineUserId)
                return null;
            var onlineStudentDetails = await _context.OnlineStudentAdmissions.FirstOrDefaultAsync(e => e.CollegeId == collegeId && e.AcademicYearId == academicYearId && e.OnlineUserId == userId && e.Id == onlineAdmissionStudentDetailsVM.Id);
            if (onlineStudentDetails != null)
            {
                onlineStudentDetails.OnlineUserId = userId;
                onlineStudentDetails.CollegeId = collegeId;
                onlineStudentDetails.AcademicYearId = academicYearId;
                onlineStudentDetails.StudentCode = onlineAdmissionStudentDetailsVM.StudentCode;
                onlineStudentDetails.AdmissionTypeId = onlineAdmissionStudentDetailsVM.AdmissionTypeId;
                onlineStudentDetails.Prnno = onlineAdmissionStudentDetailsVM.Prnno;
                onlineStudentDetails.CandidatureTypeId = onlineAdmissionStudentDetailsVM.CandidatureTypeId;
                onlineStudentDetails.StateMeritListNo = onlineAdmissionStudentDetailsVM.StateMeritListNo;
                onlineStudentDetails.NationalMeritListNo = onlineAdmissionStudentDetailsVM.NationalMeritListNo;
                onlineStudentDetails.StateMeritMarks = onlineAdmissionStudentDetailsVM.StateMeritMarks;
                onlineStudentDetails.NationalMeritMarks = onlineAdmissionStudentDetailsVM.NationalMeritMarks;
                onlineStudentDetails.DteapplicationNo = onlineAdmissionStudentDetailsVM.DteapplicationNo;
                onlineStudentDetails.HomeUniversity = onlineAdmissionStudentDetailsVM.HomeUniversity;
                onlineStudentDetails.MahaDbtApplicationNo = onlineAdmissionStudentDetailsVM.MahaDbtApplicationNo;
                onlineStudentDetails.SeatTypeId = onlineAdmissionStudentDetailsVM.SeatTypeId;
                onlineStudentDetails.ModeOfAdmission = onlineAdmissionStudentDetailsVM.ModeOfAdmission;
                onlineStudentDetails.AllotmentCategory = onlineAdmissionStudentDetailsVM.AllotmentCategory;
                onlineStudentDetails.BelongCaste = onlineAdmissionStudentDetailsVM.BelongCaste;
                onlineStudentDetails.AdmittedThrough = onlineAdmissionStudentDetailsVM.AdmittedThrough;
                onlineStudentDetails.Grno = onlineAdmissionStudentDetailsVM.Grno;
                onlineStudentDetails.Title = onlineAdmissionStudentDetailsVM.Title;
                onlineStudentDetails.LastName = onlineAdmissionStudentDetailsVM.LastName;
                onlineStudentDetails.FirstName = onlineAdmissionStudentDetailsVM.FirstName;
                onlineStudentDetails.MiddleName = onlineAdmissionStudentDetailsVM.MiddleName;
                onlineStudentDetails.NameAsMarkSheet = onlineAdmissionStudentDetailsVM.NameAsMarkSheet;
                onlineStudentDetails.Gender = onlineAdmissionStudentDetailsVM.Gender;
                onlineStudentDetails.DateOfBirth = onlineAdmissionStudentDetailsVM.DateOfBirth;
                onlineStudentDetails.PlaceOfBirth = onlineAdmissionStudentDetailsVM.PlaceOfBirth;
                onlineStudentDetails.TalukaOfBirth = onlineAdmissionStudentDetailsVM.TalukaOfBirth;
                onlineStudentDetails.MaritalStatus = onlineAdmissionStudentDetailsVM.MaritalStatus;
                onlineStudentDetails.BloodGroup = onlineAdmissionStudentDetailsVM.BloodGroup;
                onlineStudentDetails.ChildNoInFamily = onlineAdmissionStudentDetailsVM.ChildNoInFamily;
                onlineStudentDetails.MotherTounge = onlineAdmissionStudentDetailsVM.MotherTounge;
                onlineStudentDetails.Nationality = onlineAdmissionStudentDetailsVM.Nationality;
                onlineStudentDetails.StudentMailId = onlineAdmissionStudentDetailsVM.StudentMailId;
                onlineStudentDetails.AlternateMailId = onlineAdmissionStudentDetailsVM.AlternateMailId;
                onlineStudentDetails.AadharNo = onlineAdmissionStudentDetailsVM.AadharNo;
                onlineStudentDetails.PanNo = onlineAdmissionStudentDetailsVM.PanNo;
                onlineStudentDetails.IsRegisteredWithElection = onlineAdmissionStudentDetailsVM.IsRegisteredWithElection;
                onlineStudentDetails.VoterId = onlineAdmissionStudentDetailsVM.VoterId;
                onlineStudentDetails.MobileNo = onlineAdmissionStudentDetailsVM.MobileNo;
                onlineStudentDetails.PhysicallyChallaged = onlineAdmissionStudentDetailsVM.PhysicallyChallaged;
                onlineStudentDetails.DisabilityType = onlineAdmissionStudentDetailsVM.DisabilityType;
                onlineStudentDetails.DomicileId = onlineAdmissionStudentDetailsVM.DomicileId;
                onlineStudentDetails.ReligionId = onlineAdmissionStudentDetailsVM.ReligionId;
                onlineStudentDetails.StudentCategoryId = onlineAdmissionStudentDetailsVM.StudentCategoryId;
                onlineStudentDetails.CasteId = onlineAdmissionStudentDetailsVM.CasteId;
                onlineStudentDetails.SubCasteId = onlineAdmissionStudentDetailsVM.SubCasteId;
                onlineStudentDetails.IsMinority = onlineAdmissionStudentDetailsVM.IsMinority;
                onlineStudentDetails.MinorityId = onlineAdmissionStudentDetailsVM.MinorityId;
                onlineStudentDetails.MinorityDetailsId = onlineAdmissionStudentDetailsVM.MinorityDetailsId;
                onlineStudentDetails.AlternateMobileNo = onlineAdmissionStudentDetailsVM.AlternateMobileNo;
                onlineStudentDetails.EmergencyContactNo = onlineAdmissionStudentDetailsVM.EmergencyContactNo;
                onlineStudentDetails.LanguageKnown = onlineAdmissionStudentDetailsVM.LanguageKnown;
                onlineStudentDetails.PassportNo = onlineAdmissionStudentDetailsVM.PassportNo;
                onlineStudentDetails.PassportExpiryDate = onlineAdmissionStudentDetailsVM.PassportExpiryDate;
                onlineStudentDetails.IsEmployeed = onlineAdmissionStudentDetailsVM.IsEmployeed;
                onlineStudentDetails.IsGapInEducation = onlineAdmissionStudentDetailsVM.IsGapInEducation;
                onlineStudentDetails.NoOfYearsInGap = onlineAdmissionStudentDetailsVM.NoOfYearsInGap;
                onlineStudentDetails.IsGraduationResultDeclare = onlineAdmissionStudentDetailsVM.IsGraduationResultDeclare;
                onlineStudentDetails.IsDefenceParent = onlineAdmissionStudentDetailsVM.IsDefenceParent;
                onlineStudentDetails.DefenceType = onlineAdmissionStudentDetailsVM.DefenceType;
                onlineStudentDetails.StudentImage = onlineAdmissionStudentDetailsVM.StudentImage;
                onlineStudentDetails.StudentSignature = onlineAdmissionStudentDetailsVM.StudentSignature;
                onlineStudentDetails.StudentAdmissionId = onlineAdmissionStudentDetailsVM.StudentAdmissionId;
                onlineStudentDetails.ProgramYearId = onlineAdmissionStudentDetailsVM.ProgramYearId;
                onlineStudentDetails.ProgramMasterId = onlineAdmissionStudentDetailsVM.ProgramMasterId;
                onlineStudentDetails.BranchId = onlineAdmissionStudentDetailsVM.BranchId;
                onlineStudentDetails.AcademicStatusId = onlineAdmissionStudentDetailsVM.AcademicStatusId;
                onlineStudentDetails.ReasonOfAcademicStatus = onlineAdmissionStudentDetailsVM.ReasonOfAcademicStatus;
                onlineStudentDetails.AdmissionStatus = onlineAdmissionStudentDetailsVM.AdmissionStatus;
                onlineStudentDetails.AnnualIncomeId = onlineAdmissionStudentDetailsVM.AnnualIncomeId;
                onlineStudentDetails.ApplicationFor = onlineAdmissionStudentDetailsVM.ApplicationFor;
                onlineStudentDetails.Region = onlineAdmissionStudentDetailsVM.Region;
                onlineStudentDetails.IsActive = onlineAdmissionStudentDetailsVM.IsActive;
                onlineStudentDetails.UpdatedBy = userId;
                onlineStudentDetails.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(onlineStudentDetails).State = EntityState.Modified;
            if (_context.SaveChanges() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Student

        #region Parent
        /// <summary>
        /// UpsertonlineAdmissionParent
        /// </summary>
        /// <param name="onlineAdmissionParentDetailsVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertonlineAdmissionParent(OnlineAdmissionParentDetailsVM onlineAdmissionParentDetailsVM)
        {
            if (userId != onlineAdmissionParentDetailsVM.OnlineUserId)
                return null;
            var onlineStudentAdmissions = await _context.OnlineStudentAdmissions.Where(o => o.CollegeId == collegeId && o.AcademicYearId == academicYearId && o.OnlineUserId == userId && o.Id == onlineAdmissionParentDetailsVM.OnlineStudentAdmissionId).FirstOrDefaultAsync();
            if (onlineStudentAdmissions == null)
                return null;

            // VM to Model OnlineParentdetails
            IList<OnlineParentDetail> onlineParentDetailsEditList = new List<OnlineParentDetail>();
            IList<OnlineParentDetail> onlineParentDetailsAddList = new List<OnlineParentDetail>();
            IList<long> onlineParentDetailsDeleteList = new List<long>();

            if (onlineAdmissionParentDetailsVM.onlineParentDetailsVMList?.Count > 0)
            {
                foreach (var onlineparentDetailsVM in onlineAdmissionParentDetailsVM.onlineParentDetailsVMList)
                {
                    if (onlineparentDetailsVM.Id == 0) // Add
                    {
                        onlineParentDetailsAddList.Add(new OnlineParentDetail
                        {
                            OnlineStudentAdmissionId = onlineparentDetailsVM.OnlineStudentAdmissionId,
                            Relation = onlineparentDetailsVM.Relation,
                            LivingStatus = onlineparentDetailsVM.LivingStatus,
                            LastName = onlineparentDetailsVM.LastName,
                            MiddleName = onlineparentDetailsVM.MiddleName,
                            FirstName = onlineparentDetailsVM.FirstName,
                            DateOfBirth = onlineparentDetailsVM.DateOfBirth,
                            Qualification = onlineparentDetailsVM.Qualification,
                            Profession = onlineparentDetailsVM.Profession,
                            EmployedIn = onlineparentDetailsVM.EmployedIn,
                            OrganizationName = onlineparentDetailsVM.OrganizationName,
                            Designation = onlineparentDetailsVM.Designation,
                            Income = onlineparentDetailsVM.Income,
                            MobileNo = onlineparentDetailsVM.MobileNo,
                            MailId = onlineparentDetailsVM.MailId,
                            IsDefaultCommunication = onlineparentDetailsVM.IsDefaultCommunication,
                            Image = onlineparentDetailsVM.Image,
                            Signature = onlineparentDetailsVM.Signature,
                            GuaradianRelation = onlineparentDetailsVM.GuaradianRelation,
                            GuaradianAddress = onlineparentDetailsVM.GuaradianAddress,
                            IsActive = onlineparentDetailsVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow,
                        });
                    }
                    else // Edit
                    {
                        onlineParentDetailsEditList.Add(new OnlineParentDetail
                        {
                            Id = onlineparentDetailsVM.Id,
                            OnlineStudentAdmissionId = onlineparentDetailsVM.OnlineStudentAdmissionId,
                            Relation = onlineparentDetailsVM.Relation,
                            LivingStatus = onlineparentDetailsVM.LivingStatus,
                            LastName = onlineparentDetailsVM.LastName,
                            MiddleName = onlineparentDetailsVM.MiddleName,
                            FirstName = onlineparentDetailsVM.FirstName,
                            DateOfBirth = onlineparentDetailsVM.DateOfBirth,
                            Qualification = onlineparentDetailsVM.Qualification,
                            Profession = onlineparentDetailsVM.Profession,
                            EmployedIn = onlineparentDetailsVM.EmployedIn,
                            OrganizationName = onlineparentDetailsVM.OrganizationName,
                            Designation = onlineparentDetailsVM.Designation,
                            Income = onlineparentDetailsVM.Income,
                            MobileNo = onlineparentDetailsVM.MobileNo,
                            MailId = onlineparentDetailsVM.MailId,
                            IsDefaultCommunication = onlineparentDetailsVM.IsDefaultCommunication,
                            Image = onlineparentDetailsVM.Image,
                            Signature = onlineparentDetailsVM.Signature,
                            GuaradianRelation = onlineparentDetailsVM.GuaradianRelation,
                            GuaradianAddress = onlineparentDetailsVM.GuaradianAddress,
                            IsActive = onlineparentDetailsVM.IsActive,
                            CreatedBy = onlineparentDetailsVM.CreatedBy,
                            CreatedDate = onlineparentDetailsVM.CreatedDate,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow,
                        });
                        onlineParentDetailsDeleteList.Add(onlineparentDetailsVM.Id);
                    }
                }
            }

            // Update exiting 
            onlineStudentAdmissions.OnlineParentDetails = onlineParentDetailsEditList;
            _context.UpdateRange(onlineStudentAdmissions);

            // Delete OnlinePerviousAcademicDetails 
            var existOnlineParentDetails = await _context.OnlineParentDetails.Where(e => e.OnlineStudentAdmissionId == onlineAdmissionParentDetailsVM.OnlineStudentAdmissionId && e.IsDeleted == false).Select(e => e.Id).ToListAsync();
            var onlinePerviousParentDetailsIds = existOnlineParentDetails.Except(onlineParentDetailsDeleteList).ToList();
            await _context.OnlineParentDetails.Where(e => onlinePerviousParentDetailsIds.Contains(e.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });
            // Delete OnlinePerviousAcademicDetails                                                                                                                                                                                                     //_context.OnlinePerviousAcademicDetails.Update(res);
            await _context.OnlineParentDetails.AddRangeAsync(onlineParentDetailsAddList);

            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Parent

        #region Communication
        /// <summary>
        /// UpsertonlineAdmissionCommunication
        /// </summary>
        /// <param name="onlineAdmissionCommunicationDetailsVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertonlineAdmissionCommunication(OnlineAdmissionCommunicationDetailsVM onlineAdmissionCommunicationDetailsVM)
        {
            if (userId != onlineAdmissionCommunicationDetailsVM.OnlineUserId)
                return null;
            var onlineCommunicationDetails = await _context.OnlineStudentAdmissions.FirstOrDefaultAsync(e => e.Id == onlineAdmissionCommunicationDetailsVM.OnlineStudentAdmissionId && e.OnlineUserId == userId && e.CollegeId == collegeId && e.AcademicYearId == academicYearId);
            if (onlineCommunicationDetails != null)
            {
                onlineCommunicationDetails.PermanentFlatNo = onlineAdmissionCommunicationDetailsVM.PermanentFlatNo;
                onlineCommunicationDetails.PermanentBuildingName = onlineAdmissionCommunicationDetailsVM.PermanentBuildingName;
                onlineCommunicationDetails.PermanentCountryId = onlineAdmissionCommunicationDetailsVM.PermanentCountryId;
                onlineCommunicationDetails.PermanentCity = onlineAdmissionCommunicationDetailsVM.PermanentCity;
                onlineCommunicationDetails.PermanentStateId = onlineAdmissionCommunicationDetailsVM.PermanentStateId;
                onlineCommunicationDetails.PermanentDistrictId = onlineAdmissionCommunicationDetailsVM.PermanentDistrictId;
                onlineCommunicationDetails.PermanentTalukaId = onlineAdmissionCommunicationDetailsVM.PermanentTalukaId;
                onlineCommunicationDetails.PermanentPinCode = onlineAdmissionCommunicationDetailsVM.PermanentPinCode;
                onlineCommunicationDetails.PermanentLandMark = onlineAdmissionCommunicationDetailsVM.PermanentLandMark;
                onlineCommunicationDetails.PermanentAddressMigration = onlineAdmissionCommunicationDetailsVM.PermanentAddressMigration;
                onlineCommunicationDetails.CorrespondenceFlatNo = onlineAdmissionCommunicationDetailsVM.CorrespondenceFlatNo;
                onlineCommunicationDetails.CorrespondenceBuildingName = onlineAdmissionCommunicationDetailsVM.CorrespondenceBuildingName;
                onlineCommunicationDetails.CorrespondenceCountryId = onlineAdmissionCommunicationDetailsVM.CorrespondenceCountryId;
                onlineCommunicationDetails.CorrespondenceCity = onlineAdmissionCommunicationDetailsVM.CorrespondenceCity;
                onlineCommunicationDetails.CorrespondenceStateId = onlineAdmissionCommunicationDetailsVM.CorrespondenceStateId;
                onlineCommunicationDetails.CorrespondenceDistrictId = onlineAdmissionCommunicationDetailsVM.CorrespondenceDistrictId;
                onlineCommunicationDetails.CorrespondenceTalukaId = onlineAdmissionCommunicationDetailsVM.CorrespondenceTalukaId;
                onlineCommunicationDetails.CorrespondencePinCode = onlineAdmissionCommunicationDetailsVM.CorrespondencePinCode;
                onlineCommunicationDetails.CorrespondenceLandMark = onlineAdmissionCommunicationDetailsVM.CorrespondenceLandMark;
                onlineCommunicationDetails.CorrespondenceAddressMigration = onlineAdmissionCommunicationDetailsVM.CorrespondenceAddressMigration;
                onlineCommunicationDetails.IsActive = onlineAdmissionCommunicationDetailsVM.IsActive;
                onlineCommunicationDetails.UpdatedBy = userId;
                onlineCommunicationDetails.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(onlineCommunicationDetails).State = EntityState.Modified;
            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Communication

        #region Academic
        public async Task<bool?> UpsertonlineAdmissionAcademic(OnlineAdmissionAcademicDetailsVM onlineAdmissionAcademicDetailsVM)
        {
            if (userId != onlineAdmissionAcademicDetailsVM.OnlineUserId)
                return null;
           var onlineStudentAdmissions = await _context.OnlineStudentAdmissions.Where(o => o.Id == onlineAdmissionAcademicDetailsVM.OnlineStudentAdmissionId && o.OnlineUserId == userId && o.CollegeId == collegeId && o.AcademicYearId == academicYearId).FirstOrDefaultAsync();
            if (onlineStudentAdmissions == null)
            {
                return null;
            }

            #region OnlinePerviousAcademicDetail
            // VM to Model OnlinePerviousAcademicDetail
            IList<OnlinePreviousAcademicDetail> onlinePreviousAcademicDetailsEditList = new List<OnlinePreviousAcademicDetail>();
            IList<OnlinePreviousAcademicDetail> onlinePreviousAcademicDetailsAddList = new List<OnlinePreviousAcademicDetail>();
            IList<long> onlinePreviousAcademicDetailsDeleteList = new List<long>();
            if (onlineAdmissionAcademicDetailsVM.onlinePreviousAcademicDetailsVMList?.Count > 0)
            {
                foreach (var onlinePreviousAcademicDetailsVM in onlineAdmissionAcademicDetailsVM.onlinePreviousAcademicDetailsVMList)
                {
                    if (onlinePreviousAcademicDetailsVM.Id == 0) // Add
                    {
                        onlinePreviousAcademicDetailsAddList.Add(new OnlinePreviousAcademicDetail
                        {
                            OnlineStudentAdmissionId = onlinePreviousAcademicDetailsVM.OnlineStudentAdmissionId,
                            AcademicClass = onlinePreviousAcademicDetailsVM.AcademicClass,
                            SchoolCollege = onlinePreviousAcademicDetailsVM.SchoolCollege,
                            BoardUniversity = onlinePreviousAcademicDetailsVM.BoardUniversity,
                            Month = onlinePreviousAcademicDetailsVM.Month,
                            Year = onlinePreviousAcademicDetailsVM.Year,
                            SeatNo = onlinePreviousAcademicDetailsVM.SeatNo,
                            MarksObtained = onlinePreviousAcademicDetailsVM.MarksObtained,
                            OutOf = onlinePreviousAcademicDetailsVM.OutOf,
                            Percentage = onlinePreviousAcademicDetailsVM.Percentage,
                            IsActive = onlinePreviousAcademicDetailsVM.IsActive,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow
                        });
                    }
                    else // Edit
                    {
                        onlinePreviousAcademicDetailsEditList.Add(new OnlinePreviousAcademicDetail
                        {
                            Id = onlinePreviousAcademicDetailsVM.Id,
                            OnlineStudentAdmissionId = onlinePreviousAcademicDetailsVM.OnlineStudentAdmissionId,
                            AcademicClass = onlinePreviousAcademicDetailsVM.AcademicClass,
                            SchoolCollege = onlinePreviousAcademicDetailsVM.SchoolCollege,
                            BoardUniversity = onlinePreviousAcademicDetailsVM.BoardUniversity,
                            Month = onlinePreviousAcademicDetailsVM.Month,
                            Year = onlinePreviousAcademicDetailsVM.Year,
                            SeatNo = onlinePreviousAcademicDetailsVM.SeatNo,
                            MarksObtained = onlinePreviousAcademicDetailsVM.MarksObtained,
                            OutOf = onlinePreviousAcademicDetailsVM.OutOf,
                            Percentage = onlinePreviousAcademicDetailsVM.Percentage,
                            IsActive = onlinePreviousAcademicDetailsVM.IsActive,
                            CreatedBy = onlinePreviousAcademicDetailsVM.CreatedBy,
                            CreatedDate = onlinePreviousAcademicDetailsVM.CreatedDate,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow
                        });
                        onlinePreviousAcademicDetailsDeleteList.Add(onlinePreviousAcademicDetailsVM.Id);
                    }
                }
            }
            #endregion OnlinePerviousAcademicDetail

            #region OnlineHscmarkDetail
            // VM to Model OnlineHscmarkDetail
            IList<OnlineHscmarkDetail> onlineHscmarkDetailsEditList = new List<OnlineHscmarkDetail>();
            IList<OnlineHscmarkDetail> onlineHscmarkDetailsAddList = new List<OnlineHscmarkDetail>();
            IList<long> onlineHscmarkDetailsDeleteList = new List<long>();
            if (onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVMList?.Count > 0)
            {
                foreach (var onlineHscmarkDetailVM in onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVMList)
                {
                    if (onlineHscmarkDetailVM.Id == 0)
                    { // Add
                        onlineHscmarkDetailsAddList.Add(new OnlineHscmarkDetail
                        {
                            OnlineStudentAdmissionId = onlineHscmarkDetailVM.OnlineStudentAdmissionId,
                            ChemistryMarks = onlineHscmarkDetailVM.ChemistryMarks,
                            PhysicsMarks = onlineHscmarkDetailVM.PhysicsMarks,
                            MathsMarks = onlineHscmarkDetailVM.MathsMarks,
                            BiologyMarks = onlineHscmarkDetailVM.BiologyMarks,
                            EnglishMarks = onlineHscmarkDetailVM.EnglishMarks,
                            QualifyingTotal = onlineHscmarkDetailVM.QualifyingTotal,
                            VocationSubject = onlineHscmarkDetailVM.VocationSubject,
                            VocationSubjectMarks = onlineHscmarkDetailVM.VocationSubjectMarks,
                            IsActive = onlineHscmarkDetailVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow
                        }); 
                    }
                    else
                    { // Edit
                        onlineHscmarkDetailsEditList.Add(new OnlineHscmarkDetail
                        {
                            Id = onlineHscmarkDetailVM.Id,
                            OnlineStudentAdmissionId = onlineHscmarkDetailVM.OnlineStudentAdmissionId,
                            ChemistryMarks = onlineHscmarkDetailVM.ChemistryMarks,
                            PhysicsMarks = onlineHscmarkDetailVM.PhysicsMarks,
                            MathsMarks = onlineHscmarkDetailVM.MathsMarks,
                            BiologyMarks = onlineHscmarkDetailVM.BiologyMarks,
                            EnglishMarks = onlineHscmarkDetailVM.EnglishMarks,
                            QualifyingTotal = onlineHscmarkDetailVM.QualifyingTotal,
                            VocationSubject = onlineHscmarkDetailVM.VocationSubject,
                            VocationSubjectMarks = onlineHscmarkDetailVM.VocationSubjectMarks,
                            IsActive = onlineHscmarkDetailVM.IsActive,
                            CreatedBy = onlineHscmarkDetailVM.CreatedBy,
                            CreatedDate = onlineHscmarkDetailVM.CreatedDate,
                            IsDeleted=false,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow
                        });
                        onlineHscmarkDetailsDeleteList.Add(onlineHscmarkDetailVM.Id);
                    }
                }
            }
            //IList<OnlineHscmarkDetail> onlineHscmarkDetailsEditList = new List<OnlineHscmarkDetail>();
            //IList<OnlineHscmarkDetail> onlineHscmarkDetailsAddList = new List<OnlineHscmarkDetail>();
            //var onlineHscmarkExistingDetail = onlineStudentAdmissions.OnlineHscmarkDetails.FirstOrDefault();

            //if (onlineStudentAdmissions.OnlineHscmarkDetails.Count == 0 && onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM != null && onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.Id == 0) // Add
            //{
            //    onlineHscmarkDetailsAddList.Add(new OnlineHscmarkDetail
            //    {
            //        OnlineStudentAdmissionId = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.OnlineStudentAdmissionId,
            //        ChemistryMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.ChemistryMarks,
            //        PhysicsMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.PhysicsMarks,
            //        MathsMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.MathsMarks,
            //        BiologyMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.BiologyMarks,
            //        EnglishMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.EnglishMarks,
            //        QualifyingTotal = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.QualifyingTotal,
            //        VocationSubject = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.VocationSubject,
            //        VocationSubjectMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.VocationSubjectMarks,
            //        IsActive = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.IsActive,
            //        IsDeleted = false,
            //        CreatedBy = userId,
            //        CreatedDate = DateTime.UtcNow
            //    });
            //}
            //else if (onlineStudentAdmissions.OnlineHscmarkDetails != null && onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM != null && onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.Id != 0)// Edit
            //{
            //    var onlineExstingHSCData = onlineStudentAdmissions.OnlineHscmarkDetails.FirstOrDefault();
            //    if (onlineExstingHSCData != null)
            //    {
            //        onlineExstingHSCData.Id = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.Id;
            //        onlineExstingHSCData.OnlineStudentAdmissionId = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.OnlineStudentAdmissionId;
            //        onlineExstingHSCData.ChemistryMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.ChemistryMarks;
            //        onlineExstingHSCData.PhysicsMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.PhysicsMarks;
            //        onlineExstingHSCData.MathsMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.MathsMarks;
            //        onlineExstingHSCData.BiologyMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.BiologyMarks;
            //        onlineExstingHSCData.EnglishMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.EnglishMarks;
            //        onlineExstingHSCData.QualifyingTotal = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.QualifyingTotal;
            //        onlineExstingHSCData.VocationSubject = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.VocationSubject;
            //        onlineExstingHSCData.VocationSubjectMarks = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.VocationSubjectMarks;
            //        onlineExstingHSCData.IsActive = onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM.IsActive;
            //        onlineExstingHSCData.IsDeleted = false;
            //        onlineExstingHSCData.UpdatedBy = userId;
            //        onlineExstingHSCData.UpdatedDate = DateTime.UtcNow;
            //        onlineHscmarkDetailsEditList.Add(onlineExstingHSCData);
            //    }
            //}
            //else if (onlineStudentAdmissions.OnlineHscmarkDetails != null && onlineAdmissionAcademicDetailsVM.onlineHscmarkDetailsVM?.OnlineStudentAdmissionId == 0)
            //{
            //    var onlineExstingHSCData = onlineStudentAdmissions.OnlineHscmarkDetails.FirstOrDefault();
            //    if (onlineExstingHSCData != null)
            //    {
            //        onlineExstingHSCData.IsDeleted = true;
            //        onlineExstingHSCData.UpdatedBy = userId;
            //        onlineExstingHSCData.UpdatedDate = DateTime.UtcNow;
            //        onlineHscmarkDetailsEditList.Add(onlineExstingHSCData);
            //    }
            //}
            //else if (onlineStudentAdmissions.OnlineHscmarkDetails != null)
            //{
            //    var onlineExstingHSCData = onlineStudentAdmissions.OnlineHscmarkDetails.FirstOrDefault();
            //    if (onlineExstingHSCData != null)
            //    {
            //        onlineHscmarkDetailsEditList.Add(onlineExstingHSCData);
            //    }
            //}
            #endregion OnlineHscmarkDetail

            #region OnlineEntranceExamDetail
            // VM to Model OnlineEntranceExamDetail
            IList<OnlineEntranceExamDetail> onlineEntranceExamDetailsEditList = new List<OnlineEntranceExamDetail>();
            IList<OnlineEntranceExamDetail> onlineEntranceExamDetailsAddList = new List<OnlineEntranceExamDetail>();
            IList<long> onlineEntranceExamDetailsDeleteList = new List<long>();
            if (onlineAdmissionAcademicDetailsVM.onlineEntranceExamDetailsVMList?.Count > 0)
            {
                foreach (var onlineEntranceExamDetailsVM in onlineAdmissionAcademicDetailsVM.onlineEntranceExamDetailsVMList)
                {
                    if (onlineEntranceExamDetailsVM.Id == 0)
                    {
                        onlineEntranceExamDetailsAddList.Add(new OnlineEntranceExamDetail
                        {
                            OnlineStudentAdmissionId = onlineEntranceExamDetailsVM.OnlineStudentAdmissionId,
                            EntranceType = onlineEntranceExamDetailsVM.EntranceType,
                            RollNumber = onlineEntranceExamDetailsVM.RollNumber,
                            PhysicsMarks = onlineEntranceExamDetailsVM.PhysicsMarks,
                            ChemistryMarks = onlineEntranceExamDetailsVM.ChemistryMarks,
                            MathsMarks = onlineEntranceExamDetailsVM.MathsMarks,
                            TotalMarks = onlineEntranceExamDetailsVM.TotalMarks,
                            IsActive = onlineEntranceExamDetailsVM.IsActive,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow,
                        });
                    }
                    else
                    {
                        onlineEntranceExamDetailsEditList.Add(new OnlineEntranceExamDetail
                        {
                            Id = onlineEntranceExamDetailsVM.Id,
                            OnlineStudentAdmissionId = onlineEntranceExamDetailsVM.OnlineStudentAdmissionId,
                            EntranceType = onlineEntranceExamDetailsVM.EntranceType,
                            RollNumber = onlineEntranceExamDetailsVM.RollNumber,
                            PhysicsMarks = onlineEntranceExamDetailsVM.PhysicsMarks,
                            ChemistryMarks = onlineEntranceExamDetailsVM.ChemistryMarks,
                            MathsMarks = onlineEntranceExamDetailsVM.MathsMarks,
                            TotalMarks = onlineEntranceExamDetailsVM.TotalMarks,
                            IsActive = onlineEntranceExamDetailsVM.IsActive,
                            CreatedBy = onlineEntranceExamDetailsVM.CreatedBy,
                            CreatedDate = onlineEntranceExamDetailsVM.CreatedDate,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow
                        });
                        onlineEntranceExamDetailsDeleteList.Add(onlineEntranceExamDetailsVM.Id);
                    }
                }
            }
            #endregion OnlineEntranceExamDetail

            // Update exiting 
            onlineStudentAdmissions.OnlinePreviousAcademicDetails = onlinePreviousAcademicDetailsEditList;
            onlineStudentAdmissions.OnlineHscmarkDetails = onlineHscmarkDetailsEditList;
            onlineStudentAdmissions.OnlineEntranceExamDetails = onlineEntranceExamDetailsEditList;
            _context.UpdateRange(onlineStudentAdmissions);

            // Delete OnlinePerviousAcademicDetails 
            var existOnlinePerviousAcademicDetails = await _context.OnlinePreviousAcademicDetails.Where(o => o.OnlineStudentAdmissionId == onlineAdmissionAcademicDetailsVM.OnlineStudentAdmissionId && o.IsDeleted == false).Select(o => o.Id).ToListAsync();
            var onlinePerviousAcademicDetailsIds = existOnlinePerviousAcademicDetails.Except(onlinePreviousAcademicDetailsDeleteList).ToList();
            await _context.OnlinePreviousAcademicDetails.Where(o => onlinePerviousAcademicDetailsIds.Contains(o.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });
            
            // Add OnlinePerviousAcademicDetails                                                                                                                                                                                                     
            await _context.OnlinePreviousAcademicDetails.AddRangeAsync(onlinePreviousAcademicDetailsAddList);

            // Delete OnlineHscDetails 
            var existOnlineHscDetails = await _context.OnlineHscmarkDetails.Where(o => o.OnlineStudentAdmissionId == onlineAdmissionAcademicDetailsVM.OnlineStudentAdmissionId && o.IsDeleted == false).Select(o => o.Id).ToListAsync();
            var onlineHscDetailsIds = existOnlineHscDetails.Except(onlineHscmarkDetailsDeleteList).ToList();
            await _context.OnlineHscmarkDetails.Where(o => onlineHscDetailsIds.Contains(o.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });

            // Add HSC
            await _context.OnlineHscmarkDetails.AddRangeAsync(onlineHscmarkDetailsAddList);
            
            // Delete OnlineEntranceExamDetails 
            var existOnlineEntranceExamDetails = await _context.OnlineEntranceExamDetails.Where(o => o.OnlineStudentAdmissionId == onlineAdmissionAcademicDetailsVM.OnlineStudentAdmissionId && o.IsDeleted == false).Select(o => o.Id).ToListAsync();
            var OnlineEntranceExamDetailsIds = existOnlineEntranceExamDetails.Except(onlineEntranceExamDetailsDeleteList).ToList();
            await _context.OnlineEntranceExamDetails.Where(o => OnlineEntranceExamDetailsIds.Contains(o.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });

            // Add OnlineEntranceExamDetails                                                                                                                                                                                                   
            await _context.OnlineEntranceExamDetails.AddRangeAsync(onlineEntranceExamDetailsAddList);

            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Academic

        #region Bank
        /// <summary>
        /// UpsertonlineAdmissionBank
        /// </summary>
        /// <param name="onlineAdmissionBankDetailsVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertonlineAdmissionBank(OnlineAdmissionBankDetailsVM onlineAdmissionBankDetailsVM)
        {
            if (userId != onlineAdmissionBankDetailsVM.OnlineUserId)
                return null;
            var onlineStudentAdmissions = await _context.OnlineStudentAdmissions.Where(o => o.Id == onlineAdmissionBankDetailsVM.OnlineStudentAdmissionId && o.OnlineUserId == userId && o.CollegeId == collegeId && o.AcademicYearId == academicYearId).FirstOrDefaultAsync();
            if (onlineStudentAdmissions == null)
            {
                return null;
            }

            // VM to Model OnlineParentdetails
            IList<OnlineBankDetail> onlineBankDetailsEditList = new List<OnlineBankDetail>();
            IList<OnlineBankDetail> onlineBankDetailsAddList = new List<OnlineBankDetail>();
            IList<long> onlineBankDetailsDeleteList = new List<long>();

            if (onlineAdmissionBankDetailsVM.onlineBankDetailsVMList?.Count > 0)
            {
                foreach (var onlinebankDetailsVM in onlineAdmissionBankDetailsVM.onlineBankDetailsVMList)
                {
                    if (onlinebankDetailsVM.Id == 0) // Add
                    {
                        onlineBankDetailsAddList.Add(new OnlineBankDetail
                        {
                            BankName = onlinebankDetailsVM.BankName,
                            AccountNo = onlinebankDetailsVM.AccountNo,
                            Ifsccode = onlinebankDetailsVM.Ifsccode,
                            BranchName = onlinebankDetailsVM.BranchName,
                            BranchCode = onlinebankDetailsVM.BranchCode,
                            BankAddress = onlinebankDetailsVM.BankAddress,
                            PersonType = onlinebankDetailsVM.PersonType,
                            OnlineStudentAdmissionId = onlinebankDetailsVM.OnlineStudentAdmissionId,
                            AccountType = onlinebankDetailsVM.AccountType,
                            AccountHolderName = onlinebankDetailsVM.AccountHolderName,
                            Micrcode = onlinebankDetailsVM.Micrcode,
                            CanceledChequePath = onlinebankDetailsVM.CanceledChequePath,
                            IsAccLinkedWithAadhar = onlinebankDetailsVM.IsAccLinkedWithAadhar,
                            IsActive = onlinebankDetailsVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow,
                        });
                    }
                    else // Edit
                    {
                        onlineBankDetailsEditList.Add(new OnlineBankDetail
                        {
                            Id = onlinebankDetailsVM.Id,
                            BankName = onlinebankDetailsVM.BankName,
                            BranchName = onlinebankDetailsVM.BranchName,
                            AccountNo = onlinebankDetailsVM.AccountNo,
                            Ifsccode = onlinebankDetailsVM.Ifsccode,
                            BranchCode = onlinebankDetailsVM.BranchCode,
                            BankAddress = onlinebankDetailsVM.BankAddress,
                            PersonType = onlinebankDetailsVM.PersonType,
                            OnlineStudentAdmissionId = onlinebankDetailsVM.OnlineStudentAdmissionId,
                            AccountType = onlinebankDetailsVM.AccountType,
                            AccountHolderName = onlinebankDetailsVM.AccountHolderName,
                            Micrcode = onlinebankDetailsVM.Micrcode,
                            CanceledChequePath = onlinebankDetailsVM.CanceledChequePath,
                            IsAccLinkedWithAadhar = onlinebankDetailsVM.IsAccLinkedWithAadhar,
                            IsActive = onlinebankDetailsVM.IsActive,
                            CreatedBy = onlinebankDetailsVM.CreatedBy,
                            CreatedDate = onlinebankDetailsVM.CreatedDate,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow,
                        });
                        onlineBankDetailsDeleteList.Add(onlinebankDetailsVM.Id);
                    }
                }
            }

            // Update exiting 
            onlineStudentAdmissions.OnlineBankDetails = onlineBankDetailsEditList;
            _context.UpdateRange(onlineStudentAdmissions);

            // Delete OnlinePerviousAcademicDetails 
            var existOnlineBankDetails = await _context.OnlineBankDetails.Where(e => e.OnlineStudentAdmissionId == onlineAdmissionBankDetailsVM.OnlineStudentAdmissionId && e.IsDeleted == false).Select(e => e.Id).ToListAsync();
            var onlinePerviousBankDetailsIds = existOnlineBankDetails.Except(onlineBankDetailsDeleteList).ToList();
            await _context.OnlineBankDetails.Where(e => onlinePerviousBankDetailsIds.Contains(e.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });
            // Delete OnlinePerviousAcademicDetails                                                                                                                                                                                                     //_context.OnlinePerviousAcademicDetails.Update(res);
            await _context.OnlineBankDetails.AddRangeAsync(onlineBankDetailsAddList);

            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Bank
    }
}