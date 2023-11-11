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
    public class StudyService : IStudyService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllStudyMaster";
        private readonly string getOptionsCacheKey = "GetOptionsStudyMaster";
        public StudyService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<StudyMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"StudyMasters_CollegeId_{collegeId}";
            var response = new List<StudyMasterVM>();
            response = await _redisService.GetRedisCacheData<List<StudyMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.StudyMasters.Where(s => s.CollegeId == collegeId && s.IsDeleted == false).Include(s => s.College).OrderByDescending(e => e.Id).Select(s => new StudyMasterVM()
                {
                    Id = s.Id,
                    CollegeId = s.CollegeId,
                    CollegeName = s.College.Name,
                    Name = s.Name,
                    IsActive = s.IsActive,
                    CreatedBy = s.CreatedBy,
                    CreatedDate = s.CreatedDate,
                    UpdatedBy = s.UpdatedBy,
                    UpdatedDate = s.UpdatedDate
                }).ToListAsync<StudyMasterVM>();
                await _redisService.SetRedisCacheData<List<StudyMasterVM>>(getAllCacheKey, response);
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
        public async Task<StudyMasterVM?> Get(long id)
        {
            var response = new StudyMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<StudyMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<StudyMasterVM>();
            else
            {
                response = await _context.StudyMasters.Where(s => s.Id == id && s.IsDeleted == false).Include(s => s.College).Select(s => new StudyMasterVM()
                {
                    Id = s.Id,
                    CollegeId = s.CollegeId,
                    CollegeName = s.College.Name,
                    Name = s.Name,
                    IsActive = s.IsActive,
                    CreatedBy = s.CreatedBy,
                    CreatedDate = s.CreatedDate,
                    UpdatedBy = s.UpdatedBy,
                    UpdatedDate = s.UpdatedDate
                }).FirstOrDefaultAsync<StudyMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="studyMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(StudyMasterVM studyMasterVM)
        {
            var recordExist = await _context.StudyMasters.Where(re => re.Name == studyMasterVM.Name.Trim() && re.CollegeId == studyMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<StudyMaster> created = await _context.StudyMasters.AddAsync(new StudyMaster()
            {
                Name = studyMasterVM.Name.Trim(),
                CollegeId = studyMasterVM.CollegeId,
                IsActive = studyMasterVM.IsActive,
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
        /// </summary>
        /// <param name="id"></param>
        /// <param name="studyMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(StudyMasterVM studyMasterVM)
        {
            var study = await _context.StudyMasters.FirstOrDefaultAsync(s => s.Id == studyMasterVM.Id);
            if (study != null)
            {
                study.Name = studyMasterVM.Name;
                study.CollegeId = studyMasterVM.CollegeId;
                study.IsActive = studyMasterVM.IsActive;
                study.UpdatedBy = userId;
                study.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(study).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
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
                            TableId = studyMasterVM.Id,
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
            var study = await _context.StudyMasters.FindAsync(id);
            if (study != null)
            {
                study.IsDeleted = true;
                study.UpdatedBy = userId;
                study.UpdatedDate = DateTime.UtcNow;
                _context.Entry(study).State = EntityState.Modified;
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
        public async Task<IEnumerable<OptionVM?>> GetOptions(long collegeId)
        {
            var response = new List<OptionVM>();
            response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.StudyMasters.Where(s => s.CollegeId == collegeId && s.IsActive && s.IsDeleted == false).OrderBy(e => e.Name).Select(s => new OptionVM()
                {
                    Id = s.Id,
                    Name = s.Name
                }).ToListAsync<OptionVM>();
                await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}

