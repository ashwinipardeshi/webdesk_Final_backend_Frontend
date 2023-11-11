using Authenticate.Data;
using Authenticate.Services.Contract;
using Authenticate.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Authenticate.Services.Implementation
{
    public class RoleMenuService : IRoleMenuService
    {
        private readonly AuthenticationDevFinalDbContext _context;
        public RoleMenuService(AuthenticationDevFinalDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GetRoleMenus
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        
        public async Task<DynamicMenuVM> GetRoleMenus(long roleId)
        {
            var roleMenus = await _context.MenuMasters.Where(m => m.RoleMenuMasters.Any(r => r.RoleId == roleId) && m.IsMenu && m.IsActive).Select(m => new MenuMasterVM()
            {
                Id = m.Id,
                Name = m.Name,
                Url = m.Url,
                Icon = m.Icon,
                IsMenu = m.IsMenu,
                Precedence = m.Precedence,
                ParentId = m.ParentId
            }).ToListAsync<MenuMasterVM>();

            DynamicMenuVM dynamicMenuVM = new DynamicMenuVM();
           
            if (roleMenus != null) {
                var mainMenus = roleMenus.Where(m => m.ParentId == null).ToList();
                IList<MainMenuVM> mainMenuVMList = new List<MainMenuVM>();
                foreach (var menu in mainMenus)
                {
                    var subMenus = roleMenus.Where(s => s.ParentId == menu.Id && s.IsMenu).ToList();
                    IList<SubMenuVM> subMenuVMList = new List<SubMenuVM>();
                    foreach (var subMenu in subMenus)
                    {
                        subMenuVMList.Add(new SubMenuVM()
                        {
                            Id = subMenu.Id,
                            Name = subMenu.Name,
                            Url = subMenu.Url,
                            Icon = subMenu.Icon,
                            IsMenu = subMenu.IsMenu,
                            Precedence = subMenu.Precedence
                        });
                    }
                   
                    mainMenuVMList.Add(new MainMenuVM() { 
                        Id = menu.Id,
                        Name = menu.Name,
                        Url = menu.Url,
                        Icon = menu.Icon,
                        IsMenu = menu.IsMenu,
                        Precedence = menu.Precedence,
                        SubMenuVMList = subMenuVMList
                    });

                }
                dynamicMenuVM.MainMenuVMList = mainMenuVMList;
            }
            return dynamicMenuVM;
        }

        /// <summary>
        /// GetRoleMenusURLs
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public async Task<List<RoleMenusURLVM>> GetRoleMenusURLs(long roleId)
        {
            return await _context.MenuMasters.Where(m => m.RoleMenuMasters.Any(r => r.RoleId == roleId) && m.IsActive && m.IsDeleted  == false && !m.Url.Equals(null)).Select(m => new RoleMenusURLVM()
            {
                URL = m.Url != null ? m.Url.Trim() : ""
            }).ToListAsync<RoleMenusURLVM>();
        }
    }
}
