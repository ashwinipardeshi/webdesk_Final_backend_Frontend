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
    public class AdmittedTypeService :IAdmittedTypeService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllAdmittedTypeMaster";
        private readonly string getOptionsCacheKey = "GetOptionsAdmittedTypeMaster";
        
        public AdmittedTypeService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<AdmittedTypeMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"AdmittedTypeMasters_CollegeId_{collegeId}";
            var response = new List<AdmittedTypeMasterVM>();
            response = await _redisService.GetRedisCacheData<List<AdmittedTypeMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.AdmittedTypeMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new AdmittedTypeMasterVM()
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
            }).ToListAsync<AdmittedTypeMasterVM>();
                await _redisService.SetRedisCacheData<List<AdmittedTypeMasterVM>>(getAllCacheKey, response);
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
        public async Task<AdmittedTypeMasterVM?> Get(long id)
        {
            var response = new AdmittedTypeMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<AdmittedTypeMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<AdmittedTypeMasterVM>();
            else
            {
                response = await _context.AdmittedTypeMasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.College).Select(e => new AdmittedTypeMasterVM()
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
                }).FirstOrDefaultAsync<AdmittedTypeMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="admittedTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(AdmittedTypeMasterVM admittedTypeMasterVM)
        {
            var recordExist = await _context.AdmittedTypeMasters.Where(re => re.Name == admittedTypeMasterVM.Name.Trim() && re.CollegeId == admittedTypeMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<AdmittedTypeMaster> created = await _context.AdmittedTypeMasters.AddAsync(new AdmittedTypeMaster()
            {
                Name = admittedTypeMasterVM.Name.Trim(),
                CollegeId = admittedTypeMasterVM.CollegeId,               
                IsActive = admittedTypeMasterVM.IsActive,
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
        /// <param name="admittedTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(AdmittedTypeMasterVM admittedTypeMasterVM)
        {
            var admittedTypeMasters = await _context.AdmittedTypeMasters.FirstOrDefaultAsync(e => e.Id == admittedTypeMasterVM.Id);
            if (admittedTypeMasters != null)
            {
                admittedTypeMasters.Name = admittedTypeMasterVM.Name;
                admittedTypeMasters.CollegeId = admittedTypeMasterVM.CollegeId;
                admittedTypeMasters.IsActive = admittedTypeMasterVM.IsActive;
                admittedTypeMasters.UpdatedBy = userId;
                admittedTypeMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(admittedTypeMasters).State = EntityState.Modified;
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
                            TableId = admittedTypeMasterVM.Id,
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
            var admittedTypeMasters = await _context.AdmittedTypeMasters.FindAsync(id);
            if (admittedTypeMasters != null)
            {
                admittedTypeMasters.IsDeleted = true;
                admittedTypeMasters.UpdatedBy = userId;
                admittedTypeMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(admittedTypeMasters).State = EntityState.Modified;
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
                    response = await _context.AdmittedTypeMasters.Where(e => e.CollegeId == collegeId && e.IsActive  && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
