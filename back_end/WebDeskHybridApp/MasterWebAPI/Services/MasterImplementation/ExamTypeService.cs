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
    public class ExamTypeService : IExamTypeService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllExamTypeMaster";
        private readonly string getOptionsCacheKey = "GetOptionsExamTypeMaster";
        public ExamTypeService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<ExamTypeMasterVM>> GetAll(long collegeId)
        {
            string cacheKey = $"ExamTypeMasters_CollegeId_{collegeId}";
            var response = new List<ExamTypeMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ExamTypeMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else // DB Call 
            {
                response = await _context.ExamTypeMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new ExamTypeMasterVM()
                {
                    Id = e.Id,
                    CollegeId = e.CollegeId,
                    CollegeName = e.College.Name,
                    Name = e.Name,
                    Description = e.Description,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).ToListAsync<ExamTypeMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<ExamTypeMasterVM>>(getAllCacheKey, response);
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
        public async Task<ExamTypeMasterVM?> Get(long id)
        {
            var response = new ExamTypeMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<ExamTypeMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<ExamTypeMasterVM>();
            return await _context.ExamTypeMasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.College).Select(e => new ExamTypeMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                Name = e.Name,
                Description = e.Description,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<ExamTypeMasterVM>();
        }
        #endregion GetSpecific

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="examTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ExamTypeMasterVM examTypeMasterVM)
        {
            var recordExist = await _context.ExamTypeMasters.Where(re => re.Name == examTypeMasterVM.Name.Trim() && re.CollegeId == examTypeMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<ExamTypeMaster> created = await _context.ExamTypeMasters.AddAsync(new ExamTypeMaster()
            {
                CollegeId = examTypeMasterVM.CollegeId,
                Name = examTypeMasterVM.Name.Trim(),
                Description = examTypeMasterVM.Description,
                IsActive = examTypeMasterVM.IsActive,
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
        /// <param name="examTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ExamTypeMasterVM examTypeMasterVM)
        {
            var examTypeMasters = await _context.ExamTypeMasters.FirstOrDefaultAsync(e => e.Id == examTypeMasterVM.Id);
            if (examTypeMasters != null)
            {
                examTypeMasters.CollegeId = examTypeMasterVM.CollegeId;
                examTypeMasters.Name = examTypeMasterVM.Name;
                examTypeMasters.Description = examTypeMasterVM.Description;
                examTypeMasters.IsActive = examTypeMasterVM.IsActive;
                examTypeMasters.UpdatedBy = userId;
                examTypeMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(examTypeMasters).State = EntityState.Modified;
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
                            TableId = examTypeMasterVM.Id,
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
            var examTypeMasters = await _context.ExamTypeMasters.FindAsync(id);
            if (examTypeMasters != null)
            {
                examTypeMasters.IsDeleted = true;
                examTypeMasters.UpdatedBy = userId;
                examTypeMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(examTypeMasters).State = EntityState.Modified;
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
                response = await _context.ExamTypeMasters.Where(e => e.CollegeId == collegeId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
