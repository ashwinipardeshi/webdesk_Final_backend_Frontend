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
    public class FeeHeadService : IFeeHeadService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllFeeHeadMaster";
        private readonly string getOptionsCacheKey = "GetOptionsFeeHeadMaster";
        public FeeHeadService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<FeeHeadMasterVM?>> GetAll(long collegeId, long feeHeadTypeMasterId)
        {
            string cacheKey = $"FeeHeadMasters_CollegeId_{collegeId}_FeeHeadMasters_FeeHeadTypeMasterId_{feeHeadTypeMasterId}";
            var response = new List<FeeHeadMasterVM>();
            response = await _redisService.GetRedisCacheData<List<FeeHeadMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else // DB Call 
            {
               response = await _context.FeeHeadMasters.Where(e => e.CollegeId == collegeId && e.FeeHeadTypeMasterId == feeHeadTypeMasterId && e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new FeeHeadMasterVM()
                {
                    Id = e.Id,
                    CollegeId = e.CollegeId,
                    CollegeName = e.College.Name,
                    FeeHeadTypeMasterId = e.FeeHeadTypeMasterId,
                    Name = e.Name,
                    Fees = e.Fees,
                    Description = e.Description,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).ToListAsync<FeeHeadMasterVM>();
               //  Store into Redis Cache
               await _redisService.SetRedisCacheData<List<FeeHeadMasterVM>>(getAllCacheKey, response);
           }
            return response;
        }
        #endregion GetAll

        #region Get
        public async Task<FeeHeadMasterVM?> Get(long id)
        {
            var response = new FeeHeadMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<FeeHeadMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<FeeHeadMasterVM>();
            else
            {
                return await _context.FeeHeadMasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.College).Select(e => new FeeHeadMasterVM()
                {
                    Id = e.Id,
                    CollegeId = e.CollegeId,
                    CollegeName = e.College.Name,
                    FeeHeadTypeMasterId = e.FeeHeadTypeMasterId,
                    Name = e.Name,
                    Fees = e.Fees,
                    Description = e.Description,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).FirstOrDefaultAsync<FeeHeadMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="feeHeadMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(FeeHeadMasterVM feeHeadMasterVM)
        {
            var recordExist = await _context.FeeHeadMasters.Where(re => re.Name == feeHeadMasterVM.Name.Trim() && re.CollegeId == feeHeadMasterVM.CollegeId && re.FeeHeadTypeMasterId == feeHeadMasterVM.FeeHeadTypeMasterId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<FeeHeadMaster> created = await _context.FeeHeadMasters.AddAsync(new FeeHeadMaster()
            {
                CollegeId = feeHeadMasterVM.CollegeId,
                FeeHeadTypeMasterId = feeHeadMasterVM.FeeHeadTypeMasterId,
                Name = feeHeadMasterVM.Name.Trim(),
                Fees = feeHeadMasterVM.Fees,
                Description = feeHeadMasterVM.Description,
                IsActive = feeHeadMasterVM.IsActive,
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
        /// <param name="feeHeadMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(FeeHeadMasterVM feeHeadMasterVM)
        {
            var feeHeadMasters = await _context.FeeHeadMasters.FirstOrDefaultAsync(e => e.Id == feeHeadMasterVM.Id);
            if (feeHeadMasters != null)
            {
                feeHeadMasters.Id = feeHeadMasterVM.Id;
                feeHeadMasters.CollegeId = feeHeadMasterVM.CollegeId;
                feeHeadMasters.Name = feeHeadMasterVM.Name;
                feeHeadMasters.Description = feeHeadMasterVM.Description;
                feeHeadMasters.IsActive = feeHeadMasterVM.IsActive;
                feeHeadMasters.UpdatedBy = userId;
                feeHeadMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(feeHeadMasters).State = EntityState.Modified;
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
                            TableId = feeHeadMasterVM.Id,
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
            var feeHeadMasters = await _context.FeeHeadMasters.FindAsync(id);
            if (feeHeadMasters != null)
            {
                feeHeadMasters.IsDeleted = true;
                feeHeadMasters.UpdatedBy = userId;
                feeHeadMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(feeHeadMasters).State = EntityState.Modified;
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
        public async Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long feeHeadTypeMasterId)
        {
            var response = new List<OptionVM>();
            response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.FeeHeadMasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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