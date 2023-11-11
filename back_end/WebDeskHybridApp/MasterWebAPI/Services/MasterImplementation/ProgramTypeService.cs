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
    public class ProgramTypeService : IProgramTypeService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllProgramTypeMaster";
        private readonly string getOptionsCacheKey = "GetOptionsProgramTypeMaster";
        public ProgramTypeService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<ProgramTypeMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"ProgramTypeMasters_CollegeId_{collegeId}";
            var response = new List<ProgramTypeMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ProgramTypeMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ProgramTypeMasters.Where(p => p.CollegeId == collegeId && p.IsDeleted == false).Include(p => p.College).OrderByDescending(e => e.Id).Select(p => new ProgramTypeMasterVM()
                {
                    Id = p.Id,
                    CollegeId = p.CollegeId,
                    CollegeName = p.College.Name,
                    Name = p.Name,
                    Description = p.Description,
                    IsActive = p.IsActive,
                    CreatedBy = p.CreatedBy,
                    CreatedDate = p.CreatedDate,
                    UpdatedBy = p.UpdatedBy,
                    UpdatedDate = p.UpdatedDate
                }).ToListAsync<ProgramTypeMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<ProgramTypeMasterVM>>(getAllCacheKey, response);
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
        public async Task<ProgramTypeMasterVM?> Get(long id)
        {
            var response = new ProgramTypeMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<ProgramTypeMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<ProgramTypeMasterVM>();
            else
            {
                return await _context.ProgramTypeMasters.Where(p => p.Id == id && p.IsDeleted == false).Include(p => p.College).Select(p => new ProgramTypeMasterVM()
                {
                    Id = p.Id,
                    CollegeId = p.CollegeId,
                    CollegeName = p.College.Name,
                    Name = p.Name,
                    Description = p.Description,
                    IsActive = p.IsActive,
                    CreatedBy = p.CreatedBy,
                    CreatedDate = p.CreatedDate,
                    UpdatedBy = p.UpdatedBy,
                    UpdatedDate = p.UpdatedDate
                }).FirstOrDefaultAsync<ProgramTypeMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="programTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ProgramTypeMasterVM programTypeMasterVM)
        {
            var recordExist = await _context.ProgramTypeMasters.Where(re => re.Name == programTypeMasterVM.Name.Trim() && re.CollegeId == programTypeMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<ProgramTypeMaster> created = await _context.ProgramTypeMasters.AddAsync(new ProgramTypeMaster()
            {
                Name = programTypeMasterVM.Name.Trim(),
                CollegeId = programTypeMasterVM.CollegeId,
                Description = programTypeMasterVM.Description,
                IsActive = programTypeMasterVM.IsActive,
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
        /// </summary>
        /// <param name="id"></param>
        /// <param name="programTypeMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ProgramTypeMasterVM programTypeMasterVM)
        {
            var programType = await _context.ProgramTypeMasters.FirstOrDefaultAsync(s => s.Id == programTypeMasterVM.Id);
            if (programType != null)
            {
                programType.Name = programTypeMasterVM.Name;
                programType.CollegeId = programTypeMasterVM.CollegeId;
                programType.Description = programTypeMasterVM.Description;
                programType.IsActive = programTypeMasterVM.IsActive;
                programType.UpdatedBy = userId;
                programType.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(programType).State = EntityState.Modified;
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
                            TableId = programTypeMasterVM.Id,
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
            var programType = await _context.ProgramTypeMasters.FindAsync(id);
            if (programType != null)
            {
                programType.IsDeleted = true;
                programType.UpdatedBy = userId;
                programType.UpdatedDate = DateTime.UtcNow;
                _context.Entry(programType).State = EntityState.Modified;
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
                response = await _context.ProgramTypeMasters.Where(p => p.CollegeId == collegeId && p.IsActive && p.IsDeleted == false).OrderBy(e => e.Name).Select(p => new OptionVM()
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

