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
    public class DepartmentService : IDepartmentService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllDepartmentMaster";
        private readonly string getOptionsCacheKey = "GetOptionsDepartmentMaster";
        public DepartmentService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<DepartmentMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"DepartmentMasters_CollegeId_{collegeId}";
            var response = new List<DepartmentMasterVM>();
            response = await _redisService.GetRedisCacheData<List<DepartmentMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.DepartmentMasters.Where(p => p.CollegeId == collegeId && p.IsDeleted == false).Include(p => p.College).OrderByDescending(e => e.Id).Select(p => new DepartmentMasterVM()
            {
                Id = p.Id,
                CollegeId = p.CollegeId,
                ParentId = p.ParentId,
                Name = p.Name,
                CollegeName = p.College.Name,
                Description = p.Description,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).ToListAsync<DepartmentMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<DepartmentMasterVM>>(getAllCacheKey, response);
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
        public async Task<DepartmentMasterVM?> Get(long id)
        {
            var response = new DepartmentMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<DepartmentMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<DepartmentMasterVM>();
            else
            {
                response = await _context.DepartmentMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new DepartmentMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                ParentId = e.ParentId,
                Name = e.Name,
                CollegeName = e.College.Name,
                Description = e.Description,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<DepartmentMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="departmentMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(DepartmentMasterVM departmentMasterVM)
        {
            var recordExist = await _context.DepartmentMasters.Where(re => re.Name == departmentMasterVM.Name.Trim() && re.CollegeId == departmentMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<DepartmentMaster> created = await _context.DepartmentMasters.AddAsync(new DepartmentMaster()
            {
                CollegeId = departmentMasterVM.CollegeId,
                ParentId = departmentMasterVM.ParentId == 0 ? null : departmentMasterVM.ParentId,
                Name = departmentMasterVM.Name.Trim(),
                Description = departmentMasterVM.Description,
                IsActive = departmentMasterVM.IsActive,
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
        /// <param name="departmentMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(DepartmentMasterVM departmentMasterVM)
        {
            var departmentMasters = await _context.DepartmentMasters.FirstOrDefaultAsync(e => e.Id == departmentMasterVM.Id);
            if (departmentMasters != null)
            {
                departmentMasters.CollegeId = departmentMasterVM.CollegeId;
                departmentMasters.ParentId = departmentMasterVM.ParentId == 0 ? null : departmentMasterVM.ParentId;
                departmentMasters.Name = departmentMasterVM.Name;
                departmentMasters.IsActive = departmentMasterVM.IsActive;
                departmentMasters.Description = departmentMasterVM.Description;
                departmentMasters.UpdatedBy = userId;
                departmentMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(departmentMasters).State = EntityState.Modified;
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
                            TableId = departmentMasterVM.Id,
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
            var departmentMasters = await _context.DepartmentMasters.FindAsync(id);
            if (departmentMasters != null)
            {
                departmentMasters.IsDeleted = true;
                departmentMasters.UpdatedBy = userId;
                departmentMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(departmentMasters).State = EntityState.Modified;
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
                response = await _context.DepartmentMasters.Where(p => p.CollegeId == collegeId && p.IsActive && p.IsDeleted == false).OrderBy(e => e.Name).Select(p => new OptionVM()
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
