using System.Text;
using AdmissionWebAPI.Data;
using AdmissionWebAPI.Models;
using AdmissionWebAPI.RedisServices;
using AdmissionWebAPI.RMQServices;
using AdmissionWebAPI.Services.Common.Contract;
using AdmissionWebAPI.Services.OfflineContract;
using AdmissionWebAPI.Utility;
using AdmissionWebAPI.ViewModels.Offline;
using AdmissionWebAPI.ViewModels.Online;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;

namespace AdmissionWebAPI.Services.OfflineImplementation
{
    public class OnlineAdmissionConfirmationService : IOnlineAdmissionConfirmationService
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

        public OnlineAdmissionConfirmationService(AdmissionDevFinalDbContext context,IHttpContextAccessor httpContextAccessor, IGetMasterNameFromId masterNameService, IRedisService redisService)
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
        /// <param name="onlineStudentAdmissionId"></param>
        /// <returns></returns>
        public async Task<OnlineAdmissionVM?> Get(long onlineStudentAdmissionId)
        {
            // Student Details & Communication
            var response = new OnlineAdmissionVM();
            var responseList = await _redisService.GetRedisCacheData<List<OnlineAdmissionVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(o => o.Id == onlineStudentAdmissionId).FirstOrDefault<OnlineAdmissionVM>();
            else
            {
                response = await _context.OnlineStudentAdmissions.Where(o => o.Id == onlineStudentAdmissionId && o.IsDeleted == false).Select(o => new OnlineAdmissionVM()
            {
                Id = o.Id, // OnlineStudentAdmissionId
                OnlineUserId = o.OnlineUserId,
                CollegeId = collegeId,
                AcademicYearId = academicYearId,
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
                ProgramMasterId= o.ProgramMasterId,
                BranchId = o.BranchId,
                AcademicStatusId = o.AcademicStatusId,
                ReasonOfAcademicStatus = o.ReasonOfAcademicStatus,
                AdmissionStatus = o.AdmissionStatus,
                //PayingCategoryId = o.PayingCategoryId,
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
                ApplicationStatusId = o.ApplicationStatusId,
                ApplicationRejectReasonId = o.ApplicationRejectReasonId,
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
                }).ToList<OnlineHscmarkDetailVM>(),
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

        #region AdmissionAccept
        /// <summary>
        /// AdmissionAccept
        /// </summary>
        /// <param name="onlineAdmissionConfirmationVM"></param>/
        /// <returns></returns>
        public async Task<long?> AdmissionAccept(OnlineAdmissionConfirmationVM onlineAdmissionConfirmationVM)
        {
            long id = 0;
            // Fetch all the Online Admission Records for the desired student
            var onlineStudentAdmissions = await Get(onlineAdmissionConfirmationVM.OnlineStudentAdmissionId);

            //Insert into Offline Admission
            if (onlineStudentAdmissions != null)
            {                        
                //gererate Student Code                            
                long ayid = onlineStudentAdmissions.AcademicYearId;
                long? bid =  onlineStudentAdmissions.BranchId;

                //Fetch Academic Year Name & Branch Prefix From Master 
                string academicYearName = await _masterNameService.GetMasterNameFromIdAPI("AcademicYearMasters", academicYearId);
                string branchPrefix = await _masterNameService.GetMasterNameFromIdAPI("BranchMasters",bid );
                long? maxstudentCodeId = await _context.StudentAdmissions.Include(s => s.StudAdmissionAcademicYearDetails).Where
                (s => s.StudAdmissionAcademicYearDetails.Any(sa => sa.AcademicYearId == ayid && sa.BranchId == bid)).Select
                (s => s.StudentCodeId).MaxAsync();

                long studentCodeId = maxstudentCodeId ?? 0;
                studentCodeId += 1;
                string studentCode = string.Empty;
                if (academicYearName != null && branchPrefix != null)
                {
                    if (onlineStudentAdmissions.AdmittedThrough == 1) // C-220001
                        studentCode += $"{branchPrefix.Trim()}-{academicYearName.Split('-')[0].Substring(2, 2)}{studentCodeId.ToString("D4")}";
                    else if (onlineStudentAdmissions.AdmittedThrough == 2) // C-D22001
                        studentCode += $"{branchPrefix.Trim()}-D{academicYearName.Split('-')[0].Substring(2, 2)}{studentCodeId.ToString("D3")}";
                }
                // Parent
                IList<ParentDetail>? offlineParentDetailsList = new List<ParentDetail>();
                if (onlineStudentAdmissions.onlineParentDetailsVMList != null)
                {
                    foreach (var onlineParentDetail in onlineStudentAdmissions.onlineParentDetailsVMList)
                    {
                        offlineParentDetailsList.Add(new ParentDetail()
                        {
                            Relation = onlineParentDetail.Relation,
                            LivingStatus = onlineParentDetail.LivingStatus,
                            LastName = onlineParentDetail.LastName,
                            MiddleName = onlineParentDetail.MiddleName,
                            FirstName = onlineParentDetail.FirstName,
                            DateOfBirth = onlineParentDetail.DateOfBirth,
                            Qualification = onlineParentDetail.Qualification,
                            Profession = onlineParentDetail.Profession,
                            EmployedIn = onlineParentDetail.EmployedIn,
                            OrganizationName = onlineParentDetail.OrganizationName,
                            Designation = onlineParentDetail.Designation,
                            Income = onlineParentDetail.Income,
                            MobileNo = onlineParentDetail.MobileNo,
                            MailId = onlineParentDetail.MailId,
                            IsDefaultCommunication = onlineParentDetail.IsDefaultCommunication,
                            GuaradianRelation = onlineParentDetail.GuaradianRelation,
                            GuaradianAddress = onlineParentDetail.GuaradianAddress,
                            IsActive = true,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow
                        });
                    }
                }

                // Academic - Previous 
                IList<PreviousAcademicDetail>? offlinePreviousAcademicDetailsList = new List<PreviousAcademicDetail>();
                if (onlineStudentAdmissions.onlinePreviousAcademicDetailsVMList != null)
                {
                    foreach (var onlinePreviousAcademicDetail in onlineStudentAdmissions.onlinePreviousAcademicDetailsVMList)
                    {
                        offlinePreviousAcademicDetailsList.Add(new PreviousAcademicDetail()
                        {
                            AcademicClass = onlinePreviousAcademicDetail.AcademicClass,
                            SchoolCollege = onlinePreviousAcademicDetail.SchoolCollege,
                            BoardUniversity = onlinePreviousAcademicDetail.BoardUniversity,
                            Month = onlinePreviousAcademicDetail.Month,
                            Year = onlinePreviousAcademicDetail.Year,
                            SeatNo = onlinePreviousAcademicDetail.SeatNo,
                            MarksObtained = onlinePreviousAcademicDetail.MarksObtained,
                            OutOf = onlinePreviousAcademicDetail.OutOf,
                            Percentage = onlinePreviousAcademicDetail.Percentage,
                            IsActive = true,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow
                        });
                    }
                }

                //Academic - HSC
                IList<HscmarkDetail>? offlineHscmarkDetails = new List<HscmarkDetail>();
                if (onlineStudentAdmissions.onlineHscmarkDetailsVMList != null)
                {
                    foreach (var onlineHscDetail in onlineStudentAdmissions.onlineHscmarkDetailsVMList)
                    {
                        offlineHscmarkDetails.Add(new HscmarkDetail()
                        {
                            PhysicsMarks = onlineHscDetail.PhysicsMarks,
                            ChemistryMarks = onlineHscDetail.ChemistryMarks,
                            MathsMarks = onlineHscDetail.MathsMarks,
                            BiologyMarks = onlineHscDetail.BiologyMarks,
                            EnglishMarks = onlineHscDetail.EnglishMarks,
                            VocationSubject = onlineHscDetail.VocationSubject,
                            VocationSubjectMarks = onlineHscDetail.VocationSubjectMarks,
                            QualifyingTotal = onlineHscDetail.QualifyingTotal,
                            IsActive = true,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow
                        });
                    }
                }

                // Academic - Entrance
                IList<EntranceExamDetail>? offlineEntranceExamDetails = new List<EntranceExamDetail>();
                if (onlineStudentAdmissions.onlineEntranceExamDetailsVMList != null)
                {
                    foreach (var onlineEntranceExamDetails in onlineStudentAdmissions.onlineEntranceExamDetailsVMList)
                    {
                        offlineEntranceExamDetails.Add(new EntranceExamDetail()
                        {
                            EntranceType = onlineEntranceExamDetails.EntranceType,
                            RollNumber = onlineEntranceExamDetails.RollNumber,
                            PhysicsMarks = onlineEntranceExamDetails.PhysicsMarks,
                            ChemistryMarks = onlineEntranceExamDetails.ChemistryMarks,
                            MathsMarks = onlineEntranceExamDetails.MathsMarks,
                            TotalMarks = onlineEntranceExamDetails.TotalMarks,
                            IsActive = true,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow
                        });
                    }
                }

                // Bank
                IList<BankDetail>? offlineBankDetailsList = new List<BankDetail>();
                if (onlineStudentAdmissions.onlineBankDetailsVMList != null)
                {
                    foreach (var onlineBankDetails in onlineStudentAdmissions.onlineBankDetailsVMList)
                    {
                        offlineBankDetailsList.Add(new BankDetail()
                        {
                            PersonType = onlineBankDetails.PersonType,
                            AccountType = onlineBankDetails.AccountType,
                            Ifsccode = onlineBankDetails.Ifsccode,
                            BankName = onlineBankDetails.BankName,
                            BranchName = onlineBankDetails.BranchName,
                            BranchCode = onlineBankDetails.BranchCode,
                            BankAddress = onlineBankDetails.BankAddress,
                            AccountNo = onlineBankDetails.AccountNo,
                            AccountHolderName = onlineBankDetails.AccountHolderName,
                            Micrcode = onlineBankDetails.Micrcode,
                            CanceledChequePath = onlineBankDetails.CanceledChequePath,
                            IsAccLinkedWithAadhar = onlineBankDetails.IsAccLinkedWithAadhar,
                            IsActive = true,
                            CreatedBy = userId,
                            CreatedDate = DateTime.UtcNow
                        });
                    }
                }

                // StudAdmissionAcademicYearDetail
                IList<StudAdmissionAcademicYearDetail>? studAdmissionAcademicYearDetail = new List<StudAdmissionAcademicYearDetail>();
                if (onlineStudentAdmissions.AnnualIncomeId != null)
                {
                    studAdmissionAcademicYearDetail.Add(new StudAdmissionAcademicYearDetail()
                    {
                        AnnualIncomeId = onlineStudentAdmissions.AnnualIncomeId,
                        AcademicYearId = onlineStudentAdmissions.AcademicYearId,
                        ProgramYearId = onlineStudentAdmissions.ProgramYearId,
                        ProgramId=onlineStudentAdmissions.ProgramMasterId,
                        BranchId = onlineStudentAdmissions.BranchId,
                        AcademicStatusId = onlineStudentAdmissions.AcademicStatusId,
                        ReasonOfAcademicStatus = onlineStudentAdmissions.ReasonOfAcademicStatus,
                        AdmissionCategoryId = onlineAdmissionConfirmationVM.AdmissionCategoryId,
                        IsActive = true,
                        CreatedBy = userId,
                        CreatedDate = DateTime.UtcNow
                    });
                }

                // Document

                StudentAdmission offlineAdmission = new StudentAdmission()
                {
                    // Parent Table 
                    CollegeId = onlineStudentAdmissions.CollegeId,
                    AcademicYearId = onlineStudentAdmissions.AcademicYearId,
                    ApplicationFor = onlineStudentAdmissions.ApplicationFor,
                    AdmissionTypeId = onlineStudentAdmissions.AdmissionTypeId,
                    SeatTypeId = onlineStudentAdmissions.SeatTypeId,
                    CandidatureTypeId = onlineStudentAdmissions.CandidatureTypeId,
                    DomicileId = onlineStudentAdmissions.DomicileId,
                    ReligionId = onlineStudentAdmissions.ReligionId,
                    StudentCategoryId = onlineStudentAdmissions.StudentCategoryId,
                    CasteId = onlineStudentAdmissions.CasteId,
                    SubCasteId = onlineStudentAdmissions.SubCasteId,
                    MinorityId = onlineStudentAdmissions.MinorityId,
                    MinorityDetailsId = onlineStudentAdmissions.MinorityDetailsId,
                    PermanentCountryId = onlineStudentAdmissions.PermanentCountryId,
                    PermanentCity = onlineStudentAdmissions.PermanentCity,
                    PermanentStateId = onlineStudentAdmissions.PermanentStateId,
                    PermanentDistrictId = onlineStudentAdmissions.PermanentDistrictId,
                    PermanentTalukaId = onlineStudentAdmissions.PermanentTalukaId,
                    CorrespondenceCountryId = onlineStudentAdmissions.CorrespondenceCountryId,
                    CorrespondenceCity = onlineStudentAdmissions.CorrespondenceCity,
                    CorrespondenceStateId = onlineStudentAdmissions.CorrespondenceStateId,
                    CorrespondenceDistrictId = onlineStudentAdmissions.CorrespondenceDistrictId,
                    CorrespondenceTalukaId = onlineStudentAdmissions.CorrespondenceTalukaId,
                    Prnno = onlineStudentAdmissions.Prnno,
                    StateMeritListNo = onlineStudentAdmissions.StateMeritListNo,
                    NationalMeritListNo = onlineStudentAdmissions.NationalMeritListNo,
                    StateMeritMarks = onlineStudentAdmissions.StateMeritMarks,
                    NationalMeritMarks = onlineStudentAdmissions.NationalMeritMarks,
                    DteapplicationNo = onlineStudentAdmissions.DteapplicationNo,
                    HomeUniversity = onlineStudentAdmissions.HomeUniversity,
                    MahaDbtApplicationNo = onlineStudentAdmissions.MahaDbtApplicationNo,
                    ModeOfAdmission = onlineStudentAdmissions.ModeOfAdmission,
                    AllotmentCategory = onlineStudentAdmissions.AllotmentCategory,
                    BelongCaste = onlineStudentAdmissions.BelongCaste,
                    AdmittedThrough = onlineStudentAdmissions.AdmittedThrough,
                    Grno = onlineStudentAdmissions.Grno,
                    Title = onlineStudentAdmissions.Title,
                    LastName = onlineStudentAdmissions.LastName,
                    FirstName = onlineStudentAdmissions.FirstName,
                    MiddleName = onlineStudentAdmissions.MiddleName,
                    NameAsMarkSheet = onlineStudentAdmissions.NameAsMarkSheet,
                    Gender = onlineStudentAdmissions.Gender,
                    DateOfBirth = onlineStudentAdmissions.DateOfBirth,
                    PlaceOfBirth = onlineStudentAdmissions.PlaceOfBirth,
                    TalukaOfBirth = onlineStudentAdmissions.TalukaOfBirth,
                    MaritalStatus = onlineStudentAdmissions.MaritalStatus,
                    BloodGroup = onlineStudentAdmissions.BloodGroup,
                    ChildNoInFamily = onlineStudentAdmissions.ChildNoInFamily,
                    MotherTounge = onlineStudentAdmissions.MotherTounge,
                    Nationality = onlineStudentAdmissions.Nationality,
                    StudentMailId = onlineStudentAdmissions.StudentMailId,
                    AlternateMailId = onlineStudentAdmissions.AlternateMailId,
                    AadharNo = onlineStudentAdmissions.AadharNo,
                    PanNo = onlineStudentAdmissions.PanNo,
                    IsRegisteredWithElection = onlineStudentAdmissions.IsRegisteredWithElection,
                    VoterId = onlineStudentAdmissions.VoterId,
                    MobileNo = onlineStudentAdmissions.MobileNo,
                    PhysicallyChallaged = onlineStudentAdmissions.PhysicallyChallaged,
                    DisabilityType = onlineStudentAdmissions.DisabilityType,
                    IsMinority = onlineStudentAdmissions.IsMinority,
                    AlternateMobileNo = onlineStudentAdmissions.AlternateMobileNo,
                    EmergencyContactNo = onlineStudentAdmissions.EmergencyContactNo,
                    LanguageKnown = onlineStudentAdmissions.LanguageKnown,
                    PassportNo = onlineStudentAdmissions.PassportNo,
                    PassportExpiryDate = onlineStudentAdmissions.PassportExpiryDate,
                    IsEmployeed = onlineStudentAdmissions.IsEmployeed,
                    IsGapInEducation = onlineStudentAdmissions.IsGapInEducation,
                    NoOfYearsInGap = onlineStudentAdmissions.NoOfYearsInGap,
                    IsGraduationResultDeclare = onlineStudentAdmissions.IsGraduationResultDeclare,
                    IsDefenceParent = onlineStudentAdmissions.IsDefenceParent,
                    DefenceType = onlineStudentAdmissions.DefenceType,
                    StudentImage = onlineStudentAdmissions.StudentImage,
                    StudentSignature = onlineStudentAdmissions.StudentSignature,
                    Region = onlineStudentAdmissions.Region,
                    PermanentFlatNo = onlineStudentAdmissions.PermanentFlatNo,
                    PermanentBuildingName = onlineStudentAdmissions.PermanentBuildingName,
                    PermanentPinCode = onlineStudentAdmissions.PermanentPinCode,
                    PermanentLandMark = onlineStudentAdmissions.PermanentLandMark,
                    PermanentAddressMigration = onlineStudentAdmissions.PermanentAddressMigration,
                    CorrespondenceBuildingName = onlineStudentAdmissions.CorrespondenceBuildingName,
                    CorrespondenceFlatNo = onlineStudentAdmissions.CorrespondenceFlatNo,
                    CorrespondencePinCode = onlineStudentAdmissions.CorrespondencePinCode,
                    CorrespondenceLandMark = onlineStudentAdmissions.CorrespondenceLandMark,
                    CorrespondenceAddressMigration = onlineStudentAdmissions.CorrespondenceAddressMigration,
                    IsProfileComplete = onlineStudentAdmissions.IsProfileComplete,
                    StudentCodeId = studentCodeId,
                    StudentCode = studentCode,
                    IsActive = true,
                    CreatedBy = onlineStudentAdmissions.CreatedBy,
                    CreatedDate = DateTime.UtcNow,

                    // Child Table - Parent - 1
                    ParentDetails = offlineParentDetailsList,

                    // Child Table - Academic - 3
                    PreviousAcademicDetails = offlinePreviousAcademicDetailsList,
                    HscmarkDetails = offlineHscmarkDetails,
                    EntranceExamDetails = offlineEntranceExamDetails,

                    // Child Table - Bank - 1
                    BankDetails = offlineBankDetailsList,

                    // Child Table - AcademicYearDetail - 1
                    StudAdmissionAcademicYearDetails = studAdmissionAcademicYearDetail

                    // Child Table - Document - 1 - NA
                };
                _context.Add(offlineAdmission);
                EntityEntry<StudentAdmission> created = _context.Add(offlineAdmission);
                offlineAdmission.Id = created.Entity.Id;

                if (_context.SaveChanges() > 0)
                {
                    // Update StudentAdmissionId & ApplicationStatusId into Online Student Admission Table
                    var onlineAdmission = await _context.OnlineStudentAdmissions.FirstOrDefaultAsync(e => e.Id == onlineAdmissionConfirmationVM.OnlineStudentAdmissionId);
                    if (onlineAdmission != null)
                    {
                        onlineAdmission.AdmissionStatus = onlineAdmissionConfirmationVM.AdmissionStatus;
                        onlineAdmission.StudentAdmissionId = offlineAdmission.Id;
                        onlineAdmission.ApplicationStatusId = onlineAdmissionConfirmationVM.ApplicationStatusId;
                        onlineAdmission.UpdatedBy = userId; // staff
                        onlineAdmission.UpdatedDate = DateTime.UtcNow;
                    }
                    _context.Entry(onlineAdmission).State = EntityState.Modified;
                   
                    await _context.SaveChangesAsync();

                    //Call Approve User Service From Autenticate Module Using RabbitMq                
                    //OnlineAdmissionAcceptDataVM onlineAdmissionApprovalVM = new OnlineAdmissionAcceptDataVM
                    //{
                    //    studentAdmissionId = offlineAdmission.Id,
                    //    userId = onlineStudentAdmissions.OnlineUserId,  //Student                        
                    //    createdBy = userId // Staff
                    //};
                    //RMQSenderService<OnlineAdmissionAcceptDataVM> rabbitmqService = new RMQSenderService<OnlineAdmissionAcceptDataVM>();
                    // rabbitmqService.sendData(onlineAdmissionApprovalVM, "AdmissionConfirmationQueue", "AdmissionConfirmationRoute");

                    OnlineAdmissionAcceptDataVM onlineAdmissionAcceptDataVM = new OnlineAdmissionAcceptDataVM
                    {
                        studentAdmissionId = offlineAdmission.Id,
                        userId = onlineStudentAdmissions.OnlineUserId, //Student
                        createdBy = userId // Staff                        
                    };

                    // HTTP Call to OfflineUserReg
                    long? offlineuserId = await this.OnlineToOfflineUserReg(onlineAdmissionAcceptDataVM);
                    if (offlineuserId.HasValue)
                    {
                        // Update Id as UserId into StudentAdmissionTable
                        var studentAdmissions = await _context.StudentAdmissions.FindAsync(offlineAdmission.Id);
                        studentAdmissions.UserId = offlineuserId.Value;
                        _context.Entry(studentAdmissions).State = EntityState.Modified;
                        _context.SaveChanges();
                        return offlineAdmission.Id;
                    }
                }
                return 0;
            }
            return null;
        }
        #endregion AdmissionConfirm  

        #region AdmissionReject
        /// <summary>
        /// AdmissionReject
        /// </summary>
        /// <param name="onlineAdmissionConfirmationVM"></param>
        /// <returns></returns>
        public async Task<bool?> AdmissionReject(OnlineAdmissionConfirmationVM onlineAdmissionConfirmationVM)
        {
            var onlineAdmissionUpdate = await _context.OnlineStudentAdmissions.FirstOrDefaultAsync(e => e.Id==onlineAdmissionConfirmationVM.OnlineStudentAdmissionId);
            if (onlineAdmissionUpdate != null)
            {
                onlineAdmissionUpdate.ApplicationStatusId = onlineAdmissionConfirmationVM.ApplicationStatusId;
                onlineAdmissionUpdate.ApplicationRejectReasonId = onlineAdmissionConfirmationVM.ApplicationRejectReasonId;
                onlineAdmissionUpdate.AdmissionStatus =onlineAdmissionConfirmationVM.AdmissionStatus;
                onlineAdmissionUpdate.UpdatedBy = userId; 
                onlineAdmissionUpdate.UpdatedDate = DateTime.UtcNow;
                _context.Entry(onlineAdmissionUpdate).State = EntityState.Modified;
                if (await _context.SaveChangesAsync() > 0)
                    return true;
            }
            return null;
        }
        #endregion AdmissionReject       

        #region AdmissionStatusUpdate
        /// <summary>
        /// AdmissionStatusUpdate
        /// </summary>
        /// <param name="onlineAdmissionConfirmationVM"></param>
        /// <returns></returns>
        public async Task<bool?> AdmissionStatusUpdate(OnlineAdmissionConfirmationVM onlineAdmissionConfirmationVM)
        {
            var admissionStatusUpdate = await _context.OnlineStudentAdmissions.FirstOrDefaultAsync(e => e.Id == onlineAdmissionConfirmationVM.OnlineStudentAdmissionId);
            if (admissionStatusUpdate != null)
            {
                admissionStatusUpdate.ApplicationStatusId = onlineAdmissionConfirmationVM.ApplicationStatusId;               
                admissionStatusUpdate.UpdatedBy = userId;
                admissionStatusUpdate.UpdatedDate = DateTime.UtcNow;
                _context.Entry(admissionStatusUpdate).State = EntityState.Modified;
                if (await _context.SaveChangesAsync() > 0)
                    return true;
            }
            return null;
        }
        #endregion AdmissionStatusUpdate

        # region OnlineToOfflineUserReg
        /// <summary>
        /// OnlineToOfflineUserReg
        /// </summary>
        /// <param name="onlineAdmissionAcceptDataVM"></param>
        /// <returns></returns>
        public async Task<long?> OnlineToOfflineUserReg(OnlineAdmissionAcceptDataVM onlineAdmissionAcceptDataVM)
        {
            using (var httpClient = new HttpClient())
            {
                var authenticateURL = StaticConfigurationManager.AppSetting["Ports:AuthenticateURL"];
                var content = new StringContent(JsonConvert.SerializeObject(onlineAdmissionAcceptDataVM), Encoding.UTF8, "application/json");
                using (var response = await httpClient.PostAsync($"{authenticateURL}/ApproveUser/ApproveOnlineUser", content))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var apiResponse = await response.Content.ReadAsStringAsync();
                        var res = JsonConvert.DeserializeObject<APIResponse<long?>>(apiResponse).result;
                        return res;
                    }
                    return null;
                }
            }
        }
    }

    internal class APIResponse<T>
    {
        public long? result { get; set; }
    }
    #endregion OnlineToOfflineUserReg
}

