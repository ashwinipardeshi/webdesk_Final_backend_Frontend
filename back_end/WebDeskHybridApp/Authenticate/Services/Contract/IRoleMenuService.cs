using Authenticate.ViewModels;

namespace Authenticate.Services.Contract
{
    public interface IRoleMenuService
    {
        Task<DynamicMenuVM> GetRoleMenus(long roleId);
        Task<List<RoleMenusURLVM>> GetRoleMenusURLs(long roleId);
    }
}
