using MasterWebAPI.Data;
using MasterWebAPI.Models;
using MasterWebAPI.RedisServices;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.Utility;
using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MasterWebAPI.Services.MasterImplementation
{
    public class BranchService : IBranchService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllBranchMaster";
        private readonly string getOptionsCacheKey = "GetOptionsBranchMaster";
        public BranchService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _redisService = redisService;

            string uId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("UserId"))?.Value.ToString();
            string cId = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value.ToString();
            ipAddress = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("IPAddress"))?.Value.ToString();
            long.TryParse(uId, out userId);
            long.TryParse(cId, out collegeId);
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<BranchMasterVM?>> GetAll(long collegeId, long programMasterId)
        {
            string cacheKey = $"BranchMasters_CollegeId_{collegeId}_ProgramMasterId_{programMasterId}";
            var response = new List<BranchMasterVM>();
            response = await _redisService.GetRedisCacheData<List<BranchMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.BranchMasters.Where(e => e.CollegeId == collegeId && e.ProgramMasterId == programMasterId && e.IsDeleted == false).Include(e => e.College).Include(e => e.ProgramMaster).Include(e => e.StudyMaster).Include(e => e.Department).OrderByDescending(e => e.Id).Select(e => new BranchMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    CollegeId = e.CollegeId,
                    CollegeName = e.College.Name,
                    ProgramMasterId = e.ProgramMasterId,
                    ProgramName = e.ProgramMaster.Name,
                    DepartmentId = e.DepartmentId,
                    DepartmentName = e.Department.Name,
                    StudyMasterId = e.StudyMasterId,
                    StudyName = e.StudyMaster.Name,
                    Code = e.Code,
                    Abbreviation = e.Abbreviation,
                    BranchPrefix = e.BranchPrefix,
                    DateOfIntrodution = e.DateOfIntrodution,
                    MediumOfInstruction = e.MediumOfInstruction,
                    AffiliationStatus = e.AffiliationStatus,
                    Accreditationstatus = e.Accreditationstatus,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).ToListAsync<BranchMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<BranchMasterVM>>(getAllCacheKey, response);
            }
            return response;
        }
        #endregion GetAll

        #region Get
        /// <summary>
        /// Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<BranchMasterVM?> Get(long id)
        {
            var response = new BranchMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<BranchMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<BranchMasterVM>();
            else
            {
                response = await _context.BranchMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new BranchMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    CollegeId = e.CollegeId,
                    CollegeName = e.College.Name,
                    ProgramMasterId = e.ProgramMasterId,
                    ProgramName = e.ProgramMaster.Name,
                    DepartmentId = e.DepartmentId,
                    DepartmentName = e.Department.Name,
                    StudyMasterId = e.StudyMasterId,
                    StudyName = e.StudyMaster.Name,
                    Code = e.Code,
                    Abbreviation = e.Abbreviation,
                    BranchPrefix = e.BranchPrefix,
                    DateOfIntrodution = e.DateOfIntrodution,
                    MediumOfInstruction = e.MediumOfInstruction,
                    AffiliationStatus = e.AffiliationStatus,
                    Accreditationstatus = e.Accreditationstatus,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).FirstOrDefaultAsync<BranchMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="branchMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(BranchMasterVM branchMasterVM)
        {
            var recordExist = await _context.BranchMasters.Where(re => re.Name == branchMasterVM.Name.Trim() && re.CollegeId == branchMasterVM.CollegeId && re.ProgramMasterId == branchMasterVM.ProgramMasterId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<BranchMaster> created = await _context.BranchMasters.AddAsync(new BranchMaster()
            {
                Name = branchMasterVM.Name.Trim(),
                CollegeId = branchMasterVM.CollegeId,
                ProgramMasterId = branchMasterVM.ProgramMasterId,
                StudyMasterId = branchMasterVM.StudyMasterId,
                DepartmentId = branchMasterVM.DepartmentId,
                Code = branchMasterVM.Code,
                Abbreviation = branchMasterVM.Abbreviation,
                BranchPrefix = branchMasterVM.BranchPrefix,
                DateOfIntrodution = branchMasterVM.DateOfIntrodution,
                Accreditationstatus = branchMasterVM.Accreditationstatus,
                MediumOfInstruction = branchMasterVM.MediumOfInstruction,
                AffiliationStatus = branchMasterVM.AffiliationStatus,
                IsActive = branchMasterVM.IsActive,
                IsDeleted = false,
                CreatedBy = userId,
                CreatedDate = DateTime.UtcNow,
            });
            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            if (_context.SaveChanges() > 0)
            {
                await _redisService.RemoveRedisCacheData(getAllCacheKey);
                await _redisService.RemoveRedisCacheData(getOptionsCacheKey);
                if (entry != null)
                {
                    long tableId = created.Entity.Id;
                    await CommonActivities.ActivityLog(new ActivityLogVM()
                    {
                        _context = _context,
                        UserId = userId,
                        TableName = entry.Entity.GetType().Name.ToString(),
                        TableId = tableId,
                        Operation = EntityState.Added.ToString(),
                        CollegeId = collegeId,
                        Ipaddress = ipAddress
                    });
                    return tableId;
                }
            }
            return null;
        }
        #endregion Insert

        #region Update
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="branchMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(BranchMasterVM branchMasterVM)
        {
            var branchMasters = await _context.BranchMasters.FirstOrDefaultAsync(e => e.Id == branchMasterVM.Id);
            if (branchMasters != null)
            {
                branchMasters.Name = branchMasterVM.Name;
                branchMasters.CollegeId = branchMasterVM.CollegeId;
                branchMasters.ProgramMasterId = branchMasterVM.ProgramMasterId;
                branchMasters.StudyMasterId = branchMasterVM.StudyMasterId;
                branchMasters.DepartmentId = branchMasterVM.DepartmentId;
                branchMasters.Code = branchMasterVM.Code;
                branchMasters.Abbreviation = branchMasterVM.Abbreviation;
                branchMasters.BranchPrefix = branchMasterVM.BranchPrefix;
                branchMasters.DateOfIntrodution = branchMasterVM.DateOfIntrodution;
                branchMasters.Accreditationstatus = branchMasterVM.Accreditationstatus;
                branchMasters.MediumOfInstruction = branchMasterVM.MediumOfInstruction;
                branchMasters.AffiliationStatus = branchMasterVM.AffiliationStatus;
                branchMasters.IsActive = branchMasterVM.IsActive;
                branchMasters.UpdatedBy = userId;
                branchMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(branchMasters).State = EntityState.Modified;
            var entry = _context.ChangeTracker.Entries().FirstOrDefault();
            try
            {
                if (_context.SaveChanges() > 0)
                {
                    await _redisService.RemoveRedisCacheData(getAllCacheKey);
                    await _redisService.RemoveRedisCacheData(getOptionsCacheKey);
                    if (entry != null)
                    {
                        await CommonActivities.ActivityLog(new ActivityLogVM()
                        {
                            _context = _context,
                            UserId = userId,
                            TableName = entry.Entity.GetType().Name.ToString(),
                            TableId = branchMasterVM.Id,
                            Operation = EntityState.Modified.ToString(),
                            CollegeId = collegeId,
                            Ipaddress = ipAddress
                        });
                    }
                    return true;
                }
            }
            catch (DbUpdateConcurrencyException err)
            {
                Console.WriteLine(err.ToString());
            }
            return null;
        }
        #endregion Update

        #region Delete
        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool?> Delete(long id)
        {
            var branchMasters = await _context.BranchMasters.FindAsync(id);
            if (branchMasters != null)
            {
                branchMasters.IsDeleted = true;
                branchMasters.UpdatedBy = userId;
                branchMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(branchMasters).State = EntityState.Modified;
                var entry = _context.ChangeTracker.Entries().FirstOrDefault();
                if (_context.SaveChanges() > 0)
                {
                    await _redisService.RemoveRedisCacheData(getAllCacheKey);
                    await _redisService.RemoveRedisCacheData(getOptionsCacheKey);
                    if (entry != null)
                    {
                        await CommonActivities.ActivityLog(new ActivityLogVM()
                        {
                            _context = _context,
                            UserId = userId,
                            TableName = entry.Entity.GetType().Name.ToString(),
                            TableId = id,
                            Operation = EntityState.Deleted.ToString(),
                            CollegeId = collegeId,
                            Ipaddress = ipAddress
                        });
                    }
                    return true;
                }
            }
            return null;
        }
        #endregion Delete


        #region GetOptions
        public async Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long programMasterId)
        {
            //var response = new List<OptionVM>();
            //response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            //if (response != null)
            //    return response;
            //else
            //{
            //    response = await _context.BranchMasters.Where(e => e.CollegeId == collegeId && e.ProgramMasterId == programMasterId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
            //    {
            //        Id = e.Id,
            //        Name = e.Name
            //    }).ToListAsync<OptionVM>();
            //    await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey, response);
            //}
            //    return response;

          
                var getOptionsCacheKey = $"Options:{collegeId}:{programMasterId}";
                // Attempt to retrieve data from the Redis cache
                var cachedOptions = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
                if (cachedOptions != null)
                {
                    return cachedOptions;
                }

                // Data not found in cache, fetch it from the database
                var options = await _context.BranchMasters
                    .Where(e => e.CollegeId == collegeId && e.ProgramMasterId == programMasterId && e.IsActive && e.IsDeleted == false)
                    .OrderBy(e => e.Name)
                    .Select(e => new OptionVM
                    {
                        Id = e.Id,
                        Name = e.Name
                    })
                    .ToListAsync();

                // Store the fetched data in the Redis cache with a specific expiration time
                await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey,options); 

                return options;
            }
        }
        #endregion GetOptions
    }


