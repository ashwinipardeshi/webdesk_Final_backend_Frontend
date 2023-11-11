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
    public class CollegeModuleService : ICollegeModuleService
    {
        private readonly SaaSdevDbFinalContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId = 0;
        private readonly long collegeId = 1;
        private readonly string? ipAddress = string.Empty;
        private readonly long academicYearId = 6;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllCollegeModule";
        private readonly string getOptionsCacheKey = "GetOptionsCollegeModule";

        public CollegeModuleService(SaaSdevDbFinalContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<CollegeModuleVM?>> GetAll()
        {
            var response = new List<CollegeModuleVM>();
            response = await _redisService.GetRedisCacheData<List<CollegeModuleVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.CollegeModules.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new CollegeModuleVM()
                {
                    Id = e.Id,
                    ModuleMasterId = e.ModuleMasterId,
                    CollegeId = e.CollegeId,
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
        public async Task<CollegeModuleVM?> Get(long id)
        {
            var response = new CollegeModuleVM();
            var responseList = await _redisService.GetRedisCacheData<List<CollegeModuleVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault();
            else
            {
                response = await _context.CollegeModules.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new CollegeModuleVM()
                {
                    Id = e.Id,
                    ModuleMasterId = e.ModuleMasterId,
                    CollegeId = e.CollegeId,
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
        /// <param name="CollegeModuleVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(CollegeModuleVM collegeModuleVM)
        {
            var recordExist = await _context.CollegeModules.Where(re => re.CollegeId == collegeModuleVM.CollegeId && re.ModuleMasterId == collegeModuleVM.ModuleMasterId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return null;
            EntityEntry<CollegeModule> created = await _context.CollegeModules.AddAsync(new CollegeModule()
            {
                ModuleMasterId = collegeModuleVM.ModuleMasterId,
                CollegeId = collegeModuleVM.CollegeId,
                CollegeSubscriptionId = collegeModuleVM.CollegeSubscriptionId,
                Price = (double)collegeModuleVM.Price,
                Discount = (double)collegeModuleVM.Discount,
                FinalPrice = (double)collegeModuleVM.FinalPrice,
                IsActive = collegeModuleVM.IsActive,
                IsDeleted = false,
                CreatedBy = userId,
                CreatedDate = DateTime.UtcNow,
            }); ;
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
        /// <param name="collegeModuleVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(CollegeModuleVM collegeModuleVM)
        {
            var collegeModules = await _context.CollegeModules.FirstOrDefaultAsync(e => e.Id == collegeModuleVM.Id);
            if (collegeModules != null)
            {
                collegeModules.ModuleMasterId = collegeModuleVM.ModuleMasterId;
                collegeModules.CollegeId = collegeModuleVM.CollegeId;
                //collegeModules.Price = collegeModuleVM.Price;
                //collegeModules.Discount = collegeModuleVM.Discount;
                //collegeModules.FinalPrice = collegeModuleVM.FinalPrice;
                collegeModules.IsActive = collegeModuleVM.IsActive;
                collegeModules.UpdatedBy = userId;
                collegeModules.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(collegeModules).State = EntityState.Modified;
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
                            TableId = collegeModuleVM.Id,
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
            var collegeModules = await _context.CollegeModules.FindAsync(id);
            if (collegeModules != null)
            {
                collegeModules.IsDeleted = true;
                collegeModules.UpdatedBy = userId;
                collegeModules.UpdatedDate = DateTime.UtcNow;
                _context.Entry(collegeModules).State = EntityState.Modified;
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
