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
    public class AcademicStatusService : IAcademicStatusService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllAcademicStatusMasters";
        private readonly string getOptionsCacheKey = "GetOptionsAcademicStatusMasters";
        public AcademicStatusService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<AcademicStatusMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"AcademicStatusMasters_CollegeId_{collegeId}";
            var response = new List<AcademicStatusMasterVM>();
            response = await _redisService.GetRedisCacheData<List<AcademicStatusMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.AcademicStatusMasters.Where(p => p.IsDeleted == false && p.CollegeId==collegeId).Include(p => p.College).OrderByDescending(e => e.Id).Select(p => new AcademicStatusMasterVM()
            {
                Id = p.Id,
                CollegeId = p.CollegeId,                
                Name = p.Name,                
                CollegeName = p.College.Name,              
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).ToListAsync<AcademicStatusMasterVM>();
                await _redisService.SetRedisCacheData<List<AcademicStatusMasterVM>>(getAllCacheKey, response);
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
        public async Task<AcademicStatusMasterVM?> Get(long id)
        {
            var response = new AcademicStatusMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<AcademicStatusMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<AcademicStatusMasterVM>();
            else
            {
                response = await _context.AcademicStatusMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new AcademicStatusMasterVM()
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
            }).FirstOrDefaultAsync<AcademicStatusMasterVM>();
            }
            return response;
        }
        #endregion GetSpecific

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="academicStatusMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(AcademicStatusMasterVM academicStatusMasterVM)
        {
            var recordExist = await _context.AcademicStatusMasters.Where(re => re.Name == academicStatusMasterVM.Name.Trim() && re.CollegeId == academicStatusMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<AcademicStatusMaster> created = await _context.AcademicStatusMasters.AddAsync(new AcademicStatusMaster()
            {
                CollegeId = academicStatusMasterVM.CollegeId,                
                Name = academicStatusMasterVM.Name,              
                IsActive = academicStatusMasterVM.IsActive,
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
        /// <param name="academicStatusMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(AcademicStatusMasterVM academicStatusMasterVM)
        {
            var academicStatusMaster = await _context.AcademicStatusMasters.FirstOrDefaultAsync(e => e.Id == academicStatusMasterVM.Id);
            if (academicStatusMaster != null)
            {
                academicStatusMaster.CollegeId = academicStatusMasterVM.CollegeId;               
                academicStatusMaster.Name = academicStatusMasterVM.Name;
                academicStatusMaster.IsActive = academicStatusMasterVM.IsActive;                
                academicStatusMaster.UpdatedBy = userId;
                academicStatusMaster.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(academicStatusMaster).State = EntityState.Modified;
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
                            TableId = academicStatusMasterVM.Id,
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
        #endregion UpdateAcademic

        #region Delete
        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool?> Delete(long id)
        {
            var academicStatusMaster = await _context.AcademicStatusMasters.FindAsync(id);
            if (academicStatusMaster != null)
            {
                academicStatusMaster.IsDeleted = true;
                academicStatusMaster.UpdatedBy = userId;
                academicStatusMaster.UpdatedDate = DateTime.UtcNow;
                _context.Entry(academicStatusMaster).State = EntityState.Modified;
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
                response = await _context.AcademicStatusMasters.Where(p => p.CollegeId == collegeId && p.IsActive && p.IsDeleted == false).OrderBy(e => e.Name).Select(p => new OptionVM()
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
