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
    public class ReligionService: IReligionService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllReligionGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsReligionGMaster";
        public ReligionService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<ReligionGMasterVM?>> GetAll()
        {
            var response = new List<ReligionGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ReligionGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ReligionGmasters.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new ReligionGMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<ReligionGMasterVM>();
                await _redisService.SetRedisCacheData<List<ReligionGMasterVM>>(getAllCacheKey, response);
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
        public async Task<ReligionGMasterVM?> Get(long id)
        {
            var response = new ReligionGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<ReligionGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<ReligionGMasterVM>();
            else
            {
                response= await _context.ReligionGmasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new ReligionGMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<ReligionGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="religionGMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ReligionGMasterVM religionGMasterVM)
        {
            var recordExist = await _context.ReligionGmasters.Where(re => re.Name == religionGMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<ReligionGmaster> created = await _context.ReligionGmasters.AddAsync(new ReligionGmaster()
            {
                Name = religionGMasterVM.Name.Trim(),
                IsActive = religionGMasterVM.IsActive,
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
        /// <param name="religionGMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ReligionGMasterVM religionGMasterVM)
        {
            var ReligionMasters = await _context.ReligionGmasters.FirstOrDefaultAsync(e => e.Id == religionGMasterVM.Id);
            if (ReligionMasters != null)
            {
                ReligionMasters.Name = religionGMasterVM.Name;
                ReligionMasters.IsActive = religionGMasterVM.IsActive;
                ReligionMasters.UpdatedBy = userId;
                ReligionMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(ReligionMasters).State = EntityState.Modified;
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
                            TableId = religionGMasterVM.Id,
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
            var ReligionMasters = await _context.ReligionGmasters.FindAsync(id);
            if (ReligionMasters != null)
            {
                ReligionMasters.IsDeleted = true;
                ReligionMasters.UpdatedBy = userId;
                ReligionMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(ReligionMasters).State = EntityState.Modified;
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
                response = await _context.ReligionGmasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
