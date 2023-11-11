using AdmissionWebAPI.Data;
using AdmissionWebAPI.Models;
using AdmissionWebAPI.RedisServices;
using AdmissionWebAPI.Services.Common.Contract;
using AdmissionWebAPI.Services.OfflineContract;
using AdmissionWebAPI.Utility;
using AdmissionWebAPI.ViewModels.Offline;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
using System.Text;

namespace AdmissionWebAPI.Services.OfflineImplementation
{
    public class OfflineAdmissionService : IOfflineAdmissionService
    {
        private readonly AdmissionDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly long academicYearId;
        private readonly long roleId;
        private readonly IGetMasterNameFromId _masterNameService;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetOfflineAdmission";

        public OfflineAdmissionService(AdmissionDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IGetMasterNameFromId masterNameService, IRedisService redisService)
        {
            _context = context;
            _masterNameService = masterNameService;
            _redisService = redisService;
            _httpContextAccessor = httpContextAccessor;

            string uId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("UserId"))?.Value;
            string cId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value;
            string ayId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("AcademicYearId"))?.Value;
            string rId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("RoleId"))?.Value;

            long.TryParse(uId, out userId);
            long.TryParse(cId, out collegeId);
            long.TryParse(ayId, out academicYearId);
            long.TryParse(rId, out roleId);
        }

        #region Get
        /// <summary>
        /// Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<OfflineAdmissionVM?> Get(long userId)
        {
            var response = new OfflineAdmissionVM();
            var responseList = await _redisService.GetRedisCacheData<List<OfflineAdmissionVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(o => o.UserId == userId).FirstOrDefault<OfflineAdmissionVM>();
            else
            {
                response = await _context.StudentAdmissions.Where(o => o.CollegeId == collegeId && o.AcademicYearId == academicYearId && o.UserId == userId && o.IsDeleted == false).Select(o => new OfflineAdmissionVM()
                {
                    Id = o.Id,
                    CollegeId = collegeId,
                    UserId = userId,
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
                    NoOfSiblings = o.NoOfSiblings,
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
                    CorrespondenceFlatNo = o.CorrespondenceFlatNo,
                    CorrespondenceCountryId = o.CorrespondenceCountryId,
                    CorrespondenceCity = o.CorrespondenceCity,
                    CorrespondenceStateId = o.CorrespondenceStateId,
                    CorrespondenceDistrictId = o.CorrespondenceDistrictId,
                    CorrespondenceTalukaId = o.CorrespondenceTalukaId,
                    CorrespondencePinCode = o.CorrespondencePinCode,
                    CorrespondenceLandMark = o.CorrespondenceLandMark,
                    CorrespondenceAddressMigration = o.CorrespondenceAddressMigration,
                    LocalFlatNo = o.LocalFlatNo,
                    LocalBuildingName = o.LocalBuildingName,
                    LocalCountryId = o.LocalCountryId,
                    LocalCity = o.LocalCity,
                    LocalStateId = o.LocalStateId,
                    LocalDistrictId = o.LocalDistrictId,
                    LocalTalukaId = o.LocalTalukaId,
                    LocalPinCode = o.LocalPinCode,
                    LocalLandMark = o.LocalLandMark,
                    IsProfileComplete = o.IsProfileComplete,
                    DrivingLicenceNo = o.DrivingLicenceNo,
                    IsPermanantCommunication = o.IsPermanantCommunication,
                    IsCorrespondenceCommunication = o.IsCorrespondenceCommunication,
                    IsLocalCommunication = o.IsLocalCommunication,
                    ParentMailId = o.ParentMailId,
                    ParentMobileNo = o.ParentMobileNo,
                    AdmisssionDate = o.AdmisssionDate,
                    ApplicationFor = o.ApplicationFor,
                    Region = o.Region,
                    EligiblityNo = o.EligiblityNo,
                    IsActive = o.IsActive,
                    CreatedBy = o.CreatedBy,
                    CreatedDate = o.CreatedDate,
                    UpdatedBy = o.UpdatedBy,
                    UpdatedDate = o.UpdatedDate,

                    #region StudAcademicYear
                    offlineStudAdmissionAYDetailInsertVM = o.StudAdmissionAcademicYearDetails.Where(ay => ay.IsDeleted == false).Select(ay => new OfflineStudAdmissionAYDetailInsertVM()
                    {
                        Id = ay.Id,
                        AcademicYearId = ay.AcademicYearId,
                        ProgramYearId = ay.ProgramYearId,
                        BranchId = ay.BranchId,
                        AcademicStatusId = ay.AcademicStatusId,
                        ReasonOfAcademicStatus = ay.ReasonOfAcademicStatus,
                        AdmissionCategoryId = ay.AdmissionCategoryId,
                        AnnualIncomeId = ay.AnnualIncomeId,
                        ProgramId = ay.ProgramId,
                        ExamStatus = ay.ExamStatus,
                        PassoutStatus = ay.PassoutStatus,
                        IsActive = ay.IsActive,
                        CreatedBy = ay.CreatedBy,
                        CreatedDate = ay.CreatedDate,
                        UpdatedBy = ay.UpdatedBy,
                        UpdatedDate = ay.UpdatedDate,
                    }).FirstOrDefault<OfflineStudAdmissionAYDetailInsertVM>(),
                    #endregion StudAcademicYear

                    #region Parent
                    offlineParentDetailsVMList = o.ParentDetails.Where(pd => pd.IsDeleted == false).Select(pd => new OfflineParentDetailsVM()
                    {
                        Id = pd.Id,
                        Title = pd.Title,
                        Gender = pd.Gender,
                        MobileNo = pd.MobileNo,
                        StudentAdmissionId = pd.StudentAdmissionId,
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
                        WhatsAppMobileNo = pd.WhatsAppMobileNo,
                        MailId = pd.MailId,
                        IsDefaultCommunication = pd.IsDefaultCommunication,
                        GuaradianRelation = pd.GuaradianRelation,
                        GuaradianAddress = pd.GuaradianAddress,
                        IsActive = pd.IsActive,
                        CreatedBy = pd.CreatedBy,
                        CreatedDate = pd.CreatedDate,
                        UpdatedBy = pd.UpdatedBy,
                        UpdatedDate = pd.UpdatedDate
                    }).ToList<OfflineParentDetailsVM>(),
                    #endregion Parent

                    #region Pervious Academic
                    offlinePreviousAcademicDetailsVMList = o.PreviousAcademicDetails.Where(pa => pa.IsDeleted == false).Select(pa => new OfflinePreviousAcademicDetailsVM()
                    {
                        Id = pa.Id,
                        StudentAdmissionId = pa.StudentAdmissionId,
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
                    }).ToList<OfflinePreviousAcademicDetailsVM>(),
                    #endregion Pervious Academic

                    #region HSC Mark
                    offlineHscmarkDetailVMList = o.HscmarkDetails.Where(hsc => hsc.IsDeleted == false).Select(hsc => new OfflineHscmarkDetailVM()
                    {
                        Id = hsc.Id,
                        StudentAdmissionId = hsc.StudentAdmissionId,
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
                    }).ToList<OfflineHscmarkDetailVM>(),

                    #endregion HSC Mark

                    #region EntranceExam
                    offlineEntranceExamDetailsVMList = o.EntranceExamDetails.Where(eo => eo.IsDeleted == false).Select(eo => new OfflineEntranceExamDetailsVM()
                    {
                        Id = eo.Id,
                        StudentAdmissionId = eo.StudentAdmissionId,
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
                    }).ToList<OfflineEntranceExamDetailsVM>(),
                    #endregion EntranceExam

                    #region Bank
                    offlineBankDetailsVMList = o.BankDetails.Where(b => b.IsDeleted == false).Select(b => new OfflineBankDetailsVM()
                    {
                        Id = b.Id,
                        StudentAdmissionId = b.StudentAdmissionId,
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
                    }).ToList<OfflineBankDetailsVM>(),
                    #endregion Bank

                    #region Insurance
                    offlineInsuranceDetailsVMList = o.InsuranceDetails.Where(I => I.IsDeleted == false).Select(I => new OfflineInsuranceDetailsVM()
                    {
                        Id = I.Id,
                        StudentAdmissionId = I.StudentAdmissionId,
                        LastName = I.LastName,
                        FirstName = I.FirstName,
                        MiddleName = I.MiddleName,
                        Relation = I.Relation,
                        StudentParentBeneficiary = I.StudentParentBeneficiary,
                        StudentParentBenefit = I.StudentParentBenefit,
                        SumInsured = I.SumInsured,
                        InsurancePremium = I.InsurancePremium,
                        DateOfBirth = I.DateOfBirth,
                        Age = I.Age,
                        AadharNo = I.AadharNo,
                        IsActive = I.IsActive,
                        CreatedBy = I.CreatedBy,
                        CreatedDate = I.CreatedDate,
                        UpdatedBy = I.UpdatedBy,
                        UpdatedDate = I.UpdatedDate
                    }).ToList<OfflineInsuranceDetailsVM>(),
                    #endregion Insurance

                    #region VehicleInformations
                    offlineVehicleInformationsVMList = o.VehicleInformations.Where(V => V.IsDeleted == false).Select(V => new OfflineVehicleInformationsVM()
                    {
                        Id = V.Id,
                        StudentAdmissionId = V.StudentAdmissionId,
                        VehicleType = V.VehicleType,
                        NoOfVehicle = V.NoOfVehicle,
                        VehicleNo = V.VehicleNo,
                        VehicleInsurancePolicyNo = V.VehicleInsurancePolicyNo,
                        Puc = V.Puc,
                        Rc = V.Rc,
                        Rcvalidity = V.Rcvalidity,
                        VehicleOwnerName = V.VehicleOwnerName,
                        ValidityOfLicence = V.ValidityOfLicence,
                        EngineNo = V.EngineNo,
                        DrivingLicence = V.DrivingLicence,
                        ChassisNo = V.ChassisNo,
                        VehicleRegistrationNo = V.VehicleRegistrationNo,
                        IsActive = V.IsActive,
                        CreatedBy = V.CreatedBy,
                        CreatedDate = V.CreatedDate,
                        UpdatedBy = V.UpdatedBy,
                        UpdatedDate = V.UpdatedDate
                    }).ToList<OfflineVehicleInformationsVM>()
                    #endregion Insurance

                }).FirstOrDefaultAsync<OfflineAdmissionVM>();
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
        /// <param name="offlineCommonStudentVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(OfflineCommonStudentInsertVM offlineCommonStudentVM)
        {
            long id = 0;
            var res = await _context.StudentAdmissions.Where(o => o.CollegeId == collegeId && o.StudentMailId == offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.StudentMailId.Trim() && o.AcademicYearId == academicYearId && o.IsActive  && o.IsDeleted == false).FirstOrDefaultAsync();
            if (res == null) // One time Insert for the OnlineUserId
            {
                //gererate Student Code                            
                long? ayid = academicYearId;
                long? bid = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM?.BranchId;

                //Fetch Academic Year Name & Branch Prefix From Master
                string? academicYearName = await _masterNameService.GetMasterNameFromIdAPI("AcademicYearMasters", academicYearId);
                string branchPrefixOptionsData = await _masterNameService.GetMasterNameFromIdAPI("BranchMasters", bid);

                long? maxstudentCodeId = await _context.StudentAdmissions.Include(s => s.StudAdmissionAcademicYearDetails).Where
                (s => s.StudAdmissionAcademicYearDetails.Any(sa => sa.AcademicYearId == ayid && sa.BranchId == bid)).Select
                (s => s.StudentCodeId).MaxAsync();

                long studentCodeId = maxstudentCodeId ?? 0;
                studentCodeId += 1;
                string studentCode = string.Empty;

                if (academicYearName != null && branchPrefixOptionsData != null)
                {
                    if (offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM?.AdmittedThrough == 1) // C-220001
                        studentCode += $"{branchPrefixOptionsData.Trim()}-{academicYearName.Split('-')[0].Substring(2, 2)}{studentCodeId.ToString("D4")}";
                    else if (offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM?.AdmittedThrough == 2) // C-D22001
                        studentCode += $"{branchPrefixOptionsData.Trim()}-D{academicYearName.Split('-')[0].Substring(2, 2)}{studentCodeId.ToString("D3")}";
                }
                EntityEntry<StudentAdmission> created = await _context.StudentAdmissions.AddAsync(new StudentAdmission()
                {                  
                    CollegeId = collegeId,
                    AcademicYearId = academicYearId,
                    DomicileId = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.DomicileId,
                    SeatTypeId = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.SeatTypeId,
                    AdmisssionDate = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.AdmisssionDate,
                    StudentCategoryId = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.StudentCategoryId,
                    AllotmentCategory = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.AllotmentCategory,
                    AdmittedThrough = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.AdmittedThrough,
                    Title = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.Title,
                    LastName = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.LastName,
                    FirstName = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.FirstName,
                    MiddleName = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.MiddleName,
                    MobileNo = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.MobileNo,
                    Gender = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.Gender,
                    DateOfBirth = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.DateOfBirth,
                    StudentMailId = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.StudentMailId,
                    StudentCodeId = studentCodeId,
                    StudentCode = studentCode,
                    ParentMailId = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.ParentMailId,
                    ParentMobileNo = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.ParentMobileNo,
                    IsActive = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.IsActive,
                    IsDeleted = false,
                    CreatedBy = userId,
                    CreatedDate = DateTime.UtcNow
                });
                if (_context.SaveChanges() > 0)
                {
                    await _redisService.RemoveRedisCacheData(getAllCacheKey);
                    id = created.Entity.Id;
                    await _context.StudAdmissionAcademicYearDetails.AddAsync(new StudAdmissionAcademicYearDetail()
                    {
                        StudentAdmissionId = id,
                        AcademicYearId = academicYearId,
                        AcademicStatusId = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.AcademicStatusId,
                        ReasonOfAcademicStatus = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.ReasonOfAcademicStatus,
                        AdmissionCategoryId = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.AdmissionCategoryId,
                        AnnualIncomeId = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.AnnualIncomeId,
                        ProgramId = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.ProgramId,
                        ExamStatus = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.ExamStatus,
                        PassoutStatus = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.PassoutStatus,
                        IsActive = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.IsActive,
                        ProgramYearId = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.ProgramYearId,
                        BranchId = offlineCommonStudentVM.offlineStudAdmissionAYDetailsInsertVM.BranchId,
                        IsDeleted = false,
                        CreatedBy = userId,
                        CreatedDate = DateTime.UtcNow
                    });
                    if (_context.SaveChanges() > 0)
                    {
                        await _redisService.RemoveRedisCacheData(getAllCacheKey);
                        // Insert into UserMaster using RMQ 
                        var Fullname = $"{offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.FirstName} {offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.MiddleName} {offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.LastName}";

                        OfflineAdmissionApproveDataVM offlineAdmissionApproveDataVM = new OfflineAdmissionApproveDataVM
                        {
                            studentAdmissionId = id,
                            CollegeId = collegeId,
                            AcademicYearId = academicYearId,
                            RoleId = Convert.ToInt32(StaticConfigurationManager.AppSetting["RolesIds:OfflineUserRoleId"]), // Offline Role ID                             
                            DepartmentId = 1,
                            StudentMailId = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.StudentMailId,
                            FirstName = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.FirstName,
                            Mobile = offlineCommonStudentVM.offlineAdmissionStudentDetailsInsertVM.MobileNo,
                            createdBy = userId // Staff                        
                        };

                        // HTTP Call to OfflineUserReg
                        long? offlineuserId = await this.OfflineUserReg(offlineAdmissionApproveDataVM);
                        if (offlineuserId.HasValue)
                        {
                            // Update Id as UserId into StudentAdmissionTable
                            var studentAdmissions = await _context.StudentAdmissions.FindAsync(id);
                            studentAdmissions.UserId = offlineuserId.Value;
                            _context.Entry(studentAdmissions).State = EntityState.Modified;
                            _context.SaveChanges();
                            return id;
                        }
                    }
                }
            }
            else
                return 0;
            return null;
        }
        #endregion Insert

        #region Program
        /// <summary>
        /// UpsertofflineAdmissionProgram
        /// </summary>
        /// <param name="offlineCommonVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertofflineAdmissionProgram(OfflineCommonVM offlineCommonVM)
        {
            var programInfo = await _context.StudentAdmissions.FirstOrDefaultAsync(e => e.CollegeId == collegeId /*&& b.UserId == userId*/ && e.AcademicYearId == academicYearId  && e.Id == offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.StudentAdmissionId);
            {
                if (programInfo != null)
                {
                    programInfo.UserId = userId;
                    programInfo.CollegeId = collegeId;
                    programInfo.StudentCode = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.StudentCode;
                    programInfo.Prnno = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.Prnno;
                    programInfo.MahaDbtApplicationNo = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.MahaDbtApplicationNo;
                    programInfo.CandidatureTypeId = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.CandidatureTypeId;
                    programInfo.StateMeritListNo = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.StateMeritListNo;
                    programInfo.NationalMeritListNo = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.NationalMeritListNo;
                    programInfo.StateMeritMarks = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.StateMeritMarks;
                    programInfo.NationalMeritMarks = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.NationalMeritMarks;
                    programInfo.SeatTypeId = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.SeatTypeId;
                    programInfo.ModeOfAdmission = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.ModeOfAdmission;
                    programInfo.AdmisssionDate = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.AdmisssionDate;
                    programInfo.AdmittedThrough = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.AdmittedThrough;
                    programInfo.EligiblityNo = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.EligiblityNo;
                    programInfo.Region = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.Region;
                    programInfo.IsActive = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.IsActive;
                    programInfo.CreatedBy = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.CreatedBy;
                    programInfo.CreatedDate = offlineCommonVM.offlineAdmissionStudentProgramDetailsVM.CreatedDate;
                    programInfo.UpdatedBy = userId;
                    programInfo.UpdatedDate = DateTime.UtcNow;
                }
                _context.Entry(programInfo).State = EntityState.Modified;
                _context.SaveChanges();
            }
            var studentAYDetails = await _context.StudAdmissionAcademicYearDetails.FirstOrDefaultAsync(e => e.StudentAdmissionId == offlineCommonVM.offlineStudAdmissionAYDetailVM.StudentAdmissionId);
            if (studentAYDetails != null)
            {
                studentAYDetails.StudentAdmissionId = offlineCommonVM.offlineStudAdmissionAYDetailVM.StudentAdmissionId;
                studentAYDetails.ProgramYearId = offlineCommonVM.offlineStudAdmissionAYDetailVM.ProgramYearId;
                studentAYDetails.BranchId = offlineCommonVM.offlineStudAdmissionAYDetailVM.BranchId;
                studentAYDetails.AcademicStatusId = offlineCommonVM.offlineStudAdmissionAYDetailVM.AcademicStatusId;
                studentAYDetails.ReasonOfAcademicStatus = offlineCommonVM.offlineStudAdmissionAYDetailVM.ReasonOfAcademicStatus;
                studentAYDetails.IsActive = offlineCommonVM.offlineStudAdmissionAYDetailVM.IsActive;
                studentAYDetails.IsDeleted = false;
                studentAYDetails.CreatedBy = offlineCommonVM.offlineStudAdmissionAYDetailVM.CreatedBy;
                studentAYDetails.CreatedDate = offlineCommonVM.offlineStudAdmissionAYDetailVM.CreatedDate;
                studentAYDetails.UpdatedBy = userId;
                studentAYDetails.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(studentAYDetails).State = EntityState.Modified;
            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Program

        #region StudentDetails
        /// <summary>
        /// UpsertofflineAdmissionStudent
        /// </summary>
        /// <param name="offlineStudentAdmissionVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertofflineAdmissionStudent(OfflineAdmissionStudentDetailsVM offlineStudentAdmissionVM)
        {
            var studentAdmission = await _context.StudentAdmissions.Where(o => o.CollegeId == offlineStudentAdmissionVM.CollegeId /*&& o.UserId == userId*/ && o.AcademicYearId == offlineStudentAdmissionVM.AcademicYearId &&  o.Id == offlineStudentAdmissionVM.StudentAdmissionId).Include(o => o.StudAdmissionAcademicYearDetails).FirstOrDefaultAsync();
            if (studentAdmission != null)
            {
                studentAdmission.UserId=userId;
                studentAdmission.CollegeId = offlineStudentAdmissionVM.CollegeId;
                studentAdmission.Title = offlineStudentAdmissionVM.Title;
                studentAdmission.LastName = offlineStudentAdmissionVM.LastName;
                studentAdmission.FirstName = offlineStudentAdmissionVM.FirstName;
                studentAdmission.MiddleName = offlineStudentAdmissionVM.MiddleName;
                studentAdmission.NameAsMarkSheet = offlineStudentAdmissionVM.NameAsMarkSheet;
                studentAdmission.Gender = offlineStudentAdmissionVM.Gender;
                studentAdmission.DateOfBirth = offlineStudentAdmissionVM.DateOfBirth;
                studentAdmission.PlaceOfBirth = offlineStudentAdmissionVM.PlaceOfBirth;
                studentAdmission.BloodGroup = offlineStudentAdmissionVM.BloodGroup;
                studentAdmission.MotherTounge = offlineStudentAdmissionVM.MotherTounge;
                studentAdmission.Nationality = offlineStudentAdmissionVM.Nationality;
                studentAdmission.DomicileId = offlineStudentAdmissionVM.DomicileId;
                studentAdmission.ChildNoInFamily = offlineStudentAdmissionVM.ChildNoInFamily;
                studentAdmission.NoOfSiblings = offlineStudentAdmissionVM.NoOfSiblings;
                studentAdmission.AadharNo = offlineStudentAdmissionVM.AadharNo;
                studentAdmission.PanNo = offlineStudentAdmissionVM.PanNo;
                studentAdmission.VoterId = offlineStudentAdmissionVM.VoterId;
                studentAdmission.PassportNo = offlineStudentAdmissionVM.PassportNo;
                studentAdmission.MaritalStatus = offlineStudentAdmissionVM.MaritalStatus;
                studentAdmission.LanguageKnown = offlineStudentAdmissionVM.LanguageKnown;
                studentAdmission.PhysicallyChallaged = offlineStudentAdmissionVM.PhysicallyChallaged;
                studentAdmission.DisabilityType = offlineStudentAdmissionVM.DisabilityType;
                studentAdmission.IsDefenceParent = offlineStudentAdmissionVM.IsDefenceParent;
                studentAdmission.DefenceType = offlineStudentAdmissionVM.DefenceType;
                studentAdmission.ReligionId = offlineStudentAdmissionVM.ReligionId;
                studentAdmission.StudentCategoryId = offlineStudentAdmissionVM.StudentCategoryId;
                studentAdmission.CasteId = offlineStudentAdmissionVM.CasteId;
                studentAdmission.SubCasteId = offlineStudentAdmissionVM.SubCasteId;
                studentAdmission.IsMinority = offlineStudentAdmissionVM.IsMinority;
                studentAdmission.MinorityId = offlineStudentAdmissionVM.MinorityId;
                studentAdmission.MinorityDetailsId = offlineStudentAdmissionVM.MinorityDetailsId;
                studentAdmission.StudentMailId = offlineStudentAdmissionVM.StudentMailId;
                studentAdmission.MobileNo = offlineStudentAdmissionVM.MobileNo;
                studentAdmission.DrivingLicenceNo = offlineStudentAdmissionVM.DrivingLicenceNo;
                studentAdmission.Region = offlineStudentAdmissionVM.Region;
                studentAdmission.WhatsAppMobileNo = offlineStudentAdmissionVM.WhatsAppMobileNo;
                studentAdmission.StudentMailId = offlineStudentAdmissionVM.StudentMailId;
                studentAdmission.EmergencyContactNo = offlineStudentAdmissionVM.EmergencyContactNo;
                studentAdmission.PassportExpiryDate = offlineStudentAdmissionVM.PassportExpiryDate;
                studentAdmission.UpdatedBy = offlineStudentAdmissionVM.UpdatedBy;
                studentAdmission.UpdatedDate = offlineStudentAdmissionVM.UpdatedDate;
                studentAdmission.IsActive = offlineStudentAdmissionVM.IsActive;
                studentAdmission.CreatedBy = offlineStudentAdmissionVM.CreatedBy;
                studentAdmission.CreatedDate = offlineStudentAdmissionVM.CreatedDate;
                studentAdmission.UpdatedBy = userId;
                studentAdmission.UpdatedDate = DateTime.UtcNow;

                // Child Table Record Exist
                IList<StudAdmissionAcademicYearDetail> studAdmissionAcademicYearDetailsList = new List<StudAdmissionAcademicYearDetail>();
                var studAdmissionAcademicYearExitingDetails = studentAdmission.StudAdmissionAcademicYearDetails.FirstOrDefault();
                if (studAdmissionAcademicYearExitingDetails != null)
                {
                    studAdmissionAcademicYearExitingDetails.AnnualIncomeId = offlineStudentAdmissionVM.AnnualIncomeId;
                    studAdmissionAcademicYearExitingDetails.AcademicYearId = offlineStudentAdmissionVM.AcademicYearId;
                    studAdmissionAcademicYearExitingDetails.IsActive = offlineStudentAdmissionVM.IsActive;
                    studAdmissionAcademicYearExitingDetails.CreatedBy = offlineStudentAdmissionVM.CreatedBy;
                    studAdmissionAcademicYearExitingDetails.CreatedDate = offlineStudentAdmissionVM.CreatedDate;
                    studAdmissionAcademicYearExitingDetails.UpdatedBy = userId;
                    studAdmissionAcademicYearExitingDetails.UpdatedDate = DateTime.UtcNow;
                    studAdmissionAcademicYearDetailsList.Add(studAdmissionAcademicYearExitingDetails);
                    studentAdmission.StudAdmissionAcademicYearDetails = studAdmissionAcademicYearDetailsList;
                }
                _context.UpdateRange(studentAdmission);
                if (_context.SaveChanges() > 0)
                {
                    await _redisService.RemoveRedisCacheData(getAllCacheKey);
                    return true;
                }
            }
            return null;
        }
        #endregion StudentDetails

        #region Communication
        /// <summary>
        /// UpsertofflineAdmissionCommunication
        /// </summary>
        /// <param name="offlineAdmissionCommunicationDetailsVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertofflineAdmissionCommunication(OfflineAdmissionCommunicationDetailsVM offlineAdmissionCommunicationDetailsVM)
        {
            var offlineCommunicationDetails = await _context.StudentAdmissions.FirstOrDefaultAsync(e => e.CollegeId == collegeId /*&& e.UserId == userId*/ && e.AcademicYearId == academicYearId  && e.Id == offlineAdmissionCommunicationDetailsVM.StudentAdmissionId);
            if (offlineCommunicationDetails != null)
            {
                offlineCommunicationDetails.UserId = userId;
                offlineCommunicationDetails.PermanentFlatNo = offlineAdmissionCommunicationDetailsVM.PermanentFlatNo;
                offlineCommunicationDetails.PermanentBuildingName = offlineAdmissionCommunicationDetailsVM.PermanentBuildingName;
                offlineCommunicationDetails.PermanentCountryId = offlineAdmissionCommunicationDetailsVM.PermanentCountryId;
                offlineCommunicationDetails.PermanentCity = offlineAdmissionCommunicationDetailsVM.PermanentCity;
                offlineCommunicationDetails.PermanentStateId = offlineAdmissionCommunicationDetailsVM.PermanentStateId;
                offlineCommunicationDetails.PermanentDistrictId = offlineAdmissionCommunicationDetailsVM.PermanentDistrictId;
                offlineCommunicationDetails.PermanentTalukaId = offlineAdmissionCommunicationDetailsVM.PermanentTalukaId;
                offlineCommunicationDetails.PermanentPinCode = offlineAdmissionCommunicationDetailsVM.PermanentPinCode;
                offlineCommunicationDetails.PermanentLandMark = offlineAdmissionCommunicationDetailsVM.PermanentLandMark;
                offlineCommunicationDetails.CorrespondenceFlatNo = offlineAdmissionCommunicationDetailsVM.CorrespondenceFlatNo;
                offlineCommunicationDetails.CorrespondenceBuildingName = offlineAdmissionCommunicationDetailsVM.CorrespondenceBuildingName;
                offlineCommunicationDetails.CorrespondenceCountryId = offlineAdmissionCommunicationDetailsVM.CorrespondenceCountryId;
                offlineCommunicationDetails.CorrespondenceCity = offlineAdmissionCommunicationDetailsVM.CorrespondenceCity;
                offlineCommunicationDetails.CorrespondenceStateId = offlineAdmissionCommunicationDetailsVM.CorrespondenceStateId;
                offlineCommunicationDetails.CorrespondenceDistrictId = offlineAdmissionCommunicationDetailsVM.CorrespondenceDistrictId;
                offlineCommunicationDetails.CorrespondenceTalukaId = offlineAdmissionCommunicationDetailsVM.CorrespondenceTalukaId;
                offlineCommunicationDetails.CorrespondencePinCode = offlineAdmissionCommunicationDetailsVM.CorrespondencePinCode;
                offlineCommunicationDetails.CorrespondenceLandMark = offlineAdmissionCommunicationDetailsVM.CorrespondenceLandMark;
                offlineCommunicationDetails.LocalFlatNo = offlineAdmissionCommunicationDetailsVM.LocalFlatNo;
                offlineCommunicationDetails.LocalBuildingName = offlineAdmissionCommunicationDetailsVM.LocalBuildingName;
                offlineCommunicationDetails.LocalCountryId = offlineAdmissionCommunicationDetailsVM.LocalCountryId;
                offlineCommunicationDetails.LocalCity = offlineAdmissionCommunicationDetailsVM.LocalCity;
                offlineCommunicationDetails.LocalStateId = offlineAdmissionCommunicationDetailsVM.LocalStateId;
                offlineCommunicationDetails.LocalDistrictId = offlineAdmissionCommunicationDetailsVM.LocalDistrictId;
                offlineCommunicationDetails.LocalTalukaId = offlineAdmissionCommunicationDetailsVM.LocalTalukaId;
                offlineCommunicationDetails.LocalPinCode = offlineAdmissionCommunicationDetailsVM.LocalPinCode;
                offlineCommunicationDetails.LocalLandMark = offlineAdmissionCommunicationDetailsVM.LocalLandMark;
                offlineCommunicationDetails.IsPermanantCommunication = offlineAdmissionCommunicationDetailsVM.IsPermanantCommunication;
                offlineCommunicationDetails.IsCorrespondenceCommunication = offlineAdmissionCommunicationDetailsVM.IsCorrespondenceCommunication;
                offlineCommunicationDetails.IsLocalCommunication = offlineAdmissionCommunicationDetailsVM.IsLocalCommunication;
                offlineCommunicationDetails.IsActive = offlineAdmissionCommunicationDetailsVM.IsActive;
                offlineCommunicationDetails.UpdatedBy = userId;
                offlineCommunicationDetails.UpdatedDate = DateTime.UtcNow;
            }
            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Communication

        #region Parent
        /// <summary>
        /// UpsertofflineAdmissionParent
        /// </summary>
        /// <param name="offlineAdmissionParentDetailsVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertofflineAdmissionParent(OfflineAdmissionParentDetailsVM offlineAdmissionParentDetailsVM)
        {
            var studentAdmissions = await _context.StudentAdmissions.Where(o => o.CollegeId == collegeId /*&& o.UserId == userId*/ && o.AcademicYearId == academicYearId  && o.Id == offlineAdmissionParentDetailsVM.StudentAdmissionId).FirstOrDefaultAsync();
            if (studentAdmissions == null)
                return null;
            // VM to Model Parentdetails
            IList<ParentDetail> parentDetailsEditList = new List<ParentDetail>();
            IList<ParentDetail> parentDetailsAddList = new List<ParentDetail>();
            IList<long> parentDetailsDeleteList = new List<long>();

            if (offlineAdmissionParentDetailsVM.offlineParentDetailsVMList?.Count > 0)
            {
                foreach (var parentDetailsVM in offlineAdmissionParentDetailsVM.offlineParentDetailsVMList)
                {
                    if (parentDetailsVM.Id == 0) // Add
                    {
                        parentDetailsAddList.Add(new ParentDetail
                        {                           
                            StudentAdmissionId = parentDetailsVM.StudentAdmissionId,
                            Relation = parentDetailsVM.Relation,
                            LivingStatus = parentDetailsVM.LivingStatus,
                            Title = parentDetailsVM.Title,
                            LastName = parentDetailsVM.LastName,
                            MiddleName = parentDetailsVM.MiddleName,
                            FirstName = parentDetailsVM.FirstName,
                            Gender = parentDetailsVM.Gender,
                            DateOfBirth = parentDetailsVM.DateOfBirth,
                            Qualification = parentDetailsVM.Qualification,
                            Profession = parentDetailsVM.Profession,
                            EmployedIn = parentDetailsVM.EmployedIn,
                            OrganizationName = parentDetailsVM.OrganizationName,
                            Designation = parentDetailsVM.Designation,
                            Income = parentDetailsVM.Income,
                            WhatsAppMobileNo = parentDetailsVM.WhatsAppMobileNo,
                            MobileNo = parentDetailsVM.MobileNo,
                            MailId = parentDetailsVM.MailId,
                            IsDefaultCommunication = parentDetailsVM.IsDefaultCommunication,
                            GuaradianRelation = parentDetailsVM.GuaradianRelation,
                            GuaradianAddress = parentDetailsVM.GuaradianAddress,
                            IsActive = parentDetailsVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow,
                        });
                    }
                    else // Edit
                    {
                        parentDetailsEditList.Add(new ParentDetail
                        {
                            Id = parentDetailsVM.Id,
                            StudentAdmissionId = parentDetailsVM.StudentAdmissionId,
                            Relation = parentDetailsVM.Relation,
                            LivingStatus = parentDetailsVM.LivingStatus,
                            Title = parentDetailsVM.Title,
                            LastName = parentDetailsVM.LastName,
                            MiddleName = parentDetailsVM.MiddleName,
                            FirstName = parentDetailsVM.FirstName,
                            Gender = parentDetailsVM.Gender,
                            DateOfBirth = parentDetailsVM.DateOfBirth,
                            Qualification = parentDetailsVM.Qualification,
                            Profession = parentDetailsVM.Profession,
                            EmployedIn = parentDetailsVM.EmployedIn,
                            OrganizationName = parentDetailsVM.OrganizationName,
                            Designation = parentDetailsVM.Designation,
                            Income = parentDetailsVM.Income,
                            WhatsAppMobileNo = parentDetailsVM.WhatsAppMobileNo,
                            MobileNo = parentDetailsVM.MobileNo,
                            MailId = parentDetailsVM.MailId,
                            IsDefaultCommunication = parentDetailsVM.IsDefaultCommunication,
                            GuaradianRelation = parentDetailsVM.GuaradianRelation,
                            GuaradianAddress = parentDetailsVM.GuaradianAddress,
                            IsActive = parentDetailsVM.IsActive,
                            CreatedBy = parentDetailsVM.CreatedBy,
                            CreatedDate = parentDetailsVM.CreatedDate,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow,
                        });
                        parentDetailsDeleteList.Add(parentDetailsVM.Id);
                    }
                }
            }

            // Update exiting 
            studentAdmissions.ParentDetails = parentDetailsEditList;
            _context.UpdateRange(studentAdmissions);

            // Delete ParentDetails
            var existParentDetails = await _context.ParentDetails.Where(e => e.StudentAdmissionId == offlineAdmissionParentDetailsVM.StudentAdmissionId && e.IsDeleted == false).Select(e => e.Id).ToListAsync();
            var parentDetailsIds = existParentDetails.Except(parentDetailsDeleteList).ToList();
            await _context.ParentDetails.Where(e => parentDetailsIds.Contains(e.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });
            // Delete OfflineParentDetails                                                                                                                                                                                                     //_context.OnlinePerviousAcademicDetails.Update(res);
            await _context.ParentDetails.AddRangeAsync(parentDetailsAddList);

            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Parent      

        #region Academic
        /// <summary>
        /// 
        /// </summary>
        /// <param name="offlineAdmissionAcademicDetailsVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertofflineAdmissionAcademic(OfflineAdmissionAcademicDetailsVM offlineAdmissionAcademicDetailsVM)
        {
            var offlineStudentAdmissions = await _context.StudentAdmissions.Where(o => o.CollegeId == collegeId /*&& o.UserId == userId*/ && o.AcademicYearId == academicYearId  && o.Id == offlineAdmissionAcademicDetailsVM.StudentAdmissionId).FirstOrDefaultAsync();
            if (offlineStudentAdmissions == null)
            {
                return null;
            }
            // VM to Model OnlinePerviousAcademicDetail
            IList<PreviousAcademicDetail>? offlinePreviousAcademicDetailsEditList = new List<PreviousAcademicDetail>();
            IList<PreviousAcademicDetail> offlinePreviousAcademicDetailsAddList = new List<PreviousAcademicDetail>();
            IList<long> offlinePreviousAcademicDetailsDeleteList = new List<long>();
            if (offlineAdmissionAcademicDetailsVM.offlinePreviousAcademicDetailsVMList?.Count > 0)
            {
                foreach (var offlinePreviousAcademicDetailsVM in offlineAdmissionAcademicDetailsVM.offlinePreviousAcademicDetailsVMList)
                {
                    if (offlinePreviousAcademicDetailsVM.Id == 0) // Add
                    {
                        offlinePreviousAcademicDetailsAddList.Add(new PreviousAcademicDetail
                        {
                            StudentAdmissionId = offlinePreviousAcademicDetailsVM.StudentAdmissionId,
                            AcademicClass = offlinePreviousAcademicDetailsVM.AcademicClass,
                            SchoolCollege = offlinePreviousAcademicDetailsVM.SchoolCollege,
                            BoardUniversity = offlinePreviousAcademicDetailsVM.BoardUniversity,
                            Month = offlinePreviousAcademicDetailsVM.Month,
                            Year = offlinePreviousAcademicDetailsVM.Year,
                            SeatNo = offlinePreviousAcademicDetailsVM.SeatNo,
                            MarksObtained = offlinePreviousAcademicDetailsVM.MarksObtained,
                            OutOf = offlinePreviousAcademicDetailsVM.OutOf,
                            Percentage = offlinePreviousAcademicDetailsVM.Percentage,
                            IsActive = offlinePreviousAcademicDetailsVM.IsActive,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow
                        });
                    }
                    else // Edit
                    {
                        offlinePreviousAcademicDetailsEditList.Add(new PreviousAcademicDetail
                        {
                            Id = offlinePreviousAcademicDetailsVM.Id,
                            StudentAdmissionId = offlinePreviousAcademicDetailsVM.StudentAdmissionId,
                            AcademicClass = offlinePreviousAcademicDetailsVM.AcademicClass,
                            SchoolCollege = offlinePreviousAcademicDetailsVM.SchoolCollege,
                            BoardUniversity = offlinePreviousAcademicDetailsVM.BoardUniversity,
                            Month = offlinePreviousAcademicDetailsVM.Month,
                            Year = offlinePreviousAcademicDetailsVM.Year,
                            SeatNo = offlinePreviousAcademicDetailsVM.SeatNo,
                            MarksObtained = offlinePreviousAcademicDetailsVM.MarksObtained,
                            OutOf = offlinePreviousAcademicDetailsVM.OutOf,
                            Percentage = offlinePreviousAcademicDetailsVM.Percentage,
                            IsActive = offlinePreviousAcademicDetailsVM.IsActive,
                            CreatedBy = offlinePreviousAcademicDetailsVM.CreatedBy,
                            CreatedDate = offlinePreviousAcademicDetailsVM.CreatedDate,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow
                        });
                        offlinePreviousAcademicDetailsDeleteList.Add(offlinePreviousAcademicDetailsVM.Id);
                    }
                }
            }

            #region HscmarkDetails

            IList<HscmarkDetail> offlineHscmarkDetailsEditList = new List<HscmarkDetail>();
            IList<HscmarkDetail> offlineHscmarkDetailsAddList = new List<HscmarkDetail>();
            IList<long> offlineHscmarkDetailsDeleteList = new List<long>();
            if (offlineAdmissionAcademicDetailsVM.offlineHscmarkDetailsVMList?.Count > 0)
            {
                foreach (var offlineHscmarkDetailVM in offlineAdmissionAcademicDetailsVM.offlineHscmarkDetailsVMList)
                {
                    if (offlineHscmarkDetailVM.Id == 0)
                    { // Add
                        offlineHscmarkDetailsAddList.Add(new HscmarkDetail
                        {
                            StudentAdmissionId = offlineHscmarkDetailVM.StudentAdmissionId,
                            ChemistryMarks = offlineHscmarkDetailVM.ChemistryMarks,
                            PhysicsMarks = offlineHscmarkDetailVM.PhysicsMarks,
                            MathsMarks = offlineHscmarkDetailVM.MathsMarks,
                            BiologyMarks = offlineHscmarkDetailVM.BiologyMarks,
                            EnglishMarks = offlineHscmarkDetailVM.EnglishMarks,
                            QualifyingTotal = offlineHscmarkDetailVM.QualifyingTotal,
                            VocationSubject = offlineHscmarkDetailVM.VocationSubject,
                            VocationSubjectMarks = offlineHscmarkDetailVM.VocationSubjectMarks,
                            IsActive = offlineHscmarkDetailVM.IsActive,
                            IsDeleted=false,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow
                        });
                    }
                    else  // Edit
                    {
                        offlineHscmarkDetailsEditList.Add(new HscmarkDetail
                        {
                            Id = offlineHscmarkDetailVM.Id,
                            StudentAdmissionId = offlineHscmarkDetailVM.StudentAdmissionId,
                            ChemistryMarks = offlineHscmarkDetailVM.ChemistryMarks,
                            PhysicsMarks = offlineHscmarkDetailVM.PhysicsMarks,
                            MathsMarks = offlineHscmarkDetailVM.MathsMarks,
                            BiologyMarks = offlineHscmarkDetailVM.BiologyMarks,
                            EnglishMarks = offlineHscmarkDetailVM.EnglishMarks,
                            QualifyingTotal = offlineHscmarkDetailVM.QualifyingTotal,
                            VocationSubject = offlineHscmarkDetailVM.VocationSubject,
                            VocationSubjectMarks = offlineHscmarkDetailVM.VocationSubjectMarks,
                            IsActive = offlineHscmarkDetailVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow
                        });
                        offlineHscmarkDetailsDeleteList.Add(offlineHscmarkDetailVM.Id);
                    }
                }
            }

            #endregion HscmarkDetails
          
            // VM to Model OfflineEntranceExamDetail
            IList<EntranceExamDetail> offlineEntranceExamDetailsEditList = new List<EntranceExamDetail>();
            IList<EntranceExamDetail> offlineEntranceExamDetailsAddList = new List<EntranceExamDetail>();
            IList<long> offlineEntranceExamDetailsDeleteList = new List<long>();
            if (offlineAdmissionAcademicDetailsVM.offlineEntranceExamDetailsVMList?.Count > 0)
            {
                foreach (var offlineEntranceExamDetailsVM in offlineAdmissionAcademicDetailsVM.offlineEntranceExamDetailsVMList)
                {
                    if (offlineEntranceExamDetailsVM.Id == 0)
                    {
                        offlineEntranceExamDetailsAddList.Add(new EntranceExamDetail
                        {
                            StudentAdmissionId = offlineEntranceExamDetailsVM.StudentAdmissionId,
                            EntranceType = offlineEntranceExamDetailsVM.EntranceType,
                            RollNumber = offlineEntranceExamDetailsVM.RollNumber,
                            PhysicsMarks = offlineEntranceExamDetailsVM.PhysicsMarks,
                            ChemistryMarks = offlineEntranceExamDetailsVM.ChemistryMarks,
                            MathsMarks = offlineEntranceExamDetailsVM.MathsMarks,
                            TotalMarks = offlineEntranceExamDetailsVM.TotalMarks,
                            IsActive = offlineEntranceExamDetailsVM.IsActive,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow,
                        });
                    }
                    else
                    {
                        offlineEntranceExamDetailsEditList.Add(new EntranceExamDetail
                        {
                            Id = offlineEntranceExamDetailsVM.Id,
                            StudentAdmissionId = offlineEntranceExamDetailsVM.StudentAdmissionId,
                            EntranceType = offlineEntranceExamDetailsVM.EntranceType,
                            RollNumber = offlineEntranceExamDetailsVM.RollNumber,
                            PhysicsMarks = offlineEntranceExamDetailsVM.PhysicsMarks,
                            ChemistryMarks = offlineEntranceExamDetailsVM.ChemistryMarks,
                            MathsMarks = offlineEntranceExamDetailsVM.MathsMarks,
                            TotalMarks = offlineEntranceExamDetailsVM.TotalMarks,
                            IsActive = offlineEntranceExamDetailsVM.IsActive,
                            CreatedBy = offlineEntranceExamDetailsVM.CreatedBy,
                            CreatedDate = offlineEntranceExamDetailsVM.CreatedDate,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow
                        });
                        offlineEntranceExamDetailsDeleteList.Add(offlineEntranceExamDetailsVM.Id);
                    }
                }
            }
            // Update exiting 
            offlineStudentAdmissions.PreviousAcademicDetails = offlinePreviousAcademicDetailsEditList;
            offlineStudentAdmissions.HscmarkDetails = offlineHscmarkDetailsEditList;
            offlineStudentAdmissions.EntranceExamDetails = offlineEntranceExamDetailsEditList;
            _context.UpdateRange(offlineStudentAdmissions);

            // Delete offlinePerviousAcademicDetails 
            var existOfflinePerviousAcademicDetails = await _context.PreviousAcademicDetails.Where(o => o.StudentAdmissionId == offlineAdmissionAcademicDetailsVM.StudentAdmissionId && o.IsDeleted == false).Select(o => o.Id).ToListAsync();
            var offlinePerviousAcademicDetailsIds = existOfflinePerviousAcademicDetails.Except(offlinePreviousAcademicDetailsDeleteList).ToList();
            await _context.PreviousAcademicDetails.Where(o => offlinePerviousAcademicDetailsIds.Contains(o.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });
            
            // Add OnlinePerviousAcademicDetails                                                                                                                                                                                                          
            await _context.PreviousAcademicDetails.AddRangeAsync(offlinePreviousAcademicDetailsAddList);
          
              // Delete OfflineHscmarkDetails
            var existOfflineHscmarkDetails = await _context.HscmarkDetails.Where(o => o.StudentAdmissionId == offlineAdmissionAcademicDetailsVM.StudentAdmissionId && o.IsDeleted == false).Select(o => o.Id).ToListAsync();
            var offlineHscmarkDetailsIds = existOfflineHscmarkDetails.Except(offlineHscmarkDetailsDeleteList).ToList();
            await _context.HscmarkDetails.Where(o => offlineHscmarkDetailsIds.Contains(o.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });

            // Add HSC
            await _context.HscmarkDetails.AddRangeAsync(offlineHscmarkDetailsAddList);

            // Delete OfflineEntranceExamDetails 
            var existOfflineEntranceExamDetails = await _context.EntranceExamDetails.Where(o => o.StudentAdmissionId == offlineAdmissionAcademicDetailsVM.StudentAdmissionId && o.IsDeleted == false).Select(o => o.Id).ToListAsync();
            var OfflineEntranceExamDetailsIds = existOfflineEntranceExamDetails.Except(offlineEntranceExamDetailsDeleteList).ToList();
            await _context.EntranceExamDetails.Where(o => OfflineEntranceExamDetailsIds.Contains(o.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });

            // Add OnlinePerviousAcademicDetails                                                                                                                                                                                                    
            await _context.EntranceExamDetails.AddRangeAsync(offlineEntranceExamDetailsAddList);

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
        /// UpsertofflineBankDetails
        /// </summary>
        /// <param name="offlineAdmissionBankDetailsVM"></param>
        /// <returns></returns>
        /// 
        public async Task<bool?> UpsertOfflineAdmissionBank(OfflineAdmissionBankDetailsVM offlineAdmissionBankDetailsVM)
        {
            var studentAdmissions = await _context.StudentAdmissions.Where(b => b.CollegeId == collegeId /*&& b.UserId == userId*/ && b.AcademicYearId == academicYearId  && b.Id == offlineAdmissionBankDetailsVM.StudentAdmissionId).FirstOrDefaultAsync();
            if (studentAdmissions == null)
            {
                return null;
            }
            // VM to Model Bankdetails
            IList<BankDetail> bankDetailsEditList = new List<BankDetail>();
            IList<BankDetail> bankDetailsAddList = new List<BankDetail>();
            IList<long> bankDetailsDeleteList = new List<long>();

            if (offlineAdmissionBankDetailsVM.offlineBankDetailsVMList.Count > 0)
            {
                foreach (var bankDetailsVM in offlineAdmissionBankDetailsVM.offlineBankDetailsVMList)
                {
                    if (bankDetailsVM.Id == 0) // Add
                    {
                        bankDetailsAddList.Add(new BankDetail
                        {
                            BankName = bankDetailsVM.BankName,
                            BranchName = bankDetailsVM.BranchName,
                            BranchCode = bankDetailsVM.BranchCode,
                            BankAddress = bankDetailsVM.BankAddress,
                            PersonType = bankDetailsVM.PersonType,
                            StudentAdmissionId = bankDetailsVM.StudentAdmissionId,
                            AccountType = bankDetailsVM.AccountType,
                            AccountNo = bankDetailsVM.AccountNo,
                            AccountHolderName = bankDetailsVM.AccountHolderName,
                            Ifsccode = bankDetailsVM.Ifsccode,
                            Micrcode = bankDetailsVM.Micrcode,
                            CanceledChequePath = bankDetailsVM.CanceledChequePath,
                            IsAccLinkedWithAadhar = bankDetailsVM.IsAccLinkedWithAadhar,
                            IsActive = bankDetailsVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = bankDetailsVM.CreatedBy,
                            CreatedDate = DateTime.UtcNow,
                        });
                    }
                    else // Edit
                    {
                        bankDetailsEditList.Add(new BankDetail
                        {
                            Id = bankDetailsVM.Id,
                            BankName = bankDetailsVM.BankName,
                            BranchName = bankDetailsVM.BranchName,
                            BranchCode = bankDetailsVM.BranchCode,
                            BankAddress = bankDetailsVM.BankAddress,
                            PersonType = bankDetailsVM.PersonType,
                            StudentAdmissionId = bankDetailsVM.StudentAdmissionId,
                            AccountType = bankDetailsVM.AccountType,
                            AccountNo = bankDetailsVM.AccountNo,
                            AccountHolderName = bankDetailsVM.AccountHolderName,
                            Ifsccode = bankDetailsVM.Ifsccode,
                            Micrcode = bankDetailsVM.Micrcode,
                            CanceledChequePath = bankDetailsVM.CanceledChequePath,
                            IsAccLinkedWithAadhar = bankDetailsVM.IsAccLinkedWithAadhar,
                            IsActive = bankDetailsVM.IsActive,
                            CreatedBy = bankDetailsVM.CreatedBy,
                            CreatedDate = DateTime.UtcNow,
                            UpdatedBy = userId,
                            UpdatedDate = DateTime.UtcNow,
                        });
                        bankDetailsDeleteList.Add(bankDetailsVM.Id);
                    }
                }
            }
            // Update exiting 
            studentAdmissions.BankDetails = bankDetailsEditList;
            _context.UpdateRange(studentAdmissions);

            // Delete 
            var existBankDetails = await _context.BankDetails.Where(e => e.StudentAdmissionId == offlineAdmissionBankDetailsVM.StudentAdmissionId && e.IsDeleted == false).Select(e => e.Id).ToListAsync();
            var bankDetailsIds = existBankDetails.Except(bankDetailsDeleteList).ToList();
            await _context.BankDetails.Where(e => bankDetailsIds.Contains(e.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });

            // Delete OfflineBankDetails                                                                                                                                                                                                     //_context.OfflineParentDetails.Update(res);
            await _context.BankDetails.AddRangeAsync(bankDetailsAddList);

            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Bank

        #region Insurance
        /// <summary>
        /// UpsertofflineInsuranceDetails
        /// </summary>
        /// <param name="offlineAdmissionInsuranceDetailsVM"></param>
        /// <returns></returns>
        /// 
        public async Task<bool?> UpsertOfflineAdmissionInsurance(OfflineAdmissionInsuranceDetailsVM offlineAdmissionInsuranceDetailsVM)
        {
            var studentAdmissions = await _context.StudentAdmissions.Where(b => b.CollegeId == collegeId /*&& b.UserId == userId*/ && b.AcademicYearId == academicYearId && b.Id == offlineAdmissionInsuranceDetailsVM.StudentAdmissionId).FirstOrDefaultAsync();
            if (studentAdmissions == null)
            {
                return null;
            }
            // VM to Model InsuranceDetails
            IList<InsuranceDetail> InsuranceDetailsEditList = new List<InsuranceDetail>();
            IList<InsuranceDetail> InsuranceDetailsAddList = new List<InsuranceDetail>();
            IList<long> InsuranceDetailsDeleteList = new List<long>();

            if (offlineAdmissionInsuranceDetailsVM.offlineInsuranceDetailsVMList.Count > 0)
            {
                foreach (var insuranceDetailsVM in offlineAdmissionInsuranceDetailsVM.offlineInsuranceDetailsVMList)
                {
                    if (insuranceDetailsVM.Id == 0) // Add
                    {
                        InsuranceDetailsAddList.Add(new InsuranceDetail
                        {
                            StudentAdmissionId = insuranceDetailsVM.StudentAdmissionId,
                            FirstName = insuranceDetailsVM.FirstName,
                            MiddleName = insuranceDetailsVM.MiddleName,
                            LastName = insuranceDetailsVM.LastName,
                            Relation = insuranceDetailsVM.Relation,
                            DateOfBirth = insuranceDetailsVM.DateOfBirth,
                            Age = insuranceDetailsVM.Age,
                            AadharNo = insuranceDetailsVM.AadharNo,
                            StudentParentBeneficiary = insuranceDetailsVM.StudentParentBeneficiary,
                            StudentParentBenefit = insuranceDetailsVM.StudentParentBeneficiary,
                            SumInsured = insuranceDetailsVM.SumInsured,
                            InsurancePremium = insuranceDetailsVM.InsurancePremium,
                            IsActive = insuranceDetailsVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = insuranceDetailsVM.CreatedBy,
                            CreatedDate = DateTime.UtcNow,
                        });
                    }
                    else // Edit
                    {
                        InsuranceDetailsEditList.Add(new InsuranceDetail
                        {
                            Id = insuranceDetailsVM.Id,
                            StudentAdmissionId = insuranceDetailsVM.StudentAdmissionId,
                            FirstName = insuranceDetailsVM.FirstName,
                            MiddleName = insuranceDetailsVM.MiddleName,
                            LastName = insuranceDetailsVM.LastName,
                            Relation = insuranceDetailsVM.Relation,
                            DateOfBirth = insuranceDetailsVM.DateOfBirth,
                            Age = insuranceDetailsVM.Age,
                            AadharNo = insuranceDetailsVM.AadharNo,
                            StudentParentBeneficiary = insuranceDetailsVM.StudentParentBeneficiary,
                            StudentParentBenefit = insuranceDetailsVM.StudentParentBeneficiary,
                            SumInsured = insuranceDetailsVM.SumInsured,
                            InsurancePremium = insuranceDetailsVM.InsurancePremium,
                            IsActive = insuranceDetailsVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = insuranceDetailsVM.CreatedBy,
                            CreatedDate = DateTime.UtcNow,
                        });
                        InsuranceDetailsDeleteList.Add(insuranceDetailsVM.Id);
                    }
                }
            }
            // Update exiting 
            studentAdmissions.InsuranceDetails = InsuranceDetailsEditList;
            _context.UpdateRange(studentAdmissions);

            // Delete 
            var existInsuranceDetails = await _context.InsuranceDetails.Where(e => e.StudentAdmissionId == offlineAdmissionInsuranceDetailsVM.StudentAdmissionId && e.IsDeleted == false).Select(e => e.Id).ToListAsync();
            var insuranceDetailsIds = existInsuranceDetails.Except(InsuranceDetailsDeleteList).ToList();
            await _context.InsuranceDetails.Where(e => insuranceDetailsIds.Contains(e.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });

            // Delete OfflineInsuranceDetails                                                                                                                                                                                                     //_context.OfflineParentDetails.Update(res);
            await _context.InsuranceDetails.AddRangeAsync(InsuranceDetailsAddList);

            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Insurance

        #region Vehical
        /// <summary>
        /// UpsertonlineAdmissionVehical
        /// </summary>
        /// <param name="UpsertofflineAdmissionVehical"></param>
        /// <returns></returns>
        /// 
        public async Task<bool?> UpsertofflineAdmissionVehical(OfflineAdmissionVehicleInformationsVM offlineAdmissionVehicleInformationVM)
        {
            var studentAdmissions = await _context.StudentAdmissions.Where(b => b.CollegeId == collegeId /*&& b.UserId == userId*/ && b.AcademicYearId == academicYearId  && b.Id == offlineAdmissionVehicleInformationVM.StudentAdmissionId).FirstOrDefaultAsync();
            if (studentAdmissions == null)
            {
                return null;
            }

            // VM to Model Vehicaldetails
            IList<VehicleInformation> vehicalDetailsEditList = new List<VehicleInformation>();
            IList<VehicleInformation> vehicalDetailsAddList = new List<VehicleInformation>();
            IList<long> vehicalDetailsDeleteList = new List<long>();

            if (offlineAdmissionVehicleInformationVM.offlineVehicleInformationsVMList.Count > 0)
            {
                foreach (var vehicalDetailsVM in offlineAdmissionVehicleInformationVM.offlineVehicleInformationsVMList)
                {
                    if (vehicalDetailsVM.Id == 0) // Add
                    {
                        vehicalDetailsAddList.Add(new VehicleInformation
                        {
                            StudentAdmissionId = vehicalDetailsVM.StudentAdmissionId,
                            VehicleType = vehicalDetailsVM.VehicleType,
                            NoOfVehicle = vehicalDetailsVM.NoOfVehicle,
                            VehicleNo = vehicalDetailsVM.VehicleNo,
                            VehicleInsurancePolicyNo = vehicalDetailsVM.VehicleInsurancePolicyNo,
                            Puc = vehicalDetailsVM.Puc,
                            Rc = vehicalDetailsVM.Rc,
                            Rcvalidity = vehicalDetailsVM.Rcvalidity,
                            VehicleOwnerName = vehicalDetailsVM.VehicleOwnerName,
                            ValidityOfLicence = vehicalDetailsVM.ValidityOfLicence,
                            EngineNo = vehicalDetailsVM.EngineNo,
                            DrivingLicence = vehicalDetailsVM.DrivingLicence,
                            ChassisNo = vehicalDetailsVM.ChassisNo,
                            VehicleRegistrationNo = vehicalDetailsVM.VehicleRegistrationNo,
                            IsActive = vehicalDetailsVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = vehicalDetailsVM.CreatedBy,
                            CreatedDate = DateTime.UtcNow,
                        });
                    }
                    else // Edit
                    {
                        vehicalDetailsEditList.Add(new VehicleInformation
                        {
                            Id = vehicalDetailsVM.Id,
                            StudentAdmissionId = vehicalDetailsVM.StudentAdmissionId,
                            VehicleType = vehicalDetailsVM.VehicleType,
                            NoOfVehicle = vehicalDetailsVM.NoOfVehicle,
                            VehicleNo = vehicalDetailsVM.VehicleNo,
                            VehicleInsurancePolicyNo = vehicalDetailsVM.VehicleInsurancePolicyNo,
                            Puc = vehicalDetailsVM.Puc,
                            Rc = vehicalDetailsVM.Rc,
                            Rcvalidity = vehicalDetailsVM.Rcvalidity,
                            VehicleOwnerName = vehicalDetailsVM.VehicleOwnerName,
                            ValidityOfLicence = vehicalDetailsVM.ValidityOfLicence,
                            EngineNo = vehicalDetailsVM.EngineNo,
                            DrivingLicence = vehicalDetailsVM.DrivingLicence,
                            ChassisNo = vehicalDetailsVM.ChassisNo,
                            VehicleRegistrationNo = vehicalDetailsVM.VehicleRegistrationNo,
                            IsActive = vehicalDetailsVM.IsActive,
                            IsDeleted = false,
                            CreatedBy = vehicalDetailsVM.CreatedBy,
                            CreatedDate = DateTime.UtcNow,
                        });
                        vehicalDetailsDeleteList.Add(vehicalDetailsVM.Id);
                    }
                }
            }

            // Update exiting 
            studentAdmissions.VehicleInformations = vehicalDetailsEditList;
            _context.UpdateRange(studentAdmissions);

            // Delete 
            var existVehicalDetails = await _context.VehicleInformations.Where(e => e.StudentAdmissionId == offlineAdmissionVehicleInformationVM.StudentAdmissionId && e.IsDeleted == false).Select(e => e.Id).ToListAsync();
            var vehicalDetailsIds = existVehicalDetails.Except(vehicalDetailsDeleteList).ToList();
            await _context.VehicleInformations.Where(e => vehicalDetailsIds.Contains(e.Id)).ForEachAsync(o => { o.IsDeleted = true; o.UpdatedBy = 1; o.UpdatedDate = DateTime.UtcNow; });

            // Delete VehicleInformations                                                                                                                                                                                                     //_context.OfflineParentDetails.Update(res);
            await _context.VehicleInformations.AddRangeAsync(vehicalDetailsAddList);

            if (await _context.SaveChangesAsync() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                return true;
            }
            return null;
        }
        #endregion Vehical

        # region OfflineUserReg
        /// <summary>
        /// OfflineUserReg
        /// </summary>
        /// <param name="offlineAdmissionApproveDataVM"></param>
        /// <returns></returns>
        public async Task<long?> OfflineUserReg(OfflineAdmissionApproveDataVM offlineAdmissionApproveDataVM)
        {
            using (var httpClient = new HttpClient())
            {
                var authenticateURL = StaticConfigurationManager.AppSetting["Ports:AuthenticateURL"];
                var content = new StringContent(JsonConvert.SerializeObject(offlineAdmissionApproveDataVM), Encoding.UTF8, "application/json");
                using (var response = await httpClient.PostAsync($"{authenticateURL}/ApproveOfflineUser/ApproveOfflineUser", content))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var apiResponse = await response.Content.ReadAsStringAsync();
                        var res = JsonConvert.DeserializeObject<APIResponseOffline<long?>>(apiResponse).result;
                        return res;
                    }
                    return null;
                }
            }
        }
    }

    internal class APIResponseOffline<T>
    {
        public long? result { get; set; }
    }
    # endregion OfflineUserReg
}

