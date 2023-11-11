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
    public class ModeOfAdmissionMasterService : IModeOfAdmissionMasterService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllModeOfAdmissionMaster";
        private readonly string getOptionsCacheKey = "GetOptionsModeOfAdmissionMaster";
        public ModeOfAdmissionMasterService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<ModeOfAdmissionMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"ModeOfAdmissionMasters_CollegeId_{collegeId}";
            var response = new List<ModeOfAdmissionMasterVM>();
            response = await _redisService.GetRedisCacheData<List<ModeOfAdmissionMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.ModeOfAdmissionMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new ModeOfAdmissionMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    CollegeId = e.CollegeId,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).ToListAsync<ModeOfAdmissionMasterVM>();
                // Store into Redis Cache
                await _redisService.SetRedisCacheData<List<ModeOfAdmissionMasterVM>>(getAllCacheKey, response);
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
        public async Task<ModeOfAdmissionMasterVM?> Get(long id)
        {
            var response = new ModeOfAdmissionMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<ModeOfAdmissionMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<ModeOfAdmissionMasterVM>();
            else
            {
                return await _context.ModeOfAdmissionMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new ModeOfAdmissionMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId = e.CollegeId,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<ModeOfAdmissionMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="modeOfAdmissionMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(ModeOfAdmissionMasterVM modeOfAdmissionMasterVM)
        {
            var recordExist = await _context.ModeOfAdmissionMasters.Where(re => re.Name == modeOfAdmissionMasterVM.Name.Trim() && re.CollegeId == modeOfAdmissionMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<ModeOfAdmissionMaster> created = await _context.ModeOfAdmissionMasters.AddAsync(new ModeOfAdmissionMaster()
            {
                CollegeId = modeOfAdmissionMasterVM.CollegeId,
                Name = modeOfAdmissionMasterVM.Name.Trim(),
                IsActive = modeOfAdmissionMasterVM.IsActive,
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
        /// <param name="modeOfAdmissionMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(ModeOfAdmissionMasterVM modeOfAdmissionMasterVM)
        {
            var modeOfAdmissionMastes = await _context.ModeOfAdmissionMasters.FirstOrDefaultAsync(e => e.Id == modeOfAdmissionMasterVM.Id);
            if (modeOfAdmissionMastes != null)
            {
                modeOfAdmissionMastes.Name = modeOfAdmissionMasterVM.Name;
                modeOfAdmissionMastes.CollegeId = modeOfAdmissionMasterVM.CollegeId;
                modeOfAdmissionMastes.IsActive = modeOfAdmissionMasterVM.IsActive;
                modeOfAdmissionMastes.UpdatedBy = userId;
                modeOfAdmissionMastes.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(modeOfAdmissionMastes).State = EntityState.Modified;
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
                            TableId = modeOfAdmissionMasterVM.Id,
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
            var modeOfAdmissionMasters = await _context.ModeOfAdmissionMasters.FindAsync(id);
            if (modeOfAdmissionMasters != null)
            {
                modeOfAdmissionMasters.IsDeleted = true;
                modeOfAdmissionMasters.UpdatedBy = userId;
                modeOfAdmissionMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(modeOfAdmissionMasters).State = EntityState.Modified;
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
                response = await _context.ModeOfAdmissionMasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
