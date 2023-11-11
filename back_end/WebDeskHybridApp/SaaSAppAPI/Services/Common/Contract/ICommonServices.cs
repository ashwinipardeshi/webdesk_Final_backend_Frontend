using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.Common.Contract
{
    public interface ICommonServices
    {
        Task<List<RoleMenusURLVM>> GetRoleMenusURLs(long roleId);
    }
}
