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
    public class MinorityDetailsService : IMinorityDetailsService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllMinorityDetailsGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsMinorityDetailsGMaster";
        public MinorityDetailsService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<MinorityDetailsGMasterVM?>> GetAll()
        {
            var response = new List<MinorityDetailsGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<MinorityDetailsGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.MinorityDetailsGmasters.Where(e => e.IsDeleted == false).Include(e => e.MinorityMaster).OrderByDescending(e => e.Id).Select(e => new MinorityDetailsGMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    MinorityMasterId = e.MinorityMasterId,
                    MinorityName = e.MinorityMaster.Name,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).ToListAsync<MinorityDetailsGMasterVM>();
                await _redisService.SetRedisCacheData<List<MinorityDetailsGMasterVM>>(getAllCacheKey, response);
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
        public async Task<MinorityDetailsGMasterVM?> Get(long id)
        {
            var response = new MinorityDetailsGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<MinorityDetailsGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<MinorityDetailsGMasterVM>();
            else
            {
                return await _context.MinorityDetailsGmasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.MinorityMaster).Select(e => new MinorityDetailsGMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                MinorityMasterId = e.MinorityMasterId,
                MinorityName = e.MinorityMaster.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<MinorityDetailsGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="minorityDetailsGMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(MinorityDetailsGMasterVM minorityDetailsGMasterVM)
        {
            var recordExist = await _context.MinorityDetailsGmasters.Where(re => re.Name == minorityDetailsGMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<MinorityDetailsGmaster> created = await _context.MinorityDetailsGmasters.AddAsync(new MinorityDetailsGmaster()
            {
                Name = minorityDetailsGMasterVM.Name.Trim(),
                MinorityMasterId = minorityDetailsGMasterVM.MinorityMasterId,
                IsActive = minorityDetailsGMasterVM.IsActive,
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
        /// <param name="minorityDetailsGMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(MinorityDetailsGMasterVM minorityDetailsGMasterVM)
        {
            var minorityDetailsMaster = await _context.MinorityDetailsGmasters.FirstOrDefaultAsync(e => e.Id == minorityDetailsGMasterVM.Id);
            if (minorityDetailsMaster != null)
            {
                minorityDetailsMaster.Name = minorityDetailsGMasterVM.Name;
                minorityDetailsMaster.MinorityMasterId = minorityDetailsGMasterVM.MinorityMasterId;
                minorityDetailsMaster.IsActive = minorityDetailsGMasterVM.IsActive;
                minorityDetailsMaster.UpdatedBy = userId;
                minorityDetailsMaster.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(minorityDetailsMaster).State = EntityState.Modified;
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
                            TableId = minorityDetailsGMasterVM.Id,
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
            var minorityDetailsMaster = await _context.MinorityDetailsGmasters.FindAsync(id);
            if (minorityDetailsMaster != null)
            {
                minorityDetailsMaster.IsDeleted = true;
                minorityDetailsMaster.UpdatedBy = userId;
                minorityDetailsMaster.UpdatedDate = DateTime.UtcNow;
                _context.Entry(minorityDetailsMaster).State = EntityState.Modified;
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
                response = await _context.MinorityDetailsGmasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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


