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
    public class MinorityService : IMinorityService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllMinorityGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsMinorityGMaster";
        public MinorityService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<MinorityGMasterVM?>> GetAll()
        {
            var response = new List<MinorityGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<MinorityGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.MinorityGmasters.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new MinorityGMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).ToListAsync<MinorityGMasterVM>();
                await _redisService.SetRedisCacheData<List<MinorityGMasterVM>>(getAllCacheKey, response);
            }
            return response;
        }
        #endregion GetAll

        # region Get
        /// <summary>
        ///  Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<MinorityGMasterVM?> Get(long id)
        {
            var response = new MinorityGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<MinorityGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<MinorityGMasterVM>();
            else
            {
                return await _context.MinorityGmasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new MinorityGMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<MinorityGMasterVM>();
            }
            return response;
        }
        #endregion GetSpecific

        #region Insert
        /// <summary>
        ///  Insert
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<long?> Insert(MinorityGMasterVM minorityGMasterVM)
        {
            var recordExist = await _context.MinorityGmasters.Where(re => re.Name == minorityGMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<MinorityGmaster> created = await _context.MinorityGmasters.AddAsync(new MinorityGmaster()
            {
                Name = minorityGMasterVM.Name.Trim(),
                IsActive = minorityGMasterVM.IsActive,
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
        /// <param name="minorityGMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(MinorityGMasterVM minorityGMasterVM)
        {
            var minorityGmasters = await _context.MinorityGmasters.FirstOrDefaultAsync(e => e.Id == minorityGMasterVM.Id);
            if (minorityGmasters != null)
            {
                minorityGmasters.Name = minorityGMasterVM.Name;
                minorityGmasters.IsActive = minorityGMasterVM.IsActive;
                minorityGmasters.UpdatedBy = userId;
                minorityGmasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(minorityGmasters).State = EntityState.Modified;
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
                            TableId = minorityGMasterVM.Id,
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
            var minorityGmasters = await _context.MinorityGmasters.FindAsync(id);
            if (minorityGmasters != null)
            {
                minorityGmasters.IsDeleted = true;
                minorityGmasters.UpdatedBy = userId;
                minorityGmasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(minorityGmasters).State = EntityState.Modified;
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
                response = await _context.MinorityGmasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
