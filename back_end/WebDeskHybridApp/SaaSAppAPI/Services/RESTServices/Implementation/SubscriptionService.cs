using Azure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using SaaSAppAPI.Data;
using SaaSAppAPI.Models;
using SaaSAppAPI.RedisService;
using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.Utility;
using SaaSAppAPI.ViewModels;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.RESTServices.Implementation
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly SaaSdevDbFinalContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllSubscriptionMaster";
        private readonly string getOptionsCacheKey = "GetOptionsSubscriptionMaster";

        public SubscriptionService(SaaSdevDbFinalContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<SubscriptionMasterVM?>> GetAll()
        {
            var response = new List<SubscriptionMasterVM>();
            response = await _redisService.GetRedisCacheData<List<SubscriptionMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.SubscriptionMasters.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new SubscriptionMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    Days = e.Days,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).ToListAsync();
                await _redisService.SetRedisCacheData(getAllCacheKey, response);
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
        public async Task<SubscriptionMasterVM?> Get(long id)
        {
            var response = new SubscriptionMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<SubscriptionMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault();
            else
            {
                response = await _context.SubscriptionMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new SubscriptionMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    Days = e.Days,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).FirstOrDefaultAsync();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="subscriptionMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(SubscriptionMasterVM subscriptionMasterVM)
        {
            var recordExist = await _context.SubscriptionMasters.Where(re => re.Name == subscriptionMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return null;
            EntityEntry<SubscriptionMaster> created = await _context.SubscriptionMasters.AddAsync(new SubscriptionMaster()
            {
                Name = subscriptionMasterVM.Name.Trim(),
                Description = subscriptionMasterVM.Description,
                Days = subscriptionMasterVM.Days,
                IsActive = subscriptionMasterVM.IsActive,
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
        /// <param name="subscriptionMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(SubscriptionMasterVM subscriptionMasterVM)
        {
            var subscriptionMasters = await _context.SubscriptionMasters.FirstOrDefaultAsync(e => e.Id == subscriptionMasterVM.Id);
            if (subscriptionMasterVM != null)
            {
                subscriptionMasters.Name = subscriptionMasterVM.Name;
                subscriptionMasters.Description = subscriptionMasterVM.Description;
                subscriptionMasters.Days = subscriptionMasterVM.Days;
                subscriptionMasters.IsActive = subscriptionMasterVM.IsActive;
                subscriptionMasters.UpdatedBy = userId;
                subscriptionMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(subscriptionMasters).State = EntityState.Modified;
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
                            TableId = subscriptionMasterVM.Id,
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
            var subscriptionMasters = await _context.SubscriptionMasters.FindAsync(id);
            if (subscriptionMasters != null)
            {
                subscriptionMasters.IsDeleted = true;
                subscriptionMasters.UpdatedBy = userId;
                subscriptionMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(subscriptionMasters).State = EntityState.Modified;
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
                response = await _context.SubscriptionMasters.Where(e => e.IsActive == true && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
                {
                    Id = e.Id,
                    Name = e.Name
                }).ToListAsync();
                await _redisService.SetRedisCacheData(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}
