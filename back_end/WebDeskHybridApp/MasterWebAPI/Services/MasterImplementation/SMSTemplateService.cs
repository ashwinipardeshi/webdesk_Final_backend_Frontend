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
    public class SMSTemplateService : ISMSTemplateService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllSMSTemplateMaster";
        private readonly string getOptionsCacheKey = "GetOptionsSMSTemplateMaster";
        public SMSTemplateService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<SMSTemplateMasterVM?>> GetAll(long collegeId)
        {
            string cacheKey = $"SmstemplateMasters_CollegeId_{collegeId}";
            var response = new List<SMSTemplateMasterVM>();
            response = await _redisService.GetRedisCacheData<List<SMSTemplateMasterVM>>(cacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.SmstemplateMasters.Where(s => s.CollegeId == collegeId && s.IsDeleted == false).Include(s => s.College).OrderByDescending(e => e.Id).Select(s => new SMSTemplateMasterVM()
            {
                Id = s.Id,
                CollegeId = s.CollegeId,
                CollegeName = s.College.Name,
                Name = s.Name,
                Template = s.Template,
                IsActive = s.IsActive,
                CreatedBy = s.CreatedBy,
                CreatedDate = s.CreatedDate,
                UpdatedBy = s.UpdatedBy,
                UpdatedDate = s.UpdatedDate
            }).ToListAsync<SMSTemplateMasterVM>();
                await _redisService.SetRedisCacheData<List<SMSTemplateMasterVM>>(getAllCacheKey, response);
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
        public async Task<SMSTemplateMasterVM?> Get(long id)
        {
            var response = new SMSTemplateMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<SMSTemplateMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<SMSTemplateMasterVM>();
            else
            {
                return await _context.SmstemplateMasters.Where(s => s.Id == id && s.IsDeleted == false).Include(s => s.College).Select(s => new SMSTemplateMasterVM()
                {
                    Id = s.Id,
                    CollegeId = s.CollegeId,
                    CollegeName = s.College.Name,
                    Name = s.Name,
                    Template = s.Template,
                    IsActive = s.IsActive,
                    CreatedBy = s.CreatedBy,
                    CreatedDate = s.CreatedDate,
                    UpdatedBy = s.UpdatedBy,
                    UpdatedDate = s.UpdatedDate
                }).FirstOrDefaultAsync<SMSTemplateMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="smsTemplateMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(SMSTemplateMasterVM smsTemplateMasterVM)
        {
            var recordExist = await _context.SmstemplateMasters.Where(re => re.Name == smsTemplateMasterVM.Name.Trim() && re.CollegeId == smsTemplateMasterVM.CollegeId && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<SmstemplateMaster> created = await _context.SmstemplateMasters.AddAsync(new SmstemplateMaster()
            {
                CollegeId = smsTemplateMasterVM.CollegeId,
                Name = smsTemplateMasterVM.Name.Trim(),
                Template = smsTemplateMasterVM.Template,
                IsActive = smsTemplateMasterVM.IsActive,
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
        /// <param name="smsTemplateMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(SMSTemplateMasterVM smsTemplateMasterVM)
        {
            var smstemplate = await _context.SmstemplateMasters.FirstOrDefaultAsync(s => s.Id == smsTemplateMasterVM.Id);
            if (smstemplate != null)
            {
                smstemplate.CollegeId = smsTemplateMasterVM.CollegeId;
                smstemplate.Name = smsTemplateMasterVM.Name;
                smstemplate.Template = smsTemplateMasterVM.Template;
                smstemplate.IsActive = smsTemplateMasterVM.IsActive;
                smstemplate.UpdatedBy = userId;
                smstemplate.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(smstemplate).State = EntityState.Modified;
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
                            TableId = smsTemplateMasterVM.Id,
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
            var smstemplate = await _context.SmstemplateMasters.FindAsync(id);
            if (smstemplate != null)
            {
                smstemplate.IsDeleted = true;
                smstemplate.UpdatedBy = userId;
                smstemplate.UpdatedDate = DateTime.UtcNow;
                _context.Entry(smstemplate).State = EntityState.Modified;
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
                response = await _context.SmstemplateMasters.Where(e => e.CollegeId == collegeId && e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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

