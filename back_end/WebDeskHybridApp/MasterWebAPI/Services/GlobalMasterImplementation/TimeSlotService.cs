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
    public class TimeSlotService : ITimeSlotService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllTimeSlotGmasters";
        private readonly string getOptionsCacheKey = "GetOptionsTimeSlotGmasters";
        public TimeSlotService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<TimeSlotGMasterVM?>> GetAll()
        {
            var response = new List<TimeSlotGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<TimeSlotGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.TimeSlotGmasters.Where(p => p.IsDeleted == false).OrderByDescending(e => e.Id).Select(p => new TimeSlotGMasterVM()
            {
                Id = p.Id,
                Name = p.Name,
                FromTime = p.FromTime,
                ToTime = p.ToTime,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).ToListAsync<TimeSlotGMasterVM>();
                await _redisService.SetRedisCacheData<List<TimeSlotGMasterVM>>(getAllCacheKey, response);
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
        public async Task<TimeSlotGMasterVM?> Get(long id)
        {
            var response = new TimeSlotGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<TimeSlotGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<TimeSlotGMasterVM>();
            else
            {
                response = await _context.TimeSlotGmasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new TimeSlotGMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<TimeSlotGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="timeSlotMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(TimeSlotGMasterVM timeSlotMasterVM)
        {
            var recordExist = await _context.TimeSlotGmasters.Where(re => re.Name == timeSlotMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<TimeSlotGmaster> created = await _context.TimeSlotGmasters.AddAsync(new TimeSlotGmaster()
            {
                Name = timeSlotMasterVM.Name.Trim(),
                FromTime = timeSlotMasterVM.FromTime,
                ToTime = timeSlotMasterVM.ToTime,
                IsActive = timeSlotMasterVM.IsActive,
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
        /// </summary
        /// <param name="timeSlotMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(TimeSlotGMasterVM timeSlotMasterVM)
        {
            var timeSlotMaster = await _context.TimeSlotGmasters.FirstOrDefaultAsync(e => e.Id == timeSlotMasterVM.Id);
            if (timeSlotMaster != null)
            {
                timeSlotMaster.Name = timeSlotMasterVM.Name;
                timeSlotMaster.FromTime = timeSlotMasterVM.FromTime;
                timeSlotMaster.ToTime = timeSlotMasterVM.ToTime;
                timeSlotMaster.IsActive = timeSlotMasterVM.IsActive;
                timeSlotMaster.UpdatedBy = userId;
                timeSlotMaster.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(timeSlotMaster).State = EntityState.Modified;
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
                            TableId = timeSlotMasterVM.Id,
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
            var timeSlotMaster = await _context.TimeSlotGmasters.FindAsync(id);
            if (timeSlotMaster != null)
            {
                timeSlotMaster.IsDeleted = true;
                timeSlotMaster.UpdatedBy = userId;
                timeSlotMaster.UpdatedDate = DateTime.UtcNow;
                _context.Entry(timeSlotMaster).State = EntityState.Modified;
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
                response = await _context.TimeSlotGmasters.Where(p => p.IsActive && p.IsDeleted == false).OrderBy(e => e.Name).Select(p => new OptionVM()
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