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
    public class CollegeService : ICollegeService
    {
        private readonly MasterDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly string? ipAddress;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllCollegeMaster";
        private readonly string getOptionsCacheKey = "GetOptionsCollegeMaster";
        public CollegeService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
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
        public async Task<IEnumerable<CollegeMasterVM?>> GetAll()
        {
            var response = new List<CollegeMasterVM>();
            response = await _redisService.GetRedisCacheData<List<CollegeMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.CollegeMasters.Where(e => e.IsDeleted == false).OrderByDescending(e => e.Id).Select(e => new CollegeMasterVM()
            {
                Id = e.Id,                
                Name = e.Name,
                ShortName = e.ShortName,
                Description = e.Description,
                University = e.University,
                Category = e.Category,
                Address = e.Address,
                Website = e.Website,
                Email = e.Email,
                PhoneNo = e.PhoneNo,
                Cpname = e.Cpname,
                Cpemail = e.Email,
                Cpmob = e.PhoneNo,
                Type = e.Type,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).ToListAsync<CollegeMasterVM>();
                await _redisService.SetRedisCacheData<List<CollegeMasterVM>>(getAllCacheKey, response);
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
        public async Task<CollegeMasterVM?> Get(long id)
        {
            var response = new CollegeMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<CollegeMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<CollegeMasterVM>();
            else
            {
                var CollegeMasters = await _context.CollegeMasters.Where(e => e.Id == id && e.IsDeleted == false).Select(e => new CollegeMasterVM()
            {
                Id = e.Id,                           
                Name = e.Name,
                ShortName = e.ShortName,
                Description = e.Description,
                University = e.University,
                Category = e.Category,
                Address = e.Address,
                Website = e.Website,
                Email = e.Email,
                PhoneNo = e.PhoneNo,
                Cpname = e.Cpname,
                Cpemail = e.Email,
                Cpmob = e.PhoneNo,
                Type = e.Type,
                IsActive = e.IsActive,
                CreatedBy = e.CreatedBy,
                CreatedDate = e.CreatedDate,
                UpdatedBy = e.UpdatedBy,
                UpdatedDate = e.UpdatedDate
            }).FirstOrDefaultAsync<CollegeMasterVM>();
            }
            return response;
        }
        #endregion GetSpecific

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="collegeMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(CollegeMasterVM collegeMasterVM)
        {
            var recordExist = await _context.CollegeMasters.Where(re => re.Name == collegeMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return 0;
            EntityEntry<CollegeMaster> created = await _context.CollegeMasters.AddAsync(new CollegeMaster()
            {              
                Name = collegeMasterVM.Name.Trim(),
                ShortName = collegeMasterVM.ShortName,
                Description = collegeMasterVM.Description,
                University = collegeMasterVM.University,
                Category = collegeMasterVM.Category,
                Address = collegeMasterVM.Address,
                Website = collegeMasterVM.Website,
                Email = collegeMasterVM.Email,
                PhoneNo = collegeMasterVM.PhoneNo,
                Cpname = collegeMasterVM.Cpname,
                Cpemail = collegeMasterVM.Cpemail,
                Cpmob = collegeMasterVM.PhoneNo,
                Type = collegeMasterVM.Type,
                IsActive = collegeMasterVM.IsActive,
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
        /// <param name="collegeMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(CollegeMasterVM collegeMasterVM)
        {        
            var collegeMasters = await _context.CollegeMasters.FirstOrDefaultAsync(e => e.Id == collegeMasterVM.Id);
            if (collegeMasters != null)
            {             
                collegeMasters.Name = collegeMasterVM.Name;
                collegeMasters.ShortName = collegeMasterVM.ShortName;
                collegeMasters.Description = collegeMasterVM.Description;
                collegeMasters.University = collegeMasterVM.University;
                collegeMasters.Category = collegeMasterVM.Category;
                collegeMasters.Address = collegeMasterVM.Address;
                collegeMasters.Website = collegeMasterVM.Website;
                collegeMasters.Email = collegeMasterVM.Email;
                collegeMasters.PhoneNo = collegeMasterVM.PhoneNo;
                collegeMasters.Cpname = collegeMasterVM.Cpname;
                collegeMasters.Cpemail = collegeMasterVM.Cpemail;
                collegeMasters.Cpmob = collegeMasterVM.PhoneNo;
                collegeMasters.Type = collegeMasterVM.Type;
                collegeMasters.IsActive = collegeMasterVM.IsActive;
                collegeMasters.UpdatedBy = userId;
                collegeMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(collegeMasters).State = EntityState.Modified;
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
                            TableId = collegeMasterVM.Id,
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
            var collegeMasters = await _context.CollegeMasters.FindAsync(id);
            if (collegeMasters != null)
            {
                collegeMasters.IsDeleted = true;
                collegeMasters.UpdatedBy = userId;
                collegeMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(collegeMasters).State = EntityState.Modified;
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
                response = await _context.CollegeMasters.Where(e => e.IsActive  && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
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