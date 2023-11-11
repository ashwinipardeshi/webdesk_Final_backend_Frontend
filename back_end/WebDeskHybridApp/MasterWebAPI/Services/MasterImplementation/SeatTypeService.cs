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
    public class SeatTypeService : ISeatTypeService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllSeatTypeMaster";
        private readonly string getOptionsCacheKey = "GetOptionsSeatTypeMaster";
        public SeatTypeService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<SeatTypeMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"SeatTypeMasters_CollegeId_{collegeId}";
            var response = new List<SeatTypeMasterVM>();
            response = await _redisService.GetRedisCacheData<List<SeatTypeMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.SeatTypeMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new SeatTypeMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId= e.CollegeId,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync();
                await _redisService.SetRedisCacheData<List<SeatTypeMasterVM>>(getAllCacheKey, response);
            }
            return response;
        }
        #endregion GetAll

        #region  Get
        /// <summary>
        /// Get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<SeatTypeMasterVM?> Get(long id)
        {
            var response = new SeatTypeMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<SeatTypeMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<SeatTypeMasterVM>();
            else
            {
                response =await _context.SeatTypeMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new SeatTypeMasterVM()
            {
                Id = e.Id,
                CollegeId=e.CollegeId,
                Name = e.Name,
                IsActive = e.IsActive,
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
        /// <param name="seatTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(SeatTypeMasterVM seatTypeMasterVM)
        {
            var recordExist = await _context.SeatTypeMasters.Where(re => re.Name == seatTypeMasterVM.Name.Trim() && re.CollegeId == seatTypeMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<SeatTypeMaster> created = await _context.SeatTypeMasters.AddAsync(new SeatTypeMaster()
            {
                Name = seatTypeMasterVM.Name.Trim(),
                CollegeId = seatTypeMasterVM.CollegeId,
                IsActive = seatTypeMasterVM.IsActive,
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
        /// <param name="seatTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(SeatTypeMasterVM seatTypeMasterVM)
        {
            var seatTypeMasters = await _context.SeatTypeMasters.FirstOrDefaultAsync(e => e.Id == seatTypeMasterVM.Id);
            if (seatTypeMasters != null)
            {
                seatTypeMasters.Name = seatTypeMasterVM.Name;
                seatTypeMasters.CollegeId = seatTypeMasterVM.CollegeId;
                seatTypeMasters.IsActive = seatTypeMasterVM.IsActive;
                seatTypeMasters.UpdatedBy = userId;
                seatTypeMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(seatTypeMasters).State = EntityState.Modified;
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
                            TableId = seatTypeMasterVM.Id,
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

        # region Delete
        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool?> Delete(long id)
        {
            var seatTypeMasters = await _context.SeatTypeMasters.FindAsync(id);
            if (seatTypeMasters != null)
            {
                seatTypeMasters.IsDeleted = true;
                seatTypeMasters.UpdatedBy = userId;
                seatTypeMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(seatTypeMasters).State = EntityState.Modified;
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
        public async Task<IEnumerable<OptionVM>> GetOptions(long collegeId)
        {
            var response = new List<OptionVM>();
            response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.SeatTypeMasters.Where(p => p.CollegeId == collegeId && p.IsActive && p.IsDeleted == false).OrderBy(e => e.Name).Select(p => new OptionVM()
            {
                Id = p.Id,
                Name = p.Name
            }).ToListAsync();
                await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}
