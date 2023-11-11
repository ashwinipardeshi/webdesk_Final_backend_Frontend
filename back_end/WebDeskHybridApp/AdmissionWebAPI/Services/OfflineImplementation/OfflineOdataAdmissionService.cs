using AdmissionWebAPI.Data;
using AdmissionWebAPI.RedisServices;
using AdmissionWebAPI.Services.Common.Contract;
using AdmissionWebAPI.Services.OfflineContract;
using AdmissionWebAPI.ViewModels.Common;
using AdmissionWebAPI.ViewModels.Offline;
using Microsoft.EntityFrameworkCore;

namespace AdmissionWebAPI.Services.OfflineImplementation
{
    public class OfflineOdataAdmissionService : IOfflineOdataAdmissionService
    {
        private readonly AdmissionDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly long academicYearId;
        private readonly IGetMasterNameFromId _masterNameService;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllOfflineOdataAdmission";
        private readonly string getOptionsCacheKey = "GetOptionsOfflineOdataAdmission";
        List<OptionVM> CollegeOptionsData = new List<OptionVM>();
        List<OptionVM> AcademicYearsOptionsData = new List<OptionVM>();
        List<OptionVM> ApplicationTypeOptionsData = new List<OptionVM>();
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
        List<OptionVM> PayingCategoryOptionsData = new List<OptionVM>();
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

        public OfflineOdataAdmissionService(AdmissionDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IGetMasterNameFromId masterNameService, IRedisService redisService)
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
            ApplicationTypeOptionsData = _masterNameService.GetAllOptions("AdmissionTypeMasters").Result;
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

        #region Get
        /// <summary>
        /// GetStudentDetails
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<OfflineAdmissionOdataVM>> GetStudentDetails()
        {         
            var response = new List<OfflineAdmissionOdataVM>();
            response = await _redisService.GetRedisCacheData<List<OfflineAdmissionOdataVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                // Student Details & Communication
                var studentAdmissions = await _context.StudentAdmissions.Include(s => s.StudAdmissionAcademicYearDetails).Where(o => o.IsActive && o.IsDeleted == false).Select(o => new OfflineAdmissionOdataVM()
                {
                    Id = o.Id,
                    CollegeId = o.CollegeId,
                    UserId = o.UserId,
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
                    IsActive = o.IsActive,
                    CreatedBy = o.CreatedBy,
                    CreatedDate = o.CreatedDate,
                    UpdatedBy = o.UpdatedBy,
                    UpdatedDate = o.UpdatedDate,
                    StudAdmissionAYDetailAcademicYearId = o.StudAdmissionAcademicYearDetails.Select(o => o.AcademicYearId).FirstOrDefault(),
                    StudAdmissionAYDetailStudentAdmissionId = o.StudAdmissionAcademicYearDetails.Select(o => o.StudentAdmissionId).FirstOrDefault(),
                    StudAdmissionAYDetailProgramYearId = o.StudAdmissionAcademicYearDetails.Select(o => o.ProgramYearId).FirstOrDefault(),
                    StudAdmissionAYDetailBranchId = o.StudAdmissionAcademicYearDetails.Select(o => o.BranchId).FirstOrDefault(),
                    StudAdmissionAYDetailAcademicStatusId = o.StudAdmissionAcademicYearDetails.Select(o => o.AcademicStatusId).FirstOrDefault(),
                    StudAdmissionAYDetailReasonOfAcademicStatus = o.StudAdmissionAcademicYearDetails.Select(o => o.ReasonOfAcademicStatus).FirstOrDefault(),
                    StudAdmissionAYDetailAdmissionCategoryId = o.StudAdmissionAcademicYearDetails.Select(o => o.AdmissionCategoryId).FirstOrDefault(),
                    StudAdmissionAYDetailAnnualIncomeId = o.StudAdmissionAcademicYearDetails.Select(o => o.AnnualIncomeId).FirstOrDefault(),
                    StudAdmissionAYDetailProgramId = o.StudAdmissionAcademicYearDetails.Select(o => o.ProgramId).FirstOrDefault()
                }).ToListAsync<OfflineAdmissionOdataVM>();
                await _redisService.SetRedisCacheData<List<OfflineAdmissionOdataVM>>(getAllCacheKey, response);

                foreach (var dataValue in studentAdmissions)
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
                    dataValue.ModeOfAdmissionName = ModeOfAdmissionOptionsData != null ? ModeOfAdmissionOptionsData.Where(c => c.Id == dataValue.ModeOfAdmission).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.AllotmentCategoryName = AllotmentCategoryOptionsData != null ? AllotmentCategoryOptionsData.Where(c => c.Id == dataValue.AllotmentCategory).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.BelongCasteName = CasteOptionsData != null ? CasteOptionsData.Where(c => c.Id == dataValue.BelongCaste).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.AdmittedThroughName = AdmittedThroughOptionsData != null ? AdmittedThroughOptionsData.Where(c => c.Id == dataValue.AdmittedThrough).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.BloodGroupName = BloodGroupOptionsData != null ? BloodGroupOptionsData.Where(c => c.Id == dataValue.BloodGroup).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.DomicileName = DomicileOptionsData != null ? DomicileOptionsData.Where(c => c.Id == dataValue.DomicileId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.DisabilityTypeName = DisabilityTypeOptionsData != null ? DisabilityTypeOptionsData.Where(c => c.Id == dataValue.DisabilityType).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.PermanentCountryName = CountryOptionsData != null ? CountryOptionsData.Where(c => c.Id == dataValue.PermanentCountryId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.PermanentStateName = StateOptionsData != null ? StateOptionsData.Where(c => c.Id == dataValue.PermanentStateId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.PermanentDistrictName = DistrictOptionsData != null ? DistrictOptionsData.Where(c => c.Id == dataValue.PermanentDistrictId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.PermanentTalukaName = TalukaOptionsData != null ? TalukaOptionsData.Where(c => c.Id == dataValue.PermanentTalukaId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CorrespondenceCountryName = CountryOptionsData != null ? CountryOptionsData.Where(c => c.Id == dataValue.CorrespondenceCountryId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CorrespondenceStateName = StateOptionsData != null ? StateOptionsData.Where(c => c.Id == dataValue.CorrespondenceStateId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.DomicileName = DomicileOptionsData != null ? DomicileOptionsData.Where(c => c.Id == dataValue.DomicileId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CorrespondenceDistrictName = DistrictOptionsData != null ? DistrictOptionsData.Where(c => c.Id == dataValue.CorrespondenceDistrictId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.CorrespondenceTalukaName = TalukaOptionsData != null ? TalukaOptionsData.Where(c => c.Id == dataValue.CorrespondenceTalukaId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.StudAdmissionAYDetailAcademicYearAYName = ProgramYearOptionsData != null ? ProgramYearOptionsData.Where(c => c.Id == dataValue.StudAdmissionAYDetailAcademicYearId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.StudAdmissionAYDetailProgramYearName = ProgramYearOptionsData != null ? ProgramYearOptionsData.Where(c => c.Id == dataValue.StudAdmissionAYDetailProgramYearId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.StudAdmissionAYDetailBranchName = BranchOptionsData != null ? BranchOptionsData.Where(c => c.Id == dataValue.StudAdmissionAYDetailBranchId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.StudAdmissionAYDetailAcademicStatusName = AcademicStatusOptionsData != null ? AcademicStatusOptionsData.Where(c => c.Id == dataValue.StudAdmissionAYDetailAcademicStatusId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.StudAdmissionAYDetailAnnualIncomeName = AnnualIncomeOptionsData != null ? AnnualIncomeOptionsData.Where(c => c.Id == dataValue.StudAdmissionAYDetailAnnualIncomeId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.StudAdmissionAYDetailAdmissionCategoryName = ReservationCategoryOptionsData != null ? ReservationCategoryOptionsData.Where(c => c.Id == dataValue.StudAdmissionAYDetailAdmissionCategoryId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                    dataValue.StudAdmissionAYDetailProgramName = ProgramMasterOptionsData != null ? ProgramMasterOptionsData.Where(c => c.Id == dataValue.StudAdmissionAYDetailProgramId).Select(c => c.Name).FirstOrDefault() : string.Empty;
                }
                return studentAdmissions;
            }
            #endregion Get
        }
    }
}