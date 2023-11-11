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
    public class CollegeSubscriptionService : ICollegeSubscriptionService
    {
        private readonly SaaSdevDbFinalContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllCollegeSubscription";
        private readonly string getOptionsCacheKey = "GetOptionsCollegeSubscription";
        public CollegeSubscriptionService(SaaSdevDbFinalContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            //userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("Id"))?.Value);
            //collegeId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value);
            //ipAddress = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("IPAddress"))?.Value.ToString();
            _redisService = redisService;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<CollegeSubscriptionVM?>> GetAll()
        {
            var response = new List<CollegeSubscriptionVM>();
            response = await _redisService.GetRedisCacheData<List<CollegeSubscriptionVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.CollegeSubscriptions.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new CollegeSubscriptionVM()
                {
                    Id = e.Id,
                    SubscriptionMasterId = e.SubscriptionMasterId,
                    CollegeId = e.CollegeId,
                    FromDate = e.FromDate,
                    ToDate = e.ToDate,
                    Price = e.Price,
                    Discount = e.Discount,
                    FinalPrice = e.FinalPrice,
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
        public async Task<CollegeSubscriptionVM?> Get(long id)
        {
            var response = new CollegeSubscriptionVM();
            var responseList = await _redisService.GetRedisCacheData<List<CollegeSubscriptionVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault();
            else
            {
                response = await _context.CollegeSubscriptions.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new CollegeSubscriptionVM()
                {
                    Id = e.Id,
                    SubscriptionMasterId = e.SubscriptionMasterId,
                    CollegeId = e.CollegeId,
                    FromDate = e.FromDate,
                    ToDate = e.ToDate,
                    Price = e.Price,
                    Discount = e.Discount,
                    FinalPrice = e.FinalPrice,
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
        /// <param name="CollegeSubscriptionVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(CollegeSubscriptionVM collegeSubscriptionVM)
        {
            var recordExist = await _context.CollegeSubscriptions.Where(re => re.CollegeId == collegeSubscriptionVM.CollegeId && re.SubscriptionMasterId == collegeSubscriptionVM.SubscriptionMasterId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return null;
            EntityEntry<CollegeSubscription> created = await _context.CollegeSubscriptions.AddAsync(new CollegeSubscription()
            {
                SubscriptionMasterId = collegeSubscriptionVM.SubscriptionMasterId,
                CollegeId = collegeSubscriptionVM.CollegeId,
                FromDate = collegeSubscriptionVM.FromDate,
                ToDate = collegeSubscriptionVM.ToDate,
                Price = collegeSubscriptionVM.Price,
                Discount = collegeSubscriptionVM.Discount,
                FinalPrice = collegeSubscriptionVM.FinalPrice,
                IsActive = collegeSubscriptionVM.IsActive,
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
                    return created.Entity.Id;
                }
            }
            return null;
        }
        #endregion Insert

        #region Update
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="collegeModuleVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(CollegeSubscriptionVM collegeSubscriptionVM)
        {
            var collegeSubscriptions = await _context.CollegeSubscriptions.FirstOrDefaultAsync(e => e.Id == collegeSubscriptionVM.Id);
            if (collegeSubscriptions != null)
            {
                collegeSubscriptions.SubscriptionMasterId = collegeSubscriptionVM.SubscriptionMasterId;
                collegeSubscriptions.CollegeId = collegeSubscriptionVM.CollegeId;
                collegeSubscriptions.FromDate = collegeSubscriptionVM.FromDate;
                collegeSubscriptions.ToDate = collegeSubscriptionVM.ToDate;
                collegeSubscriptions.Price = collegeSubscriptionVM.Price;
                collegeSubscriptions.Discount = collegeSubscriptionVM.Discount;
                collegeSubscriptions.FinalPrice = collegeSubscriptionVM.FinalPrice;
                collegeSubscriptions.IsActive = collegeSubscriptionVM.IsActive;
                collegeSubscriptions.UpdatedBy = userId;
                collegeSubscriptions.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(collegeSubscriptions).State = EntityState.Modified;
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
                            TableId = collegeSubscriptionVM.Id,
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
            var collegeSubscription = await _context.CollegeSubscriptions.FindAsync(id);
            if (collegeSubscription != null)
            {
                collegeSubscription.IsDeleted = true;
                collegeSubscription.UpdatedBy = userId;
                collegeSubscription.UpdatedDate = DateTime.UtcNow;
                _context.Entry(collegeSubscription).State = EntityState.Modified;
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

    }
}
