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
    public class DesignationService : IDesignationService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllDesignatonMaster";
        private readonly string getOptionsCacheKey = "GetOptionsDesignationMaster";
        public DesignationService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<DesignationMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"DesignationMasters_CollegeId_{collegeId}";
            var response = new List<DesignationMasterVM>();
            response = await _redisService.GetRedisCacheData<List<DesignationMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.DesignationMasters.Where(e => e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new DesignationMasterVM()
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
            }).ToListAsync<DesignationMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<DesignationMasterVM>>(getAllCacheKey, response);
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
        public async Task<DesignationMasterVM?> Get(long id)
        {
            var response = new DesignationMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<DesignationMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<DesignationMasterVM>();
            else
            {
                response = await _context.DesignationMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new DesignationMasterVM()
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
            }).FirstOrDefaultAsync<DesignationMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="designationMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(DesignationMasterVM designationMasterVM)
        {
            var recordExist = await _context.DesignationMasters.Where(re => re.Name == designationMasterVM.Name.Trim() && re.CollegeId == designationMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<DesignationMaster> created = await _context.DesignationMasters.AddAsync(new DesignationMaster()
            {
                Name = designationMasterVM.Name.Trim(),
                CollegeId = designationMasterVM.CollegeId,
                IsActive = designationMasterVM.IsActive,
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
        /// <param name="designationMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(DesignationMasterVM designationMasterVM)
        {
            var designationMasters = await _context.DesignationMasters.FirstOrDefaultAsync(e => e.Id == designationMasterVM.Id);
            if (designationMasters != null)
            {
                designationMasters.Name = designationMasterVM.Name;
                designationMasters.CollegeId = designationMasterVM.CollegeId;
                designationMasters.IsActive = designationMasterVM.IsActive;
                designationMasters.UpdatedBy = userId;
                designationMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(designationMasters).State = EntityState.Modified;
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
                            TableId = designationMasterVM.Id,
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
            var designationMasters = await _context.DesignationMasters.FindAsync(id);
            if (designationMasters != null)
            {
                designationMasters.IsDeleted = true;
                designationMasters.UpdatedBy = userId;
                designationMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(designationMasters).State = EntityState.Modified;
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
                response = await _context.DesignationMasters.Where(e => e.CollegeId == collegeId && e.IsActive  && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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

