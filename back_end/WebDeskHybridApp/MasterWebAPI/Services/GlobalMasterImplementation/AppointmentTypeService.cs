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
    public class AppointmentTypeService : IAppointmentTypeService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllAppointmentTypeGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsAppointmentTypeGMaster";
        public AppointmentTypeService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<AppointmentTypeGMasterVM?>> GetAll()
        {
            var response = new List<AppointmentTypeGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<AppointmentTypeGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.AppointmentTypeGmasters.Where(a => a.IsDeleted == false).OrderByDescending(e => e.Id).Select(a => new AppointmentTypeGMasterVM()
            {
                Id = a.Id,
                Name = a.Name,
                IsActive = a.IsActive,
                CreatedBy = a.CreatedBy,
                CreatedDate = a.CreatedDate,
                UpdatedBy = a.UpdatedBy,
                UpdatedDate = a.UpdatedDate
            }).ToListAsync<AppointmentTypeGMasterVM>();
            await _redisService.SetRedisCacheData<List<AppointmentTypeGMasterVM>>(getAllCacheKey, response);
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
        public async Task<AppointmentTypeGMasterVM?> Get(long id)
        {
        var response = new AppointmentTypeGMasterVM();
        var responseList = await _redisService.GetRedisCacheData<List<AppointmentTypeGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<AppointmentTypeGMasterVM>();
            else
            {
                response = await _context.AppointmentTypeGmasters.Where(a => a.Id == id && a.IsDeleted == false).Select(a => new AppointmentTypeGMasterVM()
                {
                    Id = a.Id,
                    Name = a.Name,
                    IsActive = a.IsActive,
                    CreatedBy = a.CreatedBy,
                    CreatedDate = a.CreatedDate,
                    UpdatedBy = a.UpdatedBy,
                    UpdatedDate = a.UpdatedDate
                }).FirstOrDefaultAsync<AppointmentTypeGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="appointmentTypeGmasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(AppointmentTypeGMasterVM appointmentTypeGmasterVM)
        {
            var recordExist = await _context.AppointmentTypeGmasters.Where(re => re.Name == appointmentTypeGmasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<AppointmentTypeGmaster> created = await _context.AppointmentTypeGmasters.AddAsync(new AppointmentTypeGmaster()
            {
                Name = appointmentTypeGmasterVM.Name.Trim(),
                IsActive = appointmentTypeGmasterVM.IsActive,
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
        /// </summary>
        /// <param name="id"></param>
        /// <param name="appointmentTypeGmasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(AppointmentTypeGMasterVM appointmentTypeGmasterVM)
        {
            var AppointmentType = await _context.AppointmentTypeGmasters.FirstOrDefaultAsync(a => a.Id == appointmentTypeGmasterVM.Id);
            if (AppointmentType != null)
            {
                AppointmentType.Name = appointmentTypeGmasterVM.Name;
                AppointmentType.IsActive = appointmentTypeGmasterVM.IsActive;
                AppointmentType.UpdatedBy = userId;
                AppointmentType.UpdatedDate = DateTime.UtcNow;

            }
            _context.Entry(AppointmentType).State = EntityState.Modified;
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
                            TableId = appointmentTypeGmasterVM.Id,
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
           var AppointmentType = await _context.AppointmentTypeGmasters.FindAsync(id);
            if (AppointmentType != null)
            {
                AppointmentType.IsDeleted = true;
                AppointmentType.UpdatedBy = userId;
                AppointmentType.UpdatedDate = DateTime.UtcNow;
                _context.Entry(AppointmentType).State = EntityState.Modified;
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
                response = await _context.AppointmentTypeGmasters.Where(a => a.IsActive && a.IsDeleted == false).OrderBy(e => e.Name).Select(a => new OptionVM()
            {
                Id = a.Id,
                Name = a.Name
            }).ToListAsync<OptionVM>();
            await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}




