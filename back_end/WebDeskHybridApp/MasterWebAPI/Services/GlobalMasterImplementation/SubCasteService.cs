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
    public class SubCasteService: ISubCasteService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllSubCasteGMaster";
        private readonly string getOptionsCacheKey = "GetOptionsSubCasteGMaster";
        public SubCasteService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
            public async Task<IEnumerable<SubCasteGMasterVM?>> GetAll()
            {
                var response = new List<SubCasteGMasterVM>();
                response = await _redisService.GetRedisCacheData<List<SubCasteGMasterVM>>(getAllCacheKey);
                if (response != null)
                    return response;
                else
                {
                response = await _context.SubCasteGmasters.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Include(e =>e.CasteMaster).Select(e => new SubCasteGMasterVM()
                {
                Id = e.Id,
                Name = e.Name,
                CasteMasterId = e.CasteMasterId,
                CasteName=e.CasteMaster.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<SubCasteGMasterVM>();
                await _redisService.SetRedisCacheData<List<SubCasteGMasterVM>>(getAllCacheKey, response);
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
        public async Task<SubCasteGMasterVM?> Get(long id)
        {
            var response = new SubCasteGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<SubCasteGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<SubCasteGMasterVM>();
            else
            {
                response = await _context.SubCasteGmasters.Where(e => e.Id == id && e.IsDeleted == false).Include(e =>e.CasteMaster).Select(e => new SubCasteGMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CasteMasterId = e.CasteMasterId,
                CasteName = e.CasteMaster.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<SubCasteGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="subCasteGMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(SubCasteGMasterVM subCasteGMasterVM)
        {
            var recordExist = await _context.SubCasteGmasters.Where(re => re.Name == subCasteGMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<SubCasteGmaster> created = await _context.SubCasteGmasters.AddAsync(new SubCasteGmaster()
            {
                Name = subCasteGMasterVM.Name.Trim(),
                CasteMasterId= subCasteGMasterVM.CasteMasterId,
                IsActive = subCasteGMasterVM.IsActive,
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
        /// <param name="subCasteGMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(SubCasteGMasterVM subCasteGMasterVM)
        {
            var SubCasteMasters = await _context.SubCasteGmasters.FirstOrDefaultAsync(e => e.Id == subCasteGMasterVM.Id);
            if (SubCasteMasters != null)
            {
                SubCasteMasters.Name = subCasteGMasterVM.Name;
                SubCasteMasters.CasteMasterId = subCasteGMasterVM.CasteMasterId;
                SubCasteMasters.IsActive = subCasteGMasterVM.IsActive;
                SubCasteMasters.UpdatedBy = userId;
                SubCasteMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(SubCasteMasters).State = EntityState.Modified;
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
                            TableId = subCasteGMasterVM.Id,
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
            var SubCasteMasters = await _context.SubCasteGmasters.FindAsync(id);
            if (SubCasteMasters != null)
            {
                SubCasteMasters.IsDeleted = true;
                SubCasteMasters.UpdatedBy = userId;
                SubCasteMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(SubCasteMasters).State = EntityState.Modified;
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
                response = await _context.SubCasteGmasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
