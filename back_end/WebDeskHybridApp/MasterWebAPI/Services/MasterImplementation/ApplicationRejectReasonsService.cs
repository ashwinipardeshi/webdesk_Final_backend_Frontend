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
    public class ApplicationRejectReasonsService : IApplicationRejectReasonsService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllApplicationRejectReasonsMaster";
        private readonly string getOptionsCacheKey = "GetOptionsApplicationRejectReasonsMaster";

        public ApplicationRejectReasonsService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<ApplicationRejectReasonsMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"ApplicationRejectReasonMasters_CollegeId_{collegeId}";
            var response = new List<ApplicationRejectReasonsMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ApplicationRejectReasonsMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ApplicationRejectReasonMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new ApplicationRejectReasonsMasterVM()
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
            }).ToListAsync<ApplicationRejectReasonsMasterVM>();
                await _redisService.SetRedisCacheData<List<ApplicationRejectReasonsMasterVM>>(getAllCacheKey, response);
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
        public async Task<ApplicationRejectReasonsMasterVM?> Get(long id)
        {
            return await _context.ApplicationRejectReasonMasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.College).Select(e => new ApplicationRejectReasonsMasterVM()
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
            }).FirstOrDefaultAsync<ApplicationRejectReasonsMasterVM>();
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="applicationRejectReasonsMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ApplicationRejectReasonsMasterVM applicationRejectReasonsMasterVM)
        {
            var recordExist = await _context.ApplicationRejectReasonMasters.Where(re => re.Name == applicationRejectReasonsMasterVM.Name.Trim() && re.CollegeId == applicationRejectReasonsMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<ApplicationRejectReasonMaster> created = await _context.ApplicationRejectReasonMasters.AddAsync(new ApplicationRejectReasonMaster()
            {
                Name = applicationRejectReasonsMasterVM.Name.Trim(),
                CollegeId = applicationRejectReasonsMasterVM.CollegeId,
                IsActive = applicationRejectReasonsMasterVM.IsActive,
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
        /// <param name="applicationRejectReasonsMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ApplicationRejectReasonsMasterVM applicationRejectReasonsMasterVM)
        {
            var applicationRejectReasonsMasters = await _context.ApplicationRejectReasonMasters.FirstOrDefaultAsync(e => e.Id == applicationRejectReasonsMasterVM.Id);
            if (applicationRejectReasonsMasters != null)
            {
                applicationRejectReasonsMasters.CollegeId = applicationRejectReasonsMasterVM.CollegeId;
                applicationRejectReasonsMasters.Name = applicationRejectReasonsMasterVM.Name;
                applicationRejectReasonsMasters.IsActive = applicationRejectReasonsMasterVM.IsActive;
                applicationRejectReasonsMasters.UpdatedBy = userId;
                applicationRejectReasonsMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(applicationRejectReasonsMasters).State = EntityState.Modified;
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
                            TableId = applicationRejectReasonsMasterVM.Id,
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
            var applicationRejectReasonsMasters = await _context.ApplicationRejectReasonMasters.FindAsync(id);
            if (applicationRejectReasonsMasters != null)
            {
                applicationRejectReasonsMasters.IsDeleted = true;
                applicationRejectReasonsMasters.UpdatedBy = userId;
                applicationRejectReasonsMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(applicationRejectReasonsMasters).State = EntityState.Modified;
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
                response = await _context.ApplicationRejectReasonMasters.Where(e => e.CollegeId == collegeId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
