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
    public class TalukaService : ITalukaService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllTalukaMaster";
        private readonly string getOptionsCacheKey = "GetOptionsTalukaMaster";
        public TalukaService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("Id"))?.Value);
            collegeId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value);
            ipAddress = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("IPAddress"))?.Value.ToString();
            _redisService = redisService;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<TalukaGMasterVM?>> GetAll()
        {
            var response = new List<TalukaGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<TalukaGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.TalukaGmasters.Where(p => p.IsDeleted == false).OrderByDescending(e => e.Id).Include(p => p.District).Select(p => new TalukaGMasterVM()
            {
                Id = p.Id,
                Name = p.Name,
                DistrictId = p.DistrictId,
                DistrictName= p.District.Name,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).ToListAsync<TalukaGMasterVM>();
                await _redisService.SetRedisCacheData<List<TalukaGMasterVM>>(getAllCacheKey, response);
            }
            return response;
        }
        #endregion GetAll

        #region Get
        /// <summary>
        ///  Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<TalukaGMasterVM?> Get(long id)
        {
            var response = new TalukaGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<TalukaGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<TalukaGMasterVM>();
            else
            {
                response = await _context.TalukaGmasters.Where(p => p.Id == id && p.IsDeleted == false).Include(p => p.District).Select(p => new TalukaGMasterVM()
            {
                Id = p.Id,
                Name = p.Name,
                DistrictId = p.DistrictId,
                DistrictName = p.District.Name,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).FirstOrDefaultAsync<TalukaGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="talukaGMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(TalukaGMasterVM talukaGMasterVM)
        {
            var recordExist = await _context.TalukaGmasters.Where(re => re.Name == talukaGMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<TalukaGmaster> created = await _context.TalukaGmasters.AddAsync(new TalukaGmaster()
            {
                Name = talukaGMasterVM.Name.Trim(),
                DistrictId = talukaGMasterVM.DistrictId,
                IsActive = talukaGMasterVM.IsActive,
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
        /// <param name="talukaGMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(TalukaGMasterVM talukaGMasterVM)
        {
            var talukaMasters = await _context.TalukaGmasters.FirstOrDefaultAsync(e => e.Id == talukaGMasterVM.Id);
            if (talukaMasters != null)
            {
                talukaMasters.Name = talukaGMasterVM.Name;
                talukaMasters.IsActive = talukaGMasterVM.IsActive;
                talukaMasters.UpdatedBy = userId;
                talukaMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(talukaMasters).State = EntityState.Modified;
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
                            TableId = talukaGMasterVM.Id,
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
            var talukaMasters = await _context.TalukaGmasters.FindAsync(id);
            if (talukaMasters != null)
            {
                talukaMasters.IsDeleted = true;
                talukaMasters.UpdatedBy = userId;
                talukaMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(talukaMasters).State = EntityState.Modified;
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
                response = await _context.TalukaGmasters.Where(p => p.IsActive && p.IsDeleted == false).OrderBy(e => e.Name).Select(p => new OptionVM()
            {
                Id = p.Id,
                Name = p.Name
            }).ToListAsync<OptionVM>();
                await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}
