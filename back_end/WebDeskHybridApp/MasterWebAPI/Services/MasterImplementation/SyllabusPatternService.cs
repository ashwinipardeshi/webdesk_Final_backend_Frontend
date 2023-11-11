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
    public class SyllabusPatternService : ISyllabusPatternService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllSyllabusPatternMasters";
        private readonly string getOptionsCacheKey = "GetOptionsSyllabusPatternMasters";
        public SyllabusPatternService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<SyllabusPatternMasterVM?>> GetAll(long collegeId, long academicYearMasterId, long programMasterId)
        {
            string cacheKey = $"SyllabusPatternMasters_CollegeId_{collegeId}";
            var response = new List<SyllabusPatternMasterVM>();
            response = await _redisService.GetRedisCacheData<List<SyllabusPatternMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.SyllabusPatternMasters.Where(e => e.CollegeId == collegeId && e.AcademicYearMasterId == academicYearMasterId && e.ProgramMasterId == programMasterId && e.IsDeleted == false).Include(e => e.College).Include(e => e.AcademicYearMaster).Include(e => e.ProgramMaster).OrderByDescending(e => e.Id).Select(e => new SyllabusPatternMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                AcademicMasterId = e.AcademicYearMasterId,
                AcademicName = e.AcademicYearMaster.Name,
                ProgramMasterId = e.ProgramMasterId,
                ProgramMasterName = e.ProgramMaster.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<SyllabusPatternMasterVM>();
                await _redisService.SetRedisCacheData<List<SyllabusPatternMasterVM>>(getAllCacheKey, response);
            }
            return response;
        }
        #endregion GetAll

        #region Get
        /// <summary>
        /// GetSpecific
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<SyllabusPatternMasterVM?> Get(long id)
        {
            var response = new SyllabusPatternMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<SyllabusPatternMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<SyllabusPatternMasterVM>();
            else
            {
                response = await _context.SyllabusPatternMasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.College).Include(e => e.AcademicYearMaster).Include(e => e.ProgramMaster).Select(e => new SyllabusPatternMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId = e.CollegeId,
                CollegeName=e.College.Name,
                AcademicMasterId = e.AcademicYearMasterId,
                AcademicName=e.AcademicYearMaster.Name,
                ProgramMasterId = e.ProgramMasterId,
                ProgramMasterName=e.ProgramMaster.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<SyllabusPatternMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="syllabusPatternMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(SyllabusPatternMasterVM syllabusPatternMasterVM)
        {
            var recordExist = await _context.SyllabusPatternMasters.Where(re => re.Name == syllabusPatternMasterVM.Name.Trim() && re.CollegeId == syllabusPatternMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<SyllabusPatternMaster> created = await _context.SyllabusPatternMasters.AddAsync(new SyllabusPatternMaster()
            {
                Name = syllabusPatternMasterVM.Name.Trim(),
                CollegeId = syllabusPatternMasterVM.CollegeId,
                AcademicYearMasterId = syllabusPatternMasterVM.AcademicMasterId,
                ProgramMasterId = syllabusPatternMasterVM.ProgramMasterId,
                IsActive = syllabusPatternMasterVM.IsActive,
                IsDeleted = false,
                CreatedBy = userId,
                CreatedDate = DateTime.UtcNow
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
        /// <param name="syllabusPatternMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(SyllabusPatternMasterVM syllabusPatternMasterVM)
        {
            var syllabusPatternMasters = await _context.SyllabusPatternMasters.FirstOrDefaultAsync(e => e.Id == syllabusPatternMasterVM.Id);
            if (syllabusPatternMasters != null)
            {
                syllabusPatternMasters.Name = syllabusPatternMasterVM.Name;
                syllabusPatternMasters.CollegeId = syllabusPatternMasterVM.CollegeId;
                syllabusPatternMasters.AcademicYearMasterId = syllabusPatternMasterVM.AcademicMasterId;
                syllabusPatternMasters.ProgramMasterId = syllabusPatternMasterVM.ProgramMasterId;
                syllabusPatternMasters.IsActive = syllabusPatternMasterVM.IsActive;
                syllabusPatternMasters.UpdatedBy = userId;
                syllabusPatternMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(syllabusPatternMasters).State = EntityState.Modified;
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
                            TableId = syllabusPatternMasterVM.Id,
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
            var syllabusPatternMasters = await _context.SyllabusPatternMasters.FindAsync(id);
            if (syllabusPatternMasters != null)
            {
                syllabusPatternMasters.IsDeleted = true;
                syllabusPatternMasters.UpdatedBy = userId;
                syllabusPatternMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(syllabusPatternMasters).State = EntityState.Modified;
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
        /// <summary>
        /// GetOptions
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long academicYearMasterId, long programMasterId)
        {
            var response = new List<OptionVM>();
            response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.SyllabusPatternMasters.Where(e => e.CollegeId == collegeId && e.AcademicYearMasterId == academicYearMasterId && e.ProgramMasterId== programMasterId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
            {
                Id = e.Id,
                Name = e.Name
            }).ToListAsync<OptionVM>();
                await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}
