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
    public class SMTPConfigService : ISMTPConfigService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllSMTPConfigMaster";
        private readonly string getOptionsCacheKey = "GetOptionsSMTPConfigMaster";
        public SMTPConfigService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<SMTPConfigMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"SmtpconfigMasters_CollegeId_{collegeId}";
            var response = new List<SMTPConfigMasterVM>();
            response = await _redisService.GetRedisCacheData<List<SMTPConfigMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.SmtpconfigMasters.Where(s => s.CollegeId == collegeId && s.IsDeleted == false).Include(s => s.College).OrderByDescending(e => e.Id).Select(s => new SMTPConfigMasterVM()
            {
                Id = s.Id,
                CollegeId = s.CollegeId,
                CollegeName = s.College.Name,
                Name = s.Name,
                IsActive = s.IsActive,
                CreatedBy = s.CreatedBy,
                CreatedDate = s.CreatedDate,
                UpdatedBy = s.UpdatedBy,
                UpdatedDate = s.UpdatedDate
            }).ToListAsync<SMTPConfigMasterVM>();
                await _redisService.SetRedisCacheData<List<SMTPConfigMasterVM>>(getAllCacheKey, response);
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
        public async Task<SMTPConfigMasterVM?> Get(long id)
        {
            var response = new SMTPConfigMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<SMTPConfigMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<SMTPConfigMasterVM>();
            else
            {
                return await _context.SmtpconfigMasters.Where(s => s.Id == id && s.IsDeleted == false).Include(s => s.College).Select(s => new SMTPConfigMasterVM()
            {
                Id = s.Id,
                CollegeId = s.CollegeId,
                CollegeName = s.College.Name,
                Name = s.Name,
                IsActive = s.IsActive,
                CreatedBy = s.CreatedBy,
                CreatedDate = s.CreatedDate,
                UpdatedBy = s.UpdatedBy,
                UpdatedDate = s.UpdatedDate
            }).FirstOrDefaultAsync<SMTPConfigMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="smtpConfigMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(SMTPConfigMasterVM smtpConfigMasterVM)
        {
            var recordExist = await _context.SmtpconfigMasters.Where(re => re.Name == smtpConfigMasterVM.Name.Trim() && re.CollegeId == smtpConfigMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<SmtpconfigMaster> created = await _context.SmtpconfigMasters.AddAsync(new SmtpconfigMaster()
            {
                CollegeId = smtpConfigMasterVM.CollegeId,
                Name = smtpConfigMasterVM.Name.Trim(),
                IsActive = smtpConfigMasterVM.IsActive,
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
        /// <param name="smtpConfigMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(SMTPConfigMasterVM smtpConfigMasterVM)
        {
            var smtpconfig = await _context.SmtpconfigMasters.FirstOrDefaultAsync(e => e.Id == smtpConfigMasterVM.Id);
            if (smtpconfig != null)
            {
                smtpconfig.CollegeId = smtpConfigMasterVM.CollegeId;
                smtpconfig.Name = smtpConfigMasterVM.Name;
                smtpconfig.IsActive = smtpConfigMasterVM.IsActive;
                smtpconfig.UpdatedBy = userId;
                smtpconfig.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(smtpconfig).State = EntityState.Modified;
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
                            TableId = smtpConfigMasterVM.Id,
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
            var smtpconfig = await _context.SmtpconfigMasters.FindAsync(id);
            if (smtpconfig != null)
            {
                smtpconfig.IsDeleted = true;
                smtpconfig.UpdatedBy = userId;
                smtpconfig.UpdatedDate = DateTime.UtcNow;
                _context.Entry(smtpconfig).State = EntityState.Modified;
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
                response = await _context.SmtpconfigMasters.Where(s => s.CollegeId == collegeId && s.IsActive && s.IsDeleted == false).OrderBy(e => e.Name).Select(s => new OptionVM()
            {
                Id = s.Id,
                Name = s.Name
            }).ToListAsync<OptionVM>();
                await _redisService.SetRedisCacheData<List<OptionVM>>(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}

