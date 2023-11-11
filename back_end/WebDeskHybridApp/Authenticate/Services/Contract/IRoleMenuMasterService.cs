using Authenticate.ViewModels;

namespace Authenticate.Services.Contract
{
    public interface IRoleMenuMasterService
    {
        Task<DynamicMenuVM> GetAll(long roleId);
        Task<bool?> UpsertRoleMenus(RoleMenuMasterInsertVM roleMenuMasterInsertVM);
    }
}
