using Authenticate.Data;
using Authenticate.Models;
using Authenticate.RedisService;
using Authenticate.Services.Contract;
using Authenticate.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Authenticate.Services.Implementation
{
    public class MenuService : IMenuService
    {
        private readonly AuthenticationDevFinalDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly long userId;
        private readonly IRedisService _redisService;
        private readonly string getAllCacheKey = "GetAllMenuMaster";
        private readonly string getOptionsCacheKey = "GetOptionsMenuMaster";
        public MenuService(AuthenticationDevFinalDbContext context, IHttpContextAccessor httpContextAccessor, IRedisService redisService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            userId = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("Id"))?.Value);
            _redisService = redisService;
        }

        #region GetAll
        /// <summary>
        /// GetAll
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<MenuMasterVM?>> GetAll()
        {
            var response = new List<MenuMasterVM>();
            response = await _redisService.GetRedisCacheData<List<MenuMasterVM>>(getAllCacheKey);
            if (response != null)
                return response;
            else
            {
                response = await _context.MenuMasters.Where(m => m.IsDeleted == false).Select(m => new MenuMasterVM()
            {
                Id= m.Id,
                ParentId = m.ParentId,
                Name = m.Name,
                ModuleMasterId = m.ModuleMasterId,               
                Url =  m.Url,
                Icon = m.Icon,
                IsMenu = m.IsMenu,
                Precedence = m.Precedence,
                IsActive = m.IsActive,
                CreatedBy = m.CreatedBy,
                CreatedDate = m.CreatedDate,
                UpdatedBy = m.UpdatedBy,
                UpdatedDate = m.UpdatedDate
            }).ToListAsync<MenuMasterVM>();
                await _redisService.SetRedisCacheData<List<MenuMasterVM>>(getAllCacheKey, response);
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
        public async Task<MenuMasterVM?> Get(long id)
        {
            var response = new MenuMasterVM();
            var responseList = await _redisService.GetRedisCacheData<List<MenuMasterVM>>(getAllCacheKey);
            if (responseList != null)
                response = responseList.Where(e => e.Id == id).FirstOrDefault<MenuMasterVM>();
            else
            {
                response = await _context.MenuMasters.Where(m => m.Id == id && m.IsDeleted == false)/*.Include(e => e.College)*/.Select(m => new MenuMasterVM()
                {
                    Id = m.Id,
                    ParentId = m.ParentId,
                    Name = m.Name,
                    ModuleMasterId = m.ModuleMasterId,
                    Url = m.Url,
                    Icon = m.Icon,
                    IsMenu = m.IsMenu,
                    Precedence = m.Precedence,
                    IsActive = m.IsActive,
                    CreatedBy = m.CreatedBy,
                    CreatedDate = m.CreatedDate,
                    UpdatedBy = m.UpdatedBy,
                    UpdatedDate = m.UpdatedDate
                }).FirstOrDefaultAsync<MenuMasterVM>();
            }
            return response;
        }
        #endregion Get

        #region Insert
        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="menuMasterVM"></param>
        /// <returns></returns>
        public async Task<long?> Insert(MenuMasterVM menuMasterVM)
        {
            EntityEntry<MenuMaster> created = await _context.MenuMasters.AddAsync(new MenuMaster()
            {
                ParentId = menuMasterVM.ParentId == 0 ? null : menuMasterVM.ParentId,
                ModuleMasterId = menuMasterVM.ModuleMasterId,
                Name = menuMasterVM.Name,             
                Url = menuMasterVM.Url,
                Icon = menuMasterVM.Icon,
                IsMenu = menuMasterVM.IsMenu,
                Precedence = menuMasterVM.Precedence,
                IsActive = menuMasterVM.IsActive,
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
        /// <param name="menuMasterVM"></param>
        /// <returns></returns>
        public async Task<bool?> Update(MenuMasterVM menuMasterVM)
        {
            var menuMasters = await _context.MenuMasters.FirstOrDefaultAsync(e => e.Id == menuMasterVM.Id);
            if (menuMasters != null)
            {
                menuMasters.ParentId = menuMasterVM.ParentId == 0 ? null : menuMasterVM.ParentId;
                menuMasters.ModuleMasterId = menuMasterVM.ModuleMasterId;
                menuMasters.Name = menuMasterVM.Name;
                menuMasters.Url = menuMasterVM.Url;
                menuMasters.Icon = menuMasterVM.Icon;
                menuMasters.IsMenu = menuMasterVM.IsMenu;
                menuMasters.Precedence = menuMasterVM.Precedence;
                menuMasters.IsActive = menuMasterVM.IsActive;
                menuMasters.IsDeleted = false;
                menuMasters.UpdatedBy = userId;
                menuMasters.UpdatedDate = DateTime.UtcNow;
            }
            _context.Entry(menuMasters).State = EntityState.Modified;
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
            var menuMasters = await _context.MenuMasters.FindAsync(id);
            if (menuMasters != null)
            {
                menuMasters.IsDeleted = true;
                menuMasters.UpdatedBy = userId;
                menuMasters.UpdatedDate = DateTime.UtcNow;
                _context.Entry(menuMasters).State = EntityState.Modified;
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
        /// <returns></return
        public async Task<IEnumerable<MenuOptionVM?>> GetOptions()
        {
            var res = await _context.MenuMasters.Where(m => m.IsDeleted == false && ( m.ParentId == null || m.IsMenu == true )).Select(m => new MenuOptionVM() { 
               Id = m.Id,
               Name = m.Name
            }).ToListAsync();
            res.Add(new MenuOptionVM { Id = null, Name = "Main Menu" });
            return res;
        }
        #endregion GetOptions 
    }
}
