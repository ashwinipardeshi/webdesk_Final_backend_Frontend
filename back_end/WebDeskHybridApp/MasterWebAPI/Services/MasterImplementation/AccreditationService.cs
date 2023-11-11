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
    public class AccreditationService : IAccreditationService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllAccreditationMasters";
        private readonly string getOptionsCacheKey = "GetOptionsAccreditationMasters";
        public AccreditationService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<AccreditationMasterVM?>> GetAll(long collegeId,long streamId)
        {
            string cacheKey = $"AccreditationMasters_CollegeId_{collegeId}_AccreditationMasters_StreamId{streamId}";
            var response = new List<AccreditationMasterVM>();
            response = await _redisService.GetRedisCacheData<List<AccreditationMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.AccreditationMasters.Where(e => e.CollegeId == collegeId && e.StreamId == streamId && e.IsDeleted == false).Include(e => e.Stream).Include(e =>e.College).OrderByDescending(e => e.Id).Select(e => new AccreditationMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId = e.CollegeId,
                CollegeName=e.College.Name,
                StreamId= e.StreamId,
                StreamName=e.Stream.Name,
                Year= e.Year,
                Grade= e.Grade,
                VaildTill= e.VaildTill,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<AccreditationMasterVM>();
                await _redisService.SetRedisCacheData<List<AccreditationMasterVM>>(getAllCacheKey, response);
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
        public async Task<AccreditationMasterVM?> Get(long id)
        {
            var response = new AccreditationMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<AccreditationMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<AccreditationMasterVM>();
            else
            {
                response = await _context.AccreditationMasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e => e.Stream).Include(e => e.College).Select(e => new AccreditationMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                StreamId = e.StreamId,
                StreamName = e.Stream.Name,
                Year = e.Year,
                Grade = e.Grade,
                VaildTill = e.VaildTill,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<AccreditationMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="accreditationMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(AccreditationMasterVM accreditationMasterVM)
        {
            var recordExist = await _context.AccreditationMasters.Where(re => re.Name == accreditationMasterVM.Name.Trim() && re.CollegeId == accreditationMasterVM.CollegeId && re.StreamId == accreditationMasterVM.StreamId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<AccreditationMaster> created = await _context.AccreditationMasters.AddAsync(new AccreditationMaster()
            {
                Name = accreditationMasterVM.Name.Trim(),
                CollegeId = accreditationMasterVM.CollegeId,
                StreamId = accreditationMasterVM.StreamId,
                Year = accreditationMasterVM.Year,
                Grade = accreditationMasterVM.Grade,
                VaildTill = accreditationMasterVM.VaildTill,
                IsActive = accreditationMasterVM.IsActive,
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
        /// <param name="accreditationMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(AccreditationMasterVM accreditationMasterVM)
        {
            var accreditationMasters = await _context.AccreditationMasters.FirstOrDefaultAsync(e => e.Id == accreditationMasterVM.Id);
            if (accreditationMasters != null)
            {
                accreditationMasters.Name = accreditationMasterVM.Name;
                accreditationMasters.CollegeId = accreditationMasterVM.CollegeId;
                accreditationMasters.StreamId = accreditationMasterVM.StreamId;
                accreditationMasters.Year = accreditationMasterVM.Year;
                accreditationMasters.Grade = accreditationMasterVM.Grade;
                accreditationMasters.VaildTill = accreditationMasterVM.VaildTill;
                accreditationMasters.IsActive = accreditationMasterVM.IsActive;
                accreditationMasters.UpdatedBy = userId;
                accreditationMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(accreditationMasters).State = EntityState.Modified;
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
                            TableId = accreditationMasterVM.Id,
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
            var accreditationMasters = await _context.AccreditationMasters.FindAsync(id);
            if (accreditationMasters != null)
            {
                accreditationMasters.IsDeleted = true;
                accreditationMasters.UpdatedBy = userId;
                accreditationMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(accreditationMasters).State = EntityState.Modified;
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
                response = await _context.AccreditationMasters.Where(e => e.CollegeId == collegeId && e.StreamId == streamId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
