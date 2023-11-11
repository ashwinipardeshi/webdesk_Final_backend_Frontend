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
    public class AcademicYearService : IAcademicYearService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllAcademicYearMasters";
        private readonly string getOptionsCacheKey = "GetOptionsAcademicYearMasters";

        public AcademicYearService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<AcademicYearMasterVM?>> GetAll(long collegeId,long streamId)
        {
            string cacheKey = $"AcademicYearMasters_CollegeId_{collegeId}_AcademicYearMasters_StreamId_{streamId}";
            var response = new List<AcademicYearMasterVM>();
            response = await _redisService.GetRedisCacheData<List<AcademicYearMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.AcademicYearMasters.Where(p => p.CollegeId == collegeId && p.StreamId==streamId && p.IsDeleted == false).Include(p => p.Stream).Include(p => p.College).OrderByDescending(e => e.Id).Select(p => new AcademicYearMasterVM()
            {
                Id = p.Id,
                CollegeId = p.CollegeId,
                StreamId = p.StreamId,
                Name = p.Name,
                StreamName =p.Stream.Name,
                CollegeName = p.College.Name,
                Description = p.Description,
                StartYear = p.StartYear,
                EndYear = p.EndYear,
                IsActive = p.IsActive,
                CreatedBy = p.CreatedBy,
                CreatedDate = p.CreatedDate,
                UpdatedBy = p.UpdatedBy,
                UpdatedDate = p.UpdatedDate
            }).ToListAsync<AcademicYearMasterVM>();
                await _redisService.SetRedisCacheData<List<AcademicYearMasterVM>>(getAllCacheKey, response);
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
        public async Task<AcademicYearMasterVM?> Get(long id)
        {
            var response = new AcademicYearMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<AcademicYearMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<AcademicYearMasterVM>();
            else
            {
                response = await _context.AcademicYearMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new AcademicYearMasterVM()
            {
                Id = e.Id,
                CollegeId = e.CollegeId,
                StreamId = e.StreamId,
                Name = e.Name,
                StreamName = e.Stream.Name,
                CollegeName = e.College.Name,
                Description = e.Description,
                StartYear = e.StartYear,
                EndYear = e.EndYear,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<AcademicYearMasterVM>();
            }
            return response;
        }
        #endregion GetSpecific

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="academicMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(AcademicYearMasterVM academicMasterVM)
        {
            var recordExist = await _context.AcademicYearMasters.Where(re => re.Name == academicMasterVM.Name.Trim() && re.CollegeId==academicMasterVM.CollegeId&& re.StreamId == academicMasterVM.StreamId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<AcademicYearMaster> created = await _context.AcademicYearMasters.AddAsync(new AcademicYearMaster()
            {
                CollegeId = academicMasterVM.CollegeId,
                StreamId = academicMasterVM.StreamId,
                Name = academicMasterVM.Name.Trim(),
                Description = academicMasterVM.Description,
                StartYear = academicMasterVM.StartYear,
                EndYear = academicMasterVM.EndYear,
                IsActive = academicMasterVM.IsActive,
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
        /// <param name="academicMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(AcademicYearMasterVM academicYearMasterVM)
        {
            var academicYearMaster = await _context.AcademicYearMasters.FirstOrDefaultAsync(e => e.Id == academicYearMasterVM.Id);
            if (academicYearMaster != null)
            {
                academicYearMaster.CollegeId = academicYearMasterVM.CollegeId;
                academicYearMaster.StreamId = academicYearMasterVM.StreamId;
                academicYearMaster.Name = academicYearMasterVM.Name;
                academicYearMaster.IsActive = academicYearMasterVM.IsActive;
                academicYearMaster.Description = academicYearMasterVM.Description;
                academicYearMaster.StartYear = academicYearMasterVM.StartYear;
                academicYearMaster.EndYear = academicYearMasterVM.EndYear;
                academicYearMaster.UpdatedBy = userId;
                academicYearMaster.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(academicYearMaster).State = EntityState.Modified;
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
                            TableId = academicYearMasterVM.Id,
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
            var academicYearMaster = await _context.AcademicYearMasters.FindAsync(id);
            if (academicYearMaster != null)
            {
                academicYearMaster.IsDeleted = true;
                academicYearMaster.UpdatedBy = userId;
                academicYearMaster.UpdatedDate = DateTime.UtcNow;
                _context.Entry(academicYearMaster).State = EntityState.Modified;
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
        public async Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long streamId)
        {
            var response = new List<OptionVM>();
            response = await _redisService.GetRedisCacheData<List<OptionVM>>(getOptionsCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.AcademicYearMasters.Where(p => p.CollegeId == collegeId && p.StreamId == streamId && p.IsActive && p.IsDeleted == false).OrderBy(e => e.Name).Select(p => new OptionVM()
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
