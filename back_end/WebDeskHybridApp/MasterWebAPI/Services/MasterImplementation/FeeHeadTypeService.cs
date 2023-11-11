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
    public class FeeHeadTypeService : IFeeHeadTypeService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllFeeHeadTypeMaster";
        private readonly string getOptionsCacheKey = "GetOptionsFeeHeadTypeMaster";
        public FeeHeadTypeService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<FeeHeadTypeMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"FeeHeadTypeMasters_CollegeId_{collegeId}";
            var response = new List<FeeHeadTypeMasterVM>();
            response = await _redisService.GetRedisCacheData<List<FeeHeadTypeMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else // DB Call 
            {
                response = await _context.FeeHeadTypeMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new FeeHeadTypeMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    CollegeId = e.CollegeId,
                    CollegeName = e.College.Name,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).ToListAsync<FeeHeadTypeMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<FeeHeadTypeMasterVM>>(getAllCacheKey, response);
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
        public async Task<FeeHeadTypeMasterVM?> Get(long id)
        {
            var response = new FeeHeadTypeMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<FeeHeadTypeMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<FeeHeadTypeMasterVM>();
            else
            {
                return await _context.FeeHeadTypeMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new FeeHeadTypeMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<FeeHeadTypeMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="feeHeadTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(FeeHeadTypeMasterVM feeHeadTypeMasterVM)
        {
            var recordExist = await _context.FeeHeadTypeMasters.Where(re => re.Name == feeHeadTypeMasterVM.Name.Trim() && re.CollegeId == feeHeadTypeMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<FeeHeadTypeMaster> created = await _context.FeeHeadTypeMasters.AddAsync(new FeeHeadTypeMaster()
            {
                Name = feeHeadTypeMasterVM.Name.Trim(),
                CollegeId = feeHeadTypeMasterVM.CollegeId,
                IsActive = feeHeadTypeMasterVM.IsActive,
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
        /// <param name="feeHeadTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(FeeHeadTypeMasterVM feeHeadTypeMasterVM)
        {
            var feeHeadTypeMasters = await _context.FeeHeadTypeMasters.FirstOrDefaultAsync(e => e.Id == feeHeadTypeMasterVM.Id);
            if (feeHeadTypeMasters != null)
            {
                feeHeadTypeMasters.Name = feeHeadTypeMasterVM.Name;
                feeHeadTypeMasters.CollegeId = feeHeadTypeMasterVM.CollegeId;
                feeHeadTypeMasters.IsActive = feeHeadTypeMasterVM.IsActive;
                feeHeadTypeMasters.UpdatedBy = userId;
                feeHeadTypeMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(feeHeadTypeMasters).State = EntityState.Modified;
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
                            TableId = feeHeadTypeMasterVM.Id,
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
            var feeHeadTypeMasters = await _context.FeeHeadTypeMasters.FindAsync(id);
            if (feeHeadTypeMasters != null)
            {
                feeHeadTypeMasters.IsDeleted = true;
                feeHeadTypeMasters.UpdatedBy = userId;
                feeHeadTypeMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(feeHeadTypeMasters).State = EntityState.Modified;
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
                response = await _context.FeeHeadTypeMasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
