using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using SaaSAppAPI.Data;
using SaaSAppAPI.Models;
using SaaSAppAPI.RedisService;
using SaaSAppAPI.Utility;
using SaaSAppAPI.ViewModels;
using SaaSAppAPI.ViewModels.Common;
using SaaSAppAPI.Filters.PasswordHasherFilters;
using SaaSAppAPI.Services.RESTServices.Contract;

namespace SaaSAppAPI.Services.RESTServices.Implementation
{
    public class UserMasterService : IUserMasterService
    {
        private readonly SaaSdevDbFinalContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId = 0;
        private readonly long collegeId = 1;
        private readonly string? ipAddress = string.Empty;
        private readonly long academicYearId = 6;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllUserMaster";
        private readonly string getOptionsCacheKey = "GetOptionsUserMaster";
        public UserMasterService(SaaSdevDbFinalContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            //userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("Id"))?.Value);
            //collegeId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value);
            //ipAddress = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("IPAddress"))?.Value.ToString();
            _redisService = redisService;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<UserMasterVM?>> GetAll()
        {
            var response = new List<UserMasterVM>();
            response = await _redisService.GetRedisCacheData<List<UserMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.UserMasters.Where(u => u.IsDeleted == false).OrderByDescending(e => e.Id).Select(u => new UserMasterVM()
                {
                    Id = u.Id,
                    RoleId = u.RoleId,
                    Name = u.Name,
                    EmailId = u.EmailId,
                    Password = u.Password,
                    Designation = u.Designation,
                    IsActive = u.IsActive,
                    CreatedBy = u.CreatedBy,
                    CreatedDate = u.CreatedDate,
                    UpdatedBy = u.UpdatedBy,
                    UpdatedDate = u.UpdatedDate
                }).ToListAsync();
                await _redisService.SetRedisCacheData(getAllCacheKey, response);
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
        public async Task<UserMasterVM?> Get(long id)
        {
            var response = new UserMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<UserMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault();
            else
            {
                response = await _context.UserMasters.Where(u => u.Id == id && u.IsDeleted == false).Select(u => new UserMasterVM()
                {
                    Id = u.Id,
                    RoleId = u.RoleId,
                    Name = u.Name,
                    EmailId = u.EmailId,
                    Password = u.Password,
                    Designation = u.Designation,
                    IsActive = u.IsActive,
                    CreatedBy = u.CreatedBy,
                    CreatedDate = u.CreatedDate,
                    UpdatedBy = u.UpdatedBy,
                    UpdatedDate = u.UpdatedDate
                }).FirstOrDefaultAsync();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="UserMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(UserMasterVM userMasterVM)
        {
            var recordExist = await _context.UserMasters.Where(re => re.Name == userMasterVM.Name.Trim() && re.IsActive && re.IsDeleted == false).FirstOrDefaultAsync();
            if (recordExist != null)
                return null;
            //Password Hasher 
            PasswordHasher<UserMasterVM> passwordHasher = new PasswordHasher<UserMasterVM>();
            EntityEntry<UserMaster> created = await _context.UserMasters.AddAsync(new UserMaster()
            {
                RoleId = userMasterVM.RoleId,
                Name = userMasterVM.Name.Trim(),
                EmailId = userMasterVM.EmailId,
                Password = passwordHasher.HashPassword(userMasterVM, userMasterVM.Password),
                Designation = userMasterVM.Designation,
                IsActive = userMasterVM.IsActive,
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
        /// <param name="userMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(UserMasterVM userMasterVM)
        {
            var userMasters = await _context.UserMasters.FirstOrDefaultAsync(e => e.Id == userMasterVM.Id);
            if (userMasters != null)
            {
                userMasters.RoleId = userMasterVM.RoleId;
                userMasters.Name = userMasterVM.Name;
                userMasters.EmailId = userMasterVM.EmailId;
                userMasters.Password = userMasterVM.Password;
                userMasters.Designation = userMasterVM.Designation;
                userMasters.IsActive = userMasterVM.IsActive;
                userMasters.UpdatedBy = userId;
                userMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(userMasters).State = EntityState.Modified;
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
                            TableId = userMasters.Id,
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
            var userMasters = await _context.UserMasters.FindAsync(id);
            if (userMasters != null)
            {
                userMasters.IsDeleted = true;
                userMasters.UpdatedBy = userId;
                userMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(userMasters).State = EntityState.Modified;
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
                response = await _context.UserMasters.Where(e => e.IsActive && e.IsDeleted == false).OrderBy(e => e.Name).Select(e => new OptionVM()
                {
                    Id = e.Id,
                    Name = e.Name
                }).ToListAsync();
                await _redisService.SetRedisCacheData(getOptionsCacheKey, response);
            }
            return response;
        }
        #endregion GetOptions
    }
}
