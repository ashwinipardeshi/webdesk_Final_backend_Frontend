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
    public class ReservationCategoryService : IReservationCategoryService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllReservationCategoryMaster";
        private readonly string getOptionsCacheKey = "GetOptionsReservationCategoryMaster";
        public ReservationCategoryService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<ReservationCategoryMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"ReservationCategoryMasters_CollegeId_{collegeId}";
            var response = new List<ReservationCategoryMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ReservationCategoryMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ReservationCategoryMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new ReservationCategoryMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<ReservationCategoryMasterVM>();
                await _redisService.SetRedisCacheData<List<ReservationCategoryMasterVM>>(getAllCacheKey, response);
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
        public async Task<ReservationCategoryMasterVM?> Get(long id)
        {
            var response = new ReservationCategoryMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<ReservationCategoryMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<ReservationCategoryMasterVM>();
            else
            {
                response= await _context.ReservationCategoryMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new ReservationCategoryMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<ReservationCategoryMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="reservationCategoryMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ReservationCategoryMasterVM reservationCategoryMasterVM)
        {
            var recordExist = await _context.ReservationCategoryMasters.Where(re => re.Name == reservationCategoryMasterVM.Name.Trim() && re.CollegeId == reservationCategoryMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<ReservationCategoryMaster> created = await _context.ReservationCategoryMasters.AddAsync(new ReservationCategoryMaster()
            {
                Name = reservationCategoryMasterVM.Name.Trim(),
                CollegeId = reservationCategoryMasterVM.CollegeId,
                IsActive = reservationCategoryMasterVM.IsActive,
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
        /// <param name="reservationCategoryMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ReservationCategoryMasterVM reservationCategoryMasterVM)
        {
            var reservationCategoryMasters = await _context.ReservationCategoryMasters.FirstOrDefaultAsync(e => e.Id == reservationCategoryMasterVM.Id);
            if (reservationCategoryMasters != null)
            {
                reservationCategoryMasters.Name = reservationCategoryMasterVM.Name;
                reservationCategoryMasters.CollegeId = reservationCategoryMasterVM.CollegeId;
                reservationCategoryMasters.IsActive = reservationCategoryMasterVM.IsActive;
                reservationCategoryMasters.UpdatedBy = userId;
                reservationCategoryMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(reservationCategoryMasters).State = EntityState.Modified;
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
                            TableId = reservationCategoryMasterVM.Id,
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
            var resrvationCategoryMasters = await _context.ReservationCategoryMasters.FindAsync(id);
            if (resrvationCategoryMasters != null)
            {
                resrvationCategoryMasters.IsDeleted = true;
                resrvationCategoryMasters.UpdatedBy = userId;
                resrvationCategoryMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(resrvationCategoryMasters).State = EntityState.Modified;
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
        public async Task<IEnumerable<OptionVM?>> GetOptions(long collegeId)
        {
            var response = new List<OptionVM>();
            response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ReservationCategoryMasters.Where(e => e.CollegeId == collegeId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
            {
                Id = e.Id,
                Name = e.Name
            }).ToListAsync<OptionVM>();
            }
            return response;
        }
        #endregion GetOptions
    }
}
