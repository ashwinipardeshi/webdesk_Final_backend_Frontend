using Authenticate.Data;
using Authenticate.Models;
using Authenticate.RedisService;
using Authenticate.Services.Contract;
using Authenticate.ViewModels;
using Authenticate.ViewModels.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Authenticate.Services.Implementation
{
    public class RoleService : IRoleService
    {
        private readonly AuthenticationDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly long collegeId;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllRoleMaster";
        private readonly string getOptionsCacheKey = "GetOptionsRoleMaster";
        public RoleService(AuthenticationDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("Id"))?.Value);
            collegeId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("CollegeId"))?.Value);
            _redisService = redisService;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<RoleMasterVM?>> GetAll()
        {
            var response = new List<RoleMasterVM>();
            response = await _redisService.GetRedisCacheData<List<RoleMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.RoleMasters.Where(r => r.IsDeleted == false).Select(r => new RoleMasterVM()
            {
                Id = r.Id,
                CollegeId = r.CollegeId,
                Name = r.Name,
                Description = r.Description,
                IsActive = r.IsActive,
                CreatedBy = r.CreatedBy,
                CreatedDate = r.CreatedDate,
                UpdatedBy = r.UpdatedBy,
                UpdatedDate = r.UpdatedDate
            }).ToListAsync<RoleMasterVM>();
                await _redisService.SetRedisCacheData<List<RoleMasterVM>>(getAllCacheKey, response);
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
        public async Task<RoleMasterVM?> Get(long id)
        {
            var response = new RoleMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<RoleMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<RoleMasterVM>();
            else
            {
                response = await _context.RoleMasters.Where(e => e.Id == id && e.IsDeleted == false)/*.Include(e => e.College)*/.Select(e => new RoleMasterVM()
                {
                    Id = e.Id,
                    CollegeId = e.CollegeId,                 
                    Name = e.Name,
                    Description = e.Description,
                    IsActive = e.IsActive,
                    CreatedBy = e.CreatedBy,
                    CreatedDate = e.CreatedDate,
                    UpdatedBy = e.UpdatedBy,
                    UpdatedDate = e.UpdatedDate
                }).FirstOrDefaultAsync<RoleMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="roleMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(RoleMasterVM roleMasterVM)
        {
            EntityEntry<RoleMaster> created = await _context.RoleMasters.AddAsync(new RoleMaster()
            {
                CollegeId = roleMasterVM.CollegeId,
                Name = roleMasterVM.Name,
                DepartmentId = roleMasterVM.DepartmentId,
                Description = roleMasterVM.Description,
                Precedence = roleMasterVM.Precedence,
                IsActive = roleMasterVM.IsActive,
                IsDeleted = false,
                CreatedBy = userId,
                CreatedDate = DateTime.UtcNow
            });
            if (_context.SaveChanges() > 0)
                return created.Entity.Id;                
            return null;
        }
        #endregion Insert

        #region Update
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="roleMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(RoleMasterVM roleMasterVM)
        {
            var roleMasters = await _context.RoleMasters.FirstOrDefaultAsync(e => e.Id == roleMasterVM.Id);
            if (roleMasters != null)
            {
                roleMasters.Id = roleMasterVM.Id;
                roleMasters.CollegeId = roleMasterVM.CollegeId;
                roleMasters.DepartmentId = roleMasterVM.DepartmentId;
                roleMasters.Name = roleMasterVM.Name;
                roleMasters.Description = roleMasterVM.Description;
                roleMasters.Precedence = roleMasterVM.Precedence;
                roleMasters.IsActive = roleMasterVM.IsActive;
                roleMasters.UpdatedBy = userId;
                roleMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(roleMasters).State = EntityState.Modified;
            try
            {
                if (_context.SaveChanges() > 0)
                    return true;
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
            var roleMasters = await _context.RoleMasters.FindAsync(id);
            if (roleMasters != null)
            {
                roleMasters.IsDeleted = true;
                roleMasters.UpdatedBy = userId;
                roleMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(roleMasters).State = EntityState.Modified;
                if (_context.SaveChanges() > 0)
                    return true;
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
                response = await _context.RoleMasters.Where(e => e.IsActive == true && e.IsDeleted == false).Select(e => new OptionVM()
            {
                Id = e.Id,
                Name = e.Name
            }).ToListAsync<OptionVM>();
            }
            return response;
        }        
        #endregion GetOptions
    }
}

