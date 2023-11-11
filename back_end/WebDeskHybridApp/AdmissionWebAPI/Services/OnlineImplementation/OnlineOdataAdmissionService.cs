using AdmissionWebAPI.Data;
using AdmissionWebAPI.RedisServices;
using AdmissionWebAPI.Services.Common.Contract;
using AdmissionWebAPI.Services.OnlineContract;
using AdmissionWebAPI.ViewModels.Common;
using AdmissionWebAPI.ViewModels.Online;
using Microsoft.EntityFrameworkCore;

namespace AdmissionWebAPI.Services.OnlineImplementation
{
    public class OnlineOdataAdmissionService : IOnlineOdataAdmissionService
    {
        private readonly AdmissionDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly long academicYearId;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllOnlineOdataAdmission";
        private readonly string getOptionsCacheKey = "GetOptionsOnlineOdataAdmission";
        private readonly IGetMasterNameFromId _masterNameService;
        List<OptionVM> CollegeOptionsData = new List<OptionVM>();
        List<OptionVM> AcademicYearsOptionsData = new List<OptionVM>();
        List<OptionVM> SeatTypeOptionsData = new List<OptionVM>();
        List<OptionVM> CandidatureTypeOptionsData = new List<OptionVM>();
        List<OptionVM> DomicileOptionsData = new List<OptionVM>();
        List<OptionVM> ReligionOptionsData = new List<OptionVM>();
        List<OptionVM> StudentCategoryOptionsData = new List<OptionVM>();
        List<OptionVM> CasteOptionsData = new List<OptionVM>();
        List<OptionVM> SubCasteOptionsData = new List<OptionVM>();
        List<OptionVM> MinorityTypeOptionsData = new List<OptionVM>();
        List<OptionVM> MinorityDetailsOptionsData = new List<OptionVM>();
        List<OptionVM> ProgramYearOptionsData = new List<OptionVM>();
        List<OptionVM> BranchOptionsData = new List<OptionVM>();
        List<OptionVM> AcademicStatusOptionsData = new List<OptionVM>();
        List<OptionVM> AnnualIncomeOptionsData = new List<OptionVM>();
        List<OptionVM> ModeOfAdmissionOptionsData = new List<OptionVM>();
        List<OptionVM> AllotmentCategoryOptionsData = new List<OptionVM>();
        List<OptionVM> AdmittedThroughOptionsData = new List<OptionVM>();
        List<OptionVM> BloodGroupOptionsData = new List<OptionVM>();
        List<OptionVM> DisabilityTypeOptionsData = new List<OptionVM>();
        List<OptionVM> ApplicationRejectReasonOptionsData = new List<OptionVM>();
        List<OptionVM> ApplicationStatusOptionsData = new List<OptionVM>();
        List<OptionVM> CountryOptionsData = new List<OptionVM>();
        List<OptionVM> StateOptionsData = new List<OptionVM>();
        List<OptionVM> DistrictOptionsData = new List<OptionVM>();
        List<OptionVM> TalukaOptionsData = new List<OptionVM>();
        List<OptionVM> ReservationCategoryOptionsData = new List<OptionVM>();
        List<OptionVM> ProgramMasterOptionsData = new List<OptionVM>();


        public OnlineOdataAdmissionService(AdmissionDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IGetMasterNameFromId masterNameService, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _redisService = redisService;
            _masterNameService = masterNameService;

            string uId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("UserId"))?.Value;
            string cId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value;
            string ayId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("AcademicYearId"))?.Value;

            long.TryParse(uId, out userId);
            long.TryParse(cId, out collegeId);
            long.TryParse(ayId, out academicYearId);

