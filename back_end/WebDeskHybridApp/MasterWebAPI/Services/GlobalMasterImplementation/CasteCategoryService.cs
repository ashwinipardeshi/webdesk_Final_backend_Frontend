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
    public class CasteCategoryService:ICasteCategoryService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllCasteCategoryGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsCasteCategoryGMaster";
        public CasteCategoryService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<CasteCategoryGMasterVM?>> GetAll()
        {
            var response = new List<CasteCategoryGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<CasteCategoryGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.CasteCategoryGmasters.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new CasteCategoryGMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<CasteCategoryGMasterVM>();
                await _redisService.SetRedisCacheData<List<CasteCategoryGMasterVM>>(getAllCacheKey, response);
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
        public async Task<CasteCategoryGMasterVM?> Get(long id)
        {
            var response = new CasteCategoryGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<CasteCategoryGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<CasteCategoryGMasterVM>();
            else
            {
                return await _context.CasteCategoryGmasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new CasteCategoryGMasterVM()
                 {
                        Id = e.Id,
                        Name = e.Name,
                        IsActive = e.IsActive,
                        CreatedBy = e.CreatedBy,
                        CreatedDate = e.CreatedDate,
                        UpdatedBy = e.UpdatedBy,
                        UpdatedDate = e.UpdatedDate
                 }).FirstOrDefaultAsync<CasteCategoryGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="casteCategoryGMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(CasteCategoryGMasterVM casteCategoryGMasterVM)
        {
            var recordExist = await _context.CasteCategoryGmasters.Where(re => re.Name == casteCategoryGMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<CasteCategoryGmaster> created = await _context.CasteCategoryGmasters.AddAsync(new CasteCategoryGmaster()
            {
                Name = casteCategoryGMasterVM.Name.Trim(),
                IsActive = casteCategoryGMasterVM.IsActive,
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
        /// 
        /// </summary>
        /// <param name="casteCategoryGMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(CasteCategoryGMasterVM casteCategoryGMasterVM)
        {
            var CasteCategoryMasters = await _context.CasteCategoryGmasters.FirstOrDefaultAsync(e => e.Id == casteCategoryGMasterVM.Id);
            if (CasteCategoryMasters != null)
            {
                CasteCategoryMasters.Name = casteCategoryGMasterVM.Name;
                CasteCategoryMasters.IsActive = casteCategoryGMasterVM.IsActive;
                CasteCategoryMasters.UpdatedBy = userId;
                CasteCategoryMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(CasteCategoryMasters).State = EntityState.Modified;
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
                            TableId = casteCategoryGMasterVM.Id,
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
            var CasteCategoryMasters = await _context.CasteCategoryGmasters.FindAsync(id);
            if (CasteCategoryMasters != null)
            {
                CasteCategoryMasters.IsDeleted = true;
                CasteCategoryMasters.UpdatedBy = userId;
                CasteCategoryMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(CasteCategoryMasters).State = EntityState.Modified;
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
