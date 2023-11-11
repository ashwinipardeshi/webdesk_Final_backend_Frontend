using Authenticate.Data;
using Authenticate.Models;
using Authenticate.Services.Contract;
using Authenticate.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Authenticate.Services.Implementation
{
    public class RoleMenuMasterService : IRoleMenuMasterService
    {
        private readonly AuthenticationDevFinalDbContext _context;

        public RoleMenuMasterService(AuthenticationDevFinalDbContext context)
        {
            _context = context;
        }

        #region GetRoleMenus
        public async Task<DynamicMenuVM> GetAll(long roleId)
        {
            var roleMenus = await _context.MenuMasters.Include(m => m.RoleMenuMasters).Where(m => m.RoleMenuMasters.Any(r => r.RoleId == roleId) && m.IsMenu && m.IsActive).Select(m => new MenuMasterVM()
            {
                Id = m.Id,
                Name = m.Name,
                Url = m.Url,
                Icon = m.Icon,
                IsMenu = m.IsMenu,
                Precedence = m.Precedence,
                ParentId = m.ParentId,
                IsActive = m.RoleMenuMasters.Where(rm => rm.MenuId == m.Id).Select(rm => rm.IsActive).FirstOrDefault()
            }).ToListAsync<MenuMasterVM>();

            DynamicMenuVM dynamicMenuVM = new DynamicMenuVM();

            if (roleMenus != null)
            {
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
                            Id = (long)subMenu.Id,
                            Name = subMenu.Name,
                            Url = subMenu.Url,
                            Icon = subMenu.Icon,
                            IsMenu = subMenu.IsMenu,
                            Precedence = subMenu.Precedence
                        });
                    }

                    mainMenuVMList.Add(new MainMenuVM()
                    {
                        Id = (long)menu.Id,
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

            var allMenus = await _context.MenuMasters.Where(m => !m.RoleMenuMasters.Any(r => r.RoleId == roleId) && m.IsMenu && m.IsActive).Select(m => new MenuMasterVM()
            {
                Id = m.Id,
                Name = m.Name,
                Url = m.Url,
                Icon = m.Icon,
                IsMenu = m.IsMenu,
                Precedence = m.Precedence,
                ParentId = m.ParentId,
                IsActive = false
            }).ToListAsync<MenuMasterVM>();

            if (allMenus != null)
            {
                var mainMenus = allMenus.Where(m => m.ParentId == null).ToList();
                IList<MainMenuVM> mainMenuVMList = new List<MainMenuVM>();
                foreach (var menu in mainMenus)
                {
                    var subMenus = allMenus.Where(s => s.ParentId == menu.Id && s.IsMenu).ToList();
                    IList<SubMenuVM> subMenuVMList = new List<SubMenuVM>();
                    foreach (var subMenu in subMenus)
                    {
                        subMenuVMList.Add(new SubMenuVM()
                        {
                            Id = (long)subMenu.Id,
                            Name = subMenu.Name,
                            Url = subMenu.Url,
                            Icon = subMenu.Icon,
                            IsMenu = subMenu.IsMenu,
                            Precedence = subMenu.Precedence
                        });
                    }

                    mainMenuVMList.Add(new MainMenuVM()
                    {
                        Id = (long)menu.Id,
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
        #endregion GetRoleMenus

        #region UpsertRoleMenus
        /// <summary>
        /// UpsertRoleMenus
        /// </summary>
        /// <param name="roleMenuMasterInsertVM"></param>
        /// <returns></returns>
        public async Task<bool?> UpsertRoleMenus(RoleMenuMasterInsertVM roleMenuMasterInsertVM)
        {
            var roleMenus = await _context.RoleMenuMasters.Where(o => o.RoleId == roleMenuMasterInsertVM.RoleId).ToListAsync();
            IList<RoleMenuMaster> roleMenuMasterList = new List<RoleMenuMaster>();
            foreach (var menuVM in roleMenuMasterInsertVM.menuList)
            {
                var existingRoleMenu = roleMenus.FirstOrDefault(o => o.MenuId == menuVM.MenuId);

                if (existingRoleMenu == null)
                {
                    roleMenuMasterList.Add(new RoleMenuMaster
                    {
                        RoleId = roleMenuMasterInsertVM.RoleId,
                        MenuId = menuVM.MenuId,
                        IsActive = menuVM.IsActive
                    });
                }
                else
                {
                    // Single Update
                    existingRoleMenu.IsActive = menuVM.IsActive;
                    _context.RoleMenuMasters.Update(existingRoleMenu);
                }
                await _context.SaveChangesAsync();
            }
            // Bulk Insert
            await _context.RoleMenuMasters.AddRangeAsync(roleMenuMasterList);
            await _context.SaveChangesAsync();
            return true;
        }
        #endregion UpsertRoleMenus
    }
}


