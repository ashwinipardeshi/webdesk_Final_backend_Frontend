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
    public class DocumentService : IDocumentService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllDocumentService";
        private readonly string getOptionsCacheKey = "GetOptionsDocumentService";
        public DocumentService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<DocumentMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"DocumentMasters_CollegeId_{collegeId}";
            var response = new List<DocumentMasterVM>();
            response = await _redisService.GetRedisCacheData<List<DocumentMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.DocumentMasters.Where(e => e.CollegeId == collegeId && e.IsDeleted == false).Include(e => e.College).OrderByDescending(e => e.Id).Select(e => new DocumentMasterVM()
            {
                Id = e.Id,
                Name = e.Name,
                CollegeId = e.CollegeId,
                CollegeName = e.College.Name,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<DocumentMasterVM>();
                await _redisService.SetRedisCacheData<List<DocumentMasterVM>>(getAllCacheKey, response);
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
        public async Task<DocumentMasterVM?> Get(long id)
        {
            var response = new DocumentMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<DocumentMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<DocumentMasterVM>();
            else
            {
                return await _context.DocumentMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new DocumentMasterVM()
                {
                    Id = e.Id,
                    Name = e.Name,
                    CollegeId = e.CollegeId,
                    CollegeName = e.College.Name,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).FirstOrDefaultAsync<DocumentMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="documentMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(DocumentMasterVM documentMasterVM)
        {
            var recordExist = await _context.DocumentMasters.Where(re => re.Name == documentMasterVM.Name.Trim() && re.CollegeId == documentMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<DocumentMaster> created = await _context.DocumentMasters.AddAsync(new DocumentMaster()
            {
                Name = documentMasterVM.Name.Trim(),
                CollegeId = documentMasterVM.CollegeId,
                IsActive = documentMasterVM.IsActive,
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
        /// <param name="documentMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(DocumentMasterVM documentMasterVM)
        {
            var documentMasters = await _context.DocumentMasters.FirstOrDefaultAsync(e => e.Id == documentMasterVM.Id);
            if (documentMasters != null)
            {
                documentMasters.Name = documentMasterVM.Name;
                documentMasters.CollegeId = documentMasterVM.CollegeId;
                documentMasters.IsActive = documentMasterVM.IsActive;
                documentMasters.UpdatedBy = userId;
                documentMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(documentMasters).State = EntityState.Modified;
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
                            TableId = documentMasterVM.Id,
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
            var documentMasters = await _context.DocumentMasters.FindAsync(id);
            if (documentMasters != null)
            {
                documentMasters.IsDeleted = true;
                documentMasters.UpdatedBy = userId;
                documentMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(documentMasters).State = EntityState.Modified;
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
                response = await _context.DocumentMasters.Where(e => e.CollegeId == collegeId && e.IsActive == true && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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
