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
    public class CandidatureTypeService : ICandidatureTypeService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllCandidatureTypeGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsCandidatureTypeGMaster";
        public CandidatureTypeService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<CandidatureTypeGMasterVM?>> GetAll()
        {
            var response = new List<CandidatureTypeGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<CandidatureTypeGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.CandidatureTypeGmasters.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new CandidatureTypeGMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<CandidatureTypeGMasterVM>();
                await _redisService.SetRedisCacheData<List<CandidatureTypeGMasterVM>>(getAllCacheKey, response);
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
        public async Task<CandidatureTypeGMasterVM?> Get(long id)
        {
            var response = new CandidatureTypeGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<CandidatureTypeGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<CandidatureTypeGMasterVM>();
            else
            {
                return await _context.CandidatureTypeGmasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new CandidatureTypeGMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).FirstOrDefaultAsync<CandidatureTypeGMasterVM>();
            }
            return response;           
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="candidatureTypeGMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(CandidatureTypeGMasterVM candidatureTypeGMasterVM)
        {
            var recordExist = await _context.CandidatureTypeGmasters.Where(re => re.Name == candidatureTypeGMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<CandidatureTypeGmaster> created = await _context.CandidatureTypeGmasters.AddAsync(new CandidatureTypeGmaster()
            {
                Name = candidatureTypeGMasterVM.Name.Trim(),
                IsActive = candidatureTypeGMasterVM.IsActive,
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
        /// <param name="candidatureTypeGMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(CandidatureTypeGMasterVM candidatureTypeGMasterVM)
        {
            var candidatureTypeMasters = await _context.CandidatureTypeGmasters.FirstOrDefaultAsync(e => e.Id == candidatureTypeGMasterVM.Id);
            if (candidatureTypeMasters != null)
            {
                candidatureTypeMasters.Name = candidatureTypeGMasterVM.Name;
                candidatureTypeMasters.IsActive = candidatureTypeGMasterVM.IsActive;
                candidatureTypeMasters.UpdatedBy = userId;
                candidatureTypeMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(candidatureTypeMasters).State = EntityState.Modified;
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
                            TableId = candidatureTypeGMasterVM.Id,
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
            var candidatureTypeMasters = await _context.CandidatureTypeGmasters.FindAsync(id);
            if (candidatureTypeMasters != null)
            {
                candidatureTypeMasters.IsDeleted = true;
                candidatureTypeMasters.UpdatedBy = userId;
                candidatureTypeMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(candidatureTypeMasters).State = EntityState.Modified;
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
                response = await _context.CandidatureTypeGmasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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

