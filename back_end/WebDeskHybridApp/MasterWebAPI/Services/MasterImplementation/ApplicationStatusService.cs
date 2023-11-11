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
    public class ApplicationStatusService : IApplicationStatusService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllApplicationStatusMaster";
        private readonly string getOptionsCacheKey = "GetOptionsApplicationStatusMaster";

        public ApplicationStatusService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        /// <param name="collegeId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<ApplicationStatusMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"ApplicationStatusMasters_CollegeId_{collegeId}";
            var response = new List<ApplicationStatusMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ApplicationStatusMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
             response = await _context.ApplicationStatusMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new ApplicationStatusMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                Name = e.Name,          
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<ApplicationStatusMasterVM>();
                await _redisService.SetRedisCacheData<List<ApplicationStatusMasterVM>>(getAllCacheKey, response);
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
        public async Task<ApplicationStatusMasterVM?> Get(long id)
        {
            var response = new ApplicationStatusMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<ApplicationStatusMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<ApplicationStatusMasterVM>();
            else
            {
                response =await _context.ApplicationStatusMasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.College).Select(e => new ApplicationStatusMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                Name = e.Name,      
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<ApplicationStatusMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="applicationStatusMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ApplicationStatusMasterVM applicationStatusMasterVM)
        {
            var recordExist = await _context.ApplicationStatusMasters.Where(re => re.Name == applicationStatusMasterVM.Name.Trim() && re.CollegeId == applicationStatusMasterVM.CollegeId&& re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<ApplicationStatusMaster> created = await _context.ApplicationStatusMasters.AddAsync(new ApplicationStatusMaster()
            {
                CollegeId = applicationStatusMasterVM.CollegeId,
                Name = applicationStatusMasterVM.Name.Trim(),
                IsActive = applicationStatusMasterVM.IsActive,
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
        /// <param name="applicationStatusMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ApplicationStatusMasterVM applicationStatusMasterVM)
        {
            var applicationStatus = await _context.ApplicationStatusMasters.FirstOrDefaultAsync(e => e.Id == applicationStatusMasterVM.Id);
            if (applicationStatus != null)
            {
                applicationStatus.CollegeId = applicationStatusMasterVM.CollegeId;
                applicationStatus.Name = applicationStatusMasterVM.Name;
                applicationStatus.IsActive = applicationStatusMasterVM.IsActive;
                applicationStatus.UpdatedBy = userId;
                applicationStatus.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(applicationStatus).State = EntityState.Modified;
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
                            TableId = applicationStatusMasterVM.Id,
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
            var applicationStatusMasterVM = await _context.ApplicationStatusMasters.FindAsync(id);
            if (applicationStatusMasterVM != null)
            {
                applicationStatusMasterVM.IsDeleted = true;
                applicationStatusMasterVM.UpdatedBy = userId;
                applicationStatusMasterVM.UpdatedDate = DateTime.UtcNow;
                _context.Entry(applicationStatusMasterVM).State = EntityState.Modified;
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
                response = await _context.ApplicationStatusMasters.Where(e => e.CollegeId == collegeId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
