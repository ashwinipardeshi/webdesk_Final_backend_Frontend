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
    public class AdmissionTypeService : IAdmissionTypeService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllAdmissionTypeMasters";
        private readonly string getOptionsCacheKey = "GetOptionsAdmissionTypeMasters";
        public AdmissionTypeService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<AdmissionTypeMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"AdmissionTypeMasters_CollegeId_{collegeId}";
            var response = new List<AdmissionTypeMasterVM>();
            response = await _redisService.GetRedisCacheData<List<AdmissionTypeMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.AdmissionTypeMasters.Where(p => p.CollegeId == collegeId && p.IsDeleted == false).Include(p => p.College).OrderByDescending(e => e.Id).Select(p => new AdmissionTypeMasterVM()
             {
                 Id = p.Id,
                CollegeId = p.CollegeId,
                Name = p.Name,
                CollegeName =p.College.Name,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).ToListAsync<AdmissionTypeMasterVM>();
                await _redisService.SetRedisCacheData<List<AdmissionTypeMasterVM>>(getAllCacheKey, response);
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
        public async Task<AdmissionTypeMasterVM?> Get(long id)
        {
            var response = new AdmissionTypeMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<AdmissionTypeMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<AdmissionTypeMasterVM>();
            else
            {
                response = await _context.AdmissionTypeMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new AdmissionTypeMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                Name = e.Name,
                CollegeName = e.College.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<AdmissionTypeMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="admissionTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(AdmissionTypeMasterVM admissionTypeMasterVM)
        {
            var recordExist = await _context.AdmissionTypeMasters.Where(re => re.Name == admissionTypeMasterVM.Name.Trim() && re.CollegeId == admissionTypeMasterVM.CollegeId  && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<AdmissionTypeMaster> created = await _context.AdmissionTypeMasters.AddAsync(new AdmissionTypeMaster()
            {
                CollegeId = admissionTypeMasterVM.CollegeId,
                Name = admissionTypeMasterVM.Name.Trim(),
                IsActive = admissionTypeMasterVM.IsActive,
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
        /// <param name="admissionTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(AdmissionTypeMasterVM admissionTypeMasterVM)
        {
            var admissionTypeMasters = await _context.AdmissionTypeMasters.FirstOrDefaultAsync(e => e.Id == admissionTypeMasterVM.Id);
            if (admissionTypeMasters != null)
            {
                admissionTypeMasters.CollegeId = admissionTypeMasterVM.CollegeId;
                admissionTypeMasters.Name = admissionTypeMasterVM.Name;
                admissionTypeMasters.IsActive = admissionTypeMasterVM.IsActive;
                admissionTypeMasters.UpdatedBy = userId;
                admissionTypeMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(admissionTypeMasters).State = EntityState.Modified;
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
                            TableId = admissionTypeMasterVM.Id,
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
            var admissionTypeMasters = await _context.AdmissionTypeMasters.FindAsync(id);
            if (admissionTypeMasters != null)
            {
                admissionTypeMasters.IsDeleted = true;
                admissionTypeMasters.UpdatedBy = userId;
                admissionTypeMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(admissionTypeMasters).State = EntityState.Modified;
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
                response = await _context.AdmissionTypeMasters.Where(p => p.CollegeId == collegeId && p.IsActive && p.IsDeleted == false).OrderBy(e => e.Name).Select(p => new AdmissionTypeMasterVM()
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
