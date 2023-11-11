using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.Services.Common.Contract
{
    public interface ICommonServices
    {
        Task<List<RoleMenusURLVM>> GetRoleMenusURLs(long roleId);
    }
}