            CollegeOptionsData = _masterNameService.GetAllOptions("CollegeMasters").Result;
            AcademicYearsOptionsData = _masterNameService.GetAllOptions("AcademicYearMasters").Result;
            SeatTypeOptionsData = _masterNameService.GetAllOptions("SeatTypeMasters").Result;
            CandidatureTypeOptionsData = _masterNameService.GetAllOptions("CandidatureTypeGmasters").Result;
            DomicileOptionsData = _masterNameService.GetAllOptions("DomicileGmasters").Result;
            ReligionOptionsData = _masterNameService.GetAllOptions("ReligionGmasters").Result;
            StudentCategoryOptionsData = _masterNameService.GetAllOptions("CasteCategoryGmasters").Result;
            CasteOptionsData = _masterNameService.GetAllOptions("CasteGmasters").Result;
            SubCasteOptionsData = _masterNameService.GetAllOptions("SubCasteGmasters").Result;
            MinorityTypeOptionsData = _masterNameService.GetAllOptions("MinorityGmasters").Result;
            MinorityDetailsOptionsData = _masterNameService.GetAllOptions("MinorityDetailsGmasters").Result;
            ProgramYearOptionsData = _masterNameService.GetAllOptions("ProgramYearMasters").Result;
            BranchOptionsData = _masterNameService.GetAllOptions("BranchMasters").Result;
            AcademicStatusOptionsData = _masterNameService.GetAllOptions("AcademicStatusMasters").Result;
            AnnualIncomeOptionsData = _masterNameService.GetAllOptions("AnnualIncomeGmasters").Result;
            ModeOfAdmissionOptionsData = _masterNameService.GetAllOptions("ModeOfAdmissionMasters").Result;
            AllotmentCategoryOptionsData = _masterNameService.GetAllOptions("AllotmentCategoryMasters").Result;
            AdmittedThroughOptionsData = _masterNameService.GetAllOptions("AdmittedTypeMasters").Result;
            BloodGroupOptionsData = _masterNameService.GetAllOptions("BloodGroupGmasters").Result;
            DisabilityTypeOptionsData = _masterNameService.GetAllOptions("HandicapTypeGmasters").Result;
            ApplicationRejectReasonOptionsData = _masterNameService.GetAllOptions("ApplicationRejectReasonMasters").Result;
            ApplicationStatusOptionsData = _masterNameService.GetAllOptions("ApplicationStatusMasters").Result;
            CountryOptionsData = _masterNameService.GetAllOptions("CountryGmasters").Result;
            StateOptionsData = _masterNameService.GetAllOptions("StateGmasters").Result;
            DistrictOptionsData = _masterNameService.GetAllOptions("DistrictGmasters").Result;
            TalukaOptionsData = _masterNameService.GetAllOptions("TalukaGmasters").Result;
            ReservationCategoryOptionsData = _masterNameService.GetAllOptions("ReservationCategoryMasters").Result;
            ProgramMasterOptionsData = _masterNameService.GetAllOptions("ProgramMasters").Result;

        }

        #region Odata Get
        /// <summary>
        /// GetStudentDetails
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<OnlineAdmissionODataVM>> GetStudentDetails() // Param Add CollegeID & AcademicYearID
        {

            var submittedCount = await _context.OnlineStudentAdmissions.Where(o => o.IsActive && !o.IsDeleted).CountAsync();

            var RejectedCount = await _context.OnlineStudentAdmissions.Where(o => o.IsActive && !o.IsDeleted && o.AdmissionStatus.Contains("REJECT")).CountAsync();

            var ConfirmedCount = await _context.OnlineStudentAdmissions.Where(o => o.IsActive && !o.IsDeleted && o.AdmissionStatus.Contains("CONFIRM")).CountAsync();

            var InCompletedCount = await _context.OnlineStudentAdmissions.Where(o => o.IsActive && !o.IsDeleted && o.AdmissionStatus.Contains("INCOMPLETE")).CountAsync();
            // Student Details & Communication
            var response = new List<OnlineAdmissionODataVM>();
            response = await _redisService.GetRedisCacheData<List<OnlineAdmissionODataVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                var onlineStudentAdmissions = await _context.OnlineStudentAdmissions.Where(o => o.IsActive && o.IsDeleted == false).Select(o => new OnlineAdmissionODataVM()
                {
                    Id = o.Id,
                    OnlineUserId = o.OnlineUserId,
                    CollegeId = o.CollegeId,
                    AcademicYearId = o.AcademicYearId,
                    StudentCode = o.StudentCode,
                    AdmissionTypeId = o.AdmissionTypeId,
                    Prnno = o.Prnno,
                    CandidatureTypeId = o.CandidatureTypeId,
                    StateMeritListNo = o.StateMeritListNo,
                    NationalMeritListNo = o.NationalMeritListNo,
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
                    ApplicationNo = o.ApplicationNo,
                    ApplicationFor = o.ApplicationFor,
                    ApplicationRejectReasonId = o.ApplicationRejectReasonId,
                    ApplicationStatusId = o.ApplicationStatusId,
                    IsActive = o.IsActive,
                    CreatedBy = o.CreatedBy,
                    CreatedDate = o.CreatedDate,
                    UpdatedBy = o.UpdatedBy,
                    UpdatedDate = o.UpdatedDate,
                    SubmittedCnt = submittedCount,
                    RejectedCnt = RejectedCount,
                    ConfirmedCnt = ConfirmedCount,
                    InCompletedCnt = InCompletedCount
                }).ToListAsync<OnlineAdmissionODataVM>();
                await _redisService.SetRedisCacheData<List<OnlineAdmissionODataVM>>(getAllCacheKey, response);
                foreach (var dataValue in onlineStudentAdmissions)
                {
                    dataValue.CollegeName = CollegeOptionsData != null ? CollegeOptionsData.Where(c => c.Id == dataValue.CollegeId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.AcademicYearName = AcademicYearsOptionsData != null ? AcademicYearsOptionsData.Where(c => c.Id == dataValue.AcademicYearId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.SeatTypeName = SeatTypeOptionsData != null ? SeatTypeOptionsData.Where(c => c.Id == dataValue.SeatTypeId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CandidatureTypeName = CandidatureTypeOptionsData != null ? CandidatureTypeOptionsData.Where(c => c.Id == dataValue.CandidatureTypeId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.DomicileName = DomicileOptionsData != null ? DomicileOptionsData.Where(c => c.Id == dataValue.DomicileId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.ReligionName = ReligionOptionsData != null ? ReligionOptionsData.Where(c => c.Id == dataValue.ReligionId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.StudentCategoryName = StudentCategoryOptionsData != null ? StudentCategoryOptionsData.Where(c => c.Id == dataValue.StudentCategoryId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CasteName = CasteOptionsData != null ? CasteOptionsData.Where(c => c.Id == dataValue.CasteId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.SubCasteName = SubCasteOptionsData != null ? SubCasteOptionsData.Where(c => c.Id == dataValue.SubCasteId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.MinorityName = MinorityTypeOptionsData != null ? MinorityTypeOptionsData.Where(c => c.Id == dataValue.MinorityId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.MinorityDetailsName = MinorityDetailsOptionsData != null ? MinorityDetailsOptionsData.Where(c => c.Id == dataValue.MinorityDetailsId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.StudentAdmissionName = StudentCategoryOptionsData != null ? StudentCategoryOptionsData.Where(c => c.Id == dataValue.StudentAdmissionId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.ProgramYearName = ProgramYearOptionsData != null ? ProgramYearOptionsData.Where(c => c.Id == dataValue.ProgramYearId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.BranchName = BranchOptionsData != null ? BranchOptionsData.Where(c => c.Id == dataValue.BranchId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.ProgramMasterName= ProgramMasterOptionsData != null ? ProgramMasterOptionsData.Where(c => c.Id == dataValue.ProgramMasterId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.AcademicStatusName = AcademicStatusOptionsData != null ? AcademicStatusOptionsData.Where(c => c.Id == dataValue.AcademicStatusId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.AnnualIncomeName = AnnualIncomeOptionsData != null ? AnnualIncomeOptionsData.Where(c => c.Id == dataValue.AnnualIncomeId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.ModeOfAdmissionName = ModeOfAdmissionOptionsData != null ? ModeOfAdmissionOptionsData.Where(c => c.Id == dataValue.ModeOfAdmission).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.AllotmentCategoryName = AllotmentCategoryOptionsData != null ? AllotmentCategoryOptionsData.Where(c => c.Id == dataValue.AllotmentCategory).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.BelongCasteName = CasteOptionsData != null ? CasteOptionsData.Where(c => c.Id == dataValue.BelongCaste).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.AdmittedThroughName = AdmittedThroughOptionsData != null ? AdmittedThroughOptionsData.Where(c => c.Id == dataValue.AdmittedThrough).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.BloodGroupName = BloodGroupOptionsData != null ? BloodGroupOptionsData.Where(c => c.Id == dataValue.BloodGroup).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.DomicileName = DomicileOptionsData != null ? DomicileOptionsData.Where(c => c.Id == dataValue.DomicileId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.DisabilityTypeName = DisabilityTypeOptionsData != null ? DisabilityTypeOptionsData.Where(c => c.Id == dataValue.DisabilityType).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.ApplicationRejectReasonName = ApplicationRejectReasonOptionsData != null ? ApplicationRejectReasonOptionsData.Where(c => c.Id == dataValue.ApplicationRejectReasonId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.ApplicationStatusName = ApplicationStatusOptionsData != null ? ApplicationStatusOptionsData.Where(c => c.Id == dataValue.ApplicationStatusId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.PermanentCountryName = CountryOptionsData != null ? CountryOptionsData.Where(c => c.Id == dataValue.PermanentCountryId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.PermanentStateName = StateOptionsData != null ? StateOptionsData.Where(c => c.Id == dataValue.PermanentStateId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.PermanentDistrictName = DistrictOptionsData != null ? DistrictOptionsData.Where(c => c.Id == dataValue.PermanentDistrictId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.PermanentTalukaName = TalukaOptionsData != null ? TalukaOptionsData.Where(c => c.Id == dataValue.PermanentTalukaId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CorrespondenceCountryName = CountryOptionsData != null ? CountryOptionsData.Where(c => c.Id == dataValue.CorrespondenceCountryId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CorrespondenceStateName = StateOptionsData != null ? StateOptionsData.Where(c => c.Id == dataValue.CorrespondenceStateId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.DomicileName = DomicileOptionsData != null ? DomicileOptionsData.Where(c => c.Id == dataValue.DomicileId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CorrespondenceDistrictName = DistrictOptionsData != null ? DistrictOptionsData.Where(c => c.Id == dataValue.CorrespondenceDistrictId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CorrespondenceTalukaName = TalukaOptionsData != null ? TalukaOptionsData.Where(c => c.Id == dataValue.CorrespondenceTalukaId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                }
                return onlineStudentAdmissions;
            }
            #endregion Odata Get     

        }
    }
}
