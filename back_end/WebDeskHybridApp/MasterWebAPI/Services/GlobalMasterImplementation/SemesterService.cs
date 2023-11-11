using MasterWebAPI.Data;
using MasterWebAPI.Models;
using MasterWebAPI.RedisServices;
using MasterWebAPI.Services.GlobalMasterContract;
using MasterWebAPI.Utility;
using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MasterWebAPI.Services.GlobalMasterImplementation
{
    public class SemesterService : ISemesterService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllSemesterGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsSemesterGMaster";
        public SemesterService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<SemesterGMasterVM?>> GetAll()
        {
            var response = new List<SemesterGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<SemesterGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.SemesterGmasters.Where(s => s.IsDeleted == false).OrderByDescending(e => e.Id).Select(s => new SemesterGMasterVM()
            {
                Id = s.Id,
                Name = s.Name,
                SortOrder = s.SortOrder,
                IsActive = s.IsActive,
                CreatedBy = s.CreatedBy,
                CreatedDate = s.CreatedDate,
                UpdatedBy = s.UpdatedBy,
                UpdatedDate = s.UpdatedDate
            }).ToListAsync<SemesterGMasterVM>();
                await _redisService.SetRedisCacheData<List<SemesterGMasterVM>>(getAllCacheKey, response);
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
        public async Task<SemesterGMasterVM?> Get(long id)
        {
            var response = new SemesterGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<SemesterGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<SemesterGMasterVM>();
            else
            {
                return await _context.SemesterGmasters.Where(s => s.Id == id && s.IsDeleted == false).Select(s => new SemesterGMasterVM()
            {
                Id = s.Id,
                Name = s.Name,
                SortOrder = s.SortOrder,
                IsActive = s.IsActive,
                CreatedBy = s.CreatedBy,
                CreatedDate = s.CreatedDate,
                UpdatedBy = s.UpdatedBy,
                UpdatedDate = s.UpdatedDate
            }).FirstOrDefaultAsync<SemesterGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="semesterMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(SemesterGMasterVM semesterMasterVM)
        {
            var recordExist = await _context.SemesterGmasters.Where(re => re.Name == semesterMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<SemesterGmaster> created = await _context.SemesterGmasters.AddAsync(new SemesterGmaster()
            {
                Name = semesterMasterVM.Name.Trim(),
                SortOrder = semesterMasterVM.SortOrder,
                IsActive = semesterMasterVM.IsActive,
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
        /// <param name="semesterGmasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(SemesterGMasterVM semesterGmasterVM)
        {
            var semester = await _context.SemesterGmasters.FirstOrDefaultAsync(s => s.Id == semesterGmasterVM.Id);
            if (semester != null)
            {
                semester.Name = semesterGmasterVM.Name;
                semester.SortOrder = semesterGmasterVM.SortOrder;
                semester.IsActive = semesterGmasterVM.IsActive;
                semester.UpdatedBy = userId;
                semester.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(semester).State = EntityState.Modified;
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
                            TableId = semesterGmasterVM.Id,
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
            var semesterGmasters = await _context.SemesterGmasters.FindAsync(id);
            if (semesterGmasters != null)
            {
                semesterGmasters.IsDeleted = true;
                semesterGmasters.UpdatedBy = userId;
                semesterGmasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(semesterGmasters).State = EntityState.Modified;
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
                response = await _context.SemesterGmasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
