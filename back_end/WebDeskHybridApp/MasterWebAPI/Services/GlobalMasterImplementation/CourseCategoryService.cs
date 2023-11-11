using MasterWebAPI.Data;
using MasterWebAPI.Models;
using MasterWebAPI.RedisServices;
using MasterWebAPI.Services.GlobalMasterContract;
using MasterWebAPI.Utility;
using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MasterWebAPI.Services.GlobalMasterImplementation
{
    public class CourseCategoryService : ICourseCategoryService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllCourseCategoryGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsCourseCategoryGMaster";
        public CourseCategoryService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<CourseCategoryGMasterVM?>> GetAll()
        {
            var response = new List<CourseCategoryGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<CourseCategoryGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else // DB Call 
            {
                response = await _context.CourseCategoryGmasters.Where(p => p.IsDeleted == false).OrderByDescending(e => e.Id).Select(p => new CourseCategoryGMasterVM()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    IsActive = p.IsActive,
                    CreatedBy = p.CreatedBy,
                    CreatedDate = p.CreatedDate,
                    UpdatedBy = p.UpdatedBy,
                    UpdatedDate = p.UpdatedDate
                }).ToListAsync<CourseCategoryGMasterVM>();

                await _redisService.SetRedisCacheData<List<CourseCategoryGMasterVM>>(getAllCacheKey, response);
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
        public async Task<CourseCategoryGMasterVM?> Get(long id)
        {
            var response = new CourseCategoryGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<CourseCategoryGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<CourseCategoryGMasterVM>();
            else
            {
                return await _context.CourseCategoryGmasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new CourseCategoryGMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).FirstOrDefaultAsync<CourseCategoryGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="courseCategoryMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(CourseCategoryGMasterVM courseCategoryMasterVM)
        {
            var recordExist = await _context.CourseCategoryGmasters.Where(re => re.Name == courseCategoryMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<CourseCategoryGmaster> created = await _context.CourseCategoryGmasters.AddAsync(new CourseCategoryGmaster()
            {
                Name = courseCategoryMasterVM.Name.Trim(),
                Description = courseCategoryMasterVM.Description,
                IsActive = courseCategoryMasterVM.IsActive,
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
        /// <param name="courseCategoryMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(CourseCategoryGMasterVM courseCategoryMasterVM)
        {
            var courseCategoryMaster = await _context.CourseCategoryGmasters.FirstOrDefaultAsync(e => e.Id == courseCategoryMasterVM.Id);
            if (courseCategoryMaster != null)
            {
                courseCategoryMaster.Name = courseCategoryMasterVM.Name;
                courseCategoryMaster.Description = courseCategoryMasterVM.Description;
                courseCategoryMaster.IsActive = courseCategoryMasterVM.IsActive;
                courseCategoryMaster.UpdatedBy = userId;
                courseCategoryMaster.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(courseCategoryMaster).State = EntityState.Modified;
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
                            TableId = courseCategoryMaster.Id,
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
            var courseCategoryMaster = await _context.CourseCategoryGmasters.FindAsync(id);
            if (courseCategoryMaster != null)
            {
                courseCategoryMaster.IsDeleted = true;
                courseCategoryMaster.UpdatedBy = userId;
                courseCategoryMaster.UpdatedDate = DateTime.UtcNow;
                _context.Entry(courseCategoryMaster).State = EntityState.Modified;
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
        public async Task<IEnumerable<OptionVM?>> GetOptions()
        {
            var response = new List<OptionVM>();
            response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.CasteCategoryGmasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
