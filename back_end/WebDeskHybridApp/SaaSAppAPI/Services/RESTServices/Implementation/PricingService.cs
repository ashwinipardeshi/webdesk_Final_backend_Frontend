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
    public class PricingService : IPricingService
    {
        private readonly SaaSdevDbFinalContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId = 0;
        private readonly long collegeId = 1;
        private readonly string? ipAddress = string.Empty;
        private readonly long academicYearId = 6;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllPricing";
        private readonly string getOptionsCacheKey = "GetOptionsPricing";

        public PricingService(SaaSdevDbFinalContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<PricingVM?>> GetAll()
        {
            var response = new List<PricingVM>();
            response = await _redisService.GetRedisCacheData<List<PricingVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.Pricings.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new PricingVM()
                {
                    Id = e.Id,
                    ModuleMasterId = e.ModuleMasterId,
                    SubscriptionMasterId = e.SubscriptionMasterId,
                    Description = e.Description,
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
        public async Task<PricingVM?> Get(long id)
        {
            var response = new PricingVM();
            var responseList = await _redisService.GetRedisCacheData<List<PricingVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault();
            else
            {
                response = await _context.Pricings.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new PricingVM()
                {
                    Id = e.Id,
                    ModuleMasterId = e.ModuleMasterId,
                    SubscriptionMasterId = e.SubscriptionMasterId,
                    Description = e.Description,
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
        /// <param name="pricingVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(PricingVM pricingVM)
        {
            var recordExist = await _context.Pricings.Where(re => re.ModuleMasterId == pricingVM.ModuleMasterId && re.SubscriptionMasterId == pricingVM.SubscriptionMasterId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return null;
            EntityEntry<Pricing> created = await _context.Pricings.AddAsync(new Pricing()
            {
                ModuleMasterId = pricingVM.ModuleMasterId,
                SubscriptionMasterId = pricingVM.SubscriptionMasterId,
                Description = pricingVM.Description,
                Price = pricingVM.Price,
                Discount = pricingVM.Discount,
                FinalPrice = pricingVM.FinalPrice,
                IsActive = pricingVM.IsActive,
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
        /// <param name="pricingVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(PricingVM pricingVM)
        {
            var pricings = await _context.Pricings.FirstOrDefaultAsync(e => e.Id == pricingVM.Id);
            if (pricings != null)
            {
                pricings.SubscriptionMasterId = pricingVM.SubscriptionMasterId;
                pricings.ModuleMasterId = pricingVM.ModuleMasterId;
                pricings.Description = pricingVM.Description;
                pricings.Price = pricingVM.Price;
                pricings.Discount = pricingVM.Discount;
                pricings.FinalPrice = pricingVM.FinalPrice;
                pricings.IsActive = pricingVM.IsActive;
                pricings.UpdatedBy = userId;
                pricings.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(pricings).State = EntityState.Modified;
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
                            TableId = pricingVM.Id,
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
            var pricings = await _context.Pricings.FindAsync(id);
            if (pricings != null)
            {
                pricings.IsDeleted = true;
                pricings.UpdatedBy = userId;
                pricings.UpdatedDate = DateTime.UtcNow;
                _context.Entry(pricings).State = EntityState.Modified;
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
                response = await _context.Pricings.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                {
                    Id = e.Id,
                }).ToListAsync();
                await _redisService.SetRedisCacheData(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}
