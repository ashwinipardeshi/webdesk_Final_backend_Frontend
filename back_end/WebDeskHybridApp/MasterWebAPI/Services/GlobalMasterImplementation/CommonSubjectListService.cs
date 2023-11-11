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
    public class CommonSubjectListService : ICommonSubjectListService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllCommonSubjectList";
        private readonly string getOptionsCacheKey = "GetOptionsCommonSubjectList";
        public CommonSubjectListService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<CommonSubjectListGMasterVM?>> GetAll()
        {
            var response = new List<CommonSubjectListGMasterVM>();
            response = await _redisService.GetRedisCacheData<List<CommonSubjectListGMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else // DB Call 
            {
                response = await _context.CommonSubjectListGmasters.Where(a => a.IsDeleted == false).OrderByDescending(e => e.Id).Select(a => new CommonSubjectListGMasterVM()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Type = a.Type,
                    IsActive = a.IsActive,
                    CreatedBy = a.CreatedBy,
                    CreatedDate = a.CreatedDate,
                    UpdatedBy = a.UpdatedBy,
                    UpdatedDate = a.UpdatedDate
                }).ToListAsync<CommonSubjectListGMasterVM>();
                await _redisService.SetRedisCacheData<List<CommonSubjectListGMasterVM>>(getAllCacheKey, response);
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
        public async Task<CommonSubjectListGMasterVM?> Get(long id)
        {
            var response = new CommonSubjectListGMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<CommonSubjectListGMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<CommonSubjectListGMasterVM>();
            else
            {
                return await _context.CommonSubjectListGmasters.Where(a => a.Id == id && a.IsDeleted == false).Select(a => new CommonSubjectListGMasterVM()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Type = a.Type,
                    IsActive = a.IsActive,
                    CreatedBy = a.CreatedBy,
                    CreatedDate = a.CreatedDate,
                    UpdatedBy = a.UpdatedBy,
                    UpdatedDate = a.UpdatedDate
                }).FirstOrDefaultAsync<CommonSubjectListGMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="commonSubjectListGMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(CommonSubjectListGMasterVM commonSubjectListGMasterVM)
        {
            var recordExist = await _context.CommonSubjectListGmasters.Where(re => re.Name == commonSubjectListGMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<CommonSubjectListGmaster> created = await _context.CommonSubjectListGmasters.AddAsync(new CommonSubjectListGmaster()
            {
                Name = commonSubjectListGMasterVM.Name.Trim(),
                Type = commonSubjectListGMasterVM.Type,
                IsActive = commonSubjectListGMasterVM.IsActive,
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
        /// <param name="commonSubjectListGMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(CommonSubjectListGMasterVM commonSubjectListGMasterVM)
        {
            var CommonSubjectList = await _context.CommonSubjectListGmasters.FirstOrDefaultAsync(a => a.Id == commonSubjectListGMasterVM.Id);
            if (CommonSubjectList != null)
            {
                CommonSubjectList.Name = commonSubjectListGMasterVM.Name;
                CommonSubjectList.Type = commonSubjectListGMasterVM.Type;
                CommonSubjectList.IsActive = commonSubjectListGMasterVM.IsActive;
                CommonSubjectList.UpdatedBy = userId;
                CommonSubjectList.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(CommonSubjectList).State = EntityState.Modified;
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
                            TableId = commonSubjectListGMasterVM.Id,
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
            var CommonSubjectList = await _context.CommonSubjectListGmasters.FindAsync(id);
            if (CommonSubjectList != null)
            {
                CommonSubjectList.IsDeleted = true;
                CommonSubjectList.UpdatedBy = userId;
                CommonSubjectList.UpdatedDate = DateTime.UtcNow;
                _context.Entry(CommonSubjectList).State = EntityState.Modified;
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
                response = await _context.FeeHeadTypeMasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
