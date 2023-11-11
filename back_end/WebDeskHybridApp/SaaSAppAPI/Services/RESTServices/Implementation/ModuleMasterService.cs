using SaaSAppAPI.ViewModels;
using SaaSAppAPI.Utility;
using SaaSAppAPI.ViewModels.Common;
using SaaSAppAPI.Data;
using SaaSAppAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using SaaSAppAPI.RedisService;
using SaaSAppAPI.Services.RESTServices.Contract;

namespace SaaSAppAPI.Services.RESTServices.Implementation
{
    public class ModuleMasterService : IModuleMasterService
    {
        private readonly SaaSdevDbFinalContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId = 0;
        private readonly long collegeId = 1;
        private readonly string? ipAddress = string.Empty;
        private readonly long academicYearId = 6;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllModuleMaster";
        private readonly string getOptionsCacheKey = "GetOptionsModuleMaster";
        public ModuleMasterService(SaaSdevDbFinalContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            //userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("Id"))?.Value);
            //collegeId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value);
            //ipAddress = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("IPAddress"))?.Value.ToString();
            redisService = _redisService;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<ModuleMasterVM?>> GetAll()
        {
            var response = new List<ModuleMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ModuleMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ModuleMasters.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new ModuleMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).ToListAsync();
                await _redisService.SetRedisCacheData(getAllCacheKey, response);
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
        public async Task<ModuleMasterVM?> Get(long id)
        {
            var response = new ModuleMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<ModuleMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault();
            else
            {
                response = await _context.ModuleMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new ModuleMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    Description = e.Description,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
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
        /// <param name="ModuleMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ModuleMasterVM moduleMasterVM)
        {
            var recordExist = await _context.ModuleMasters.Where(re => re.Name == moduleMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return null;
            EntityEntry<ModuleMaster> created = await _context.ModuleMasters.AddAsync(new ModuleMaster()
            {
                Name = moduleMasterVM.Name.Trim(),
                Description = moduleMasterVM.Description,
                IsActive = moduleMasterVM.IsActive,
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
        /// Update
        /// </summary>
        /// <param name="moduleMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ModuleMasterVM moduleMasterVM)
        {
            var moduleMasters = await _context.ModuleMasters.FirstOrDefaultAsync(e => e.Id == moduleMasterVM.Id);
            if (moduleMasters != null)
            {
                moduleMasters.Name = moduleMasterVM.Name;
                moduleMasters.Description = moduleMasterVM.Description;
                moduleMasters.IsActive = moduleMasterVM.IsActive;
                moduleMasters.UpdatedBy = userId;
                moduleMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(moduleMasters).State = EntityState.Modified;
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
                            TableId = moduleMasterVM.Id,
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
            var moduleMasters = await _context.ModuleMasters.FindAsync(id);
            if (moduleMasters != null)
            {
                moduleMasters.IsDeleted = true;
                moduleMasters.UpdatedBy = userId;
                moduleMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(moduleMasters).State = EntityState.Modified;
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
                response = await _context.ModuleMasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
                {
                    Id = e.Id,
                    Name = e.Name
                }).ToListAsync();
                await _redisService.SetRedisCacheData(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}

