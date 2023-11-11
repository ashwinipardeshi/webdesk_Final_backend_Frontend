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
    public class AllotmentCategoryService: IAllotmentCategoryService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllAllotmentCategoryMaster";
        private readonly string getOptionsCacheKey = "GetOptionsAllotmentCategoryMaster";

        public AllotmentCategoryService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<AllotmentCategoryMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"AllotmentCategoryMasters_CollegeId_{collegeId}";
            var response = new List<AllotmentCategoryMasterVM>();
            response = await _redisService.GetRedisCacheData<List<AllotmentCategoryMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.AllotmentCategoryMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new AllotmentCategoryMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                Name = e.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<AllotmentCategoryMasterVM>();
                await _redisService.SetRedisCacheData<List<AllotmentCategoryMasterVM>>(getAllCacheKey, response);
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
        public async Task<AllotmentCategoryMasterVM?> Get(long id)
        {
            var response = new AllotmentCategoryMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<AllotmentCategoryMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<AllotmentCategoryMasterVM>();
            else
            {
                response = await _context.AllotmentCategoryMasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.College).Select(e => new AllotmentCategoryMasterVM()
                {
                    Id = e.Id,
                    CollegeId = e.CollegeId,
                    CollegeName = e.College.Name,
                    Name = e.Name,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).FirstOrDefaultAsync<AllotmentCategoryMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="allotmentCategoryGMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(AllotmentCategoryMasterVM allotmentCategoryGMasterVM)
        {
            var recordExist = await _context.AllotmentCategoryMasters.Where(re => re.Name == allotmentCategoryGMasterVM.Name.Trim() && re.CollegeId == allotmentCategoryGMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
              return 0;
            EntityEntry<AllotmentCategoryMaster> created = await _context.AllotmentCategoryMasters.AddAsync(new AllotmentCategoryMaster()
            {
                CollegeId = allotmentCategoryGMasterVM.CollegeId,
                Name = allotmentCategoryGMasterVM.Name.Trim(),
                IsActive = allotmentCategoryGMasterVM.IsActive,
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
        /// <param name="allotmentCategoryMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(AllotmentCategoryMasterVM allotmentCategoryMasterVM)
        {
            var AllotmentCategoryMasters = await _context.AllotmentCategoryMasters.FirstOrDefaultAsync(e => e.Id == allotmentCategoryMasterVM.Id);
            if (AllotmentCategoryMasters != null)
            {
                AllotmentCategoryMasters.CollegeId = allotmentCategoryMasterVM.CollegeId;
                AllotmentCategoryMasters.Name = allotmentCategoryMasterVM.Name;
                AllotmentCategoryMasters.IsActive = allotmentCategoryMasterVM.IsActive;
                AllotmentCategoryMasters.UpdatedBy = userId;
                AllotmentCategoryMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(AllotmentCategoryMasters).State = EntityState.Modified;
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
                            TableId = allotmentCategoryMasterVM.Id,
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
            var AllotmentCategoryMasters = await _context.AllotmentCategoryMasters.FindAsync(id);
            if (AllotmentCategoryMasters != null)
            {
                AllotmentCategoryMasters.IsDeleted = true;
                AllotmentCategoryMasters.UpdatedBy = userId;
                AllotmentCategoryMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(AllotmentCategoryMasters).State = EntityState.Modified;
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
                response = await _context.AllotmentCategoryMasters.Where(e => e.CollegeId == collegeId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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


