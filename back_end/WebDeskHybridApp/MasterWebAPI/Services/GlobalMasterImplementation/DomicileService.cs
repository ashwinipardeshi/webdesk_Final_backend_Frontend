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
    public class DomicileService : IDomicileService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllDomicileGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsDomicileGMaster";
        public DomicileService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<DomicileGMasterVM?>> GetAll()
        {
            var response = new List<DomicileGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<DomicileGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.DomicileGmasters.Where(d => d.IsDeleted == false).OrderByDescending(e => e.Id).Select(d => new DomicileGMasterVM()
            {
                Id = d.Id,
                Name = d.Name,
                IsActive = d.IsActive,
                CreatedBy = d.CreatedBy,
                CreatedDate = d.CreatedDate,
                UpdatedBy = d.UpdatedBy,
                UpdatedDate = d.UpdatedDate
            }).ToListAsync<DomicileGMasterVM>();
                await _redisService.SetRedisCacheData<List<DomicileGMasterVM>>(getAllCacheKey, response);
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
        public async Task<DomicileGMasterVM?> Get(long id)
        {
            var response = new DomicileGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<DomicileGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<DomicileGMasterVM>();
            else
            {
                return await _context.DomicileGmasters.Where(d => d.Id == id && d.IsDeleted == false).Select(d => new DomicileGMasterVM()
                {
                    Id = d.Id,
                    Name = d.Name,
                    IsActive = d.IsActive,
                    CreatedBy = d.CreatedBy,
                    CreatedDate = d.CreatedDate,
                    UpdatedBy = d.UpdatedBy,
                    UpdatedDate = d.UpdatedDate
                }).FirstOrDefaultAsync<DomicileGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="domicileGmasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(DomicileGMasterVM domicileGmasterVM)
        {
            var recordExist = await _context.DomicileGmasters.Where(re => re.Name == domicileGmasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<DomicileGmaster> created = await _context.DomicileGmasters.AddAsync(new DomicileGmaster()
            {
                Name = domicileGmasterVM.Name.Trim(),
                IsActive = domicileGmasterVM.IsActive,
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
        /// </summary>
        /// <param name="id"></param>
        /// <param name="domicileGmasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(DomicileGMasterVM domicileGmasterVM)
        {
            var domicile = await _context.DomicileGmasters.FirstOrDefaultAsync(d => d.Id == domicileGmasterVM.Id);
            if (domicile != null)
            {
                domicile.Name = domicileGmasterVM.Name;
                domicile.IsActive = domicileGmasterVM.IsActive;
                domicile.UpdatedBy = userId;
                domicile.UpdatedDate = DateTime.UtcNow;

            }
            _context.Entry(domicile).State = EntityState.Modified;
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
                            TableId = domicileGmasterVM.Id,
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
            var domicile = await _context.DomicileGmasters.FindAsync(id);
            if (domicile != null)
            {
                domicile.IsDeleted = true;
                domicile.UpdatedBy = userId;
                domicile.UpdatedDate = DateTime.UtcNow;
                _context.Entry(domicile).State = EntityState.Modified;
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
                response = await _context.DomicileGmasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
