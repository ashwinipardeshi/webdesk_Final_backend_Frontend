using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface ICommonServices
    {
        Task<IEnumerable<OptionNewVM?>> GetOptionsCommonGMaster();
        Task<IEnumerable<OptionNewVM?>> GetOptionsCommonGDetails(long CommonMasterId);
        Task<IEnumerable<OptionNewVM?>> GetOptionsCommonMaster();
        Task<IEnumerable<OptionNewVM?>> GetOptionsCommonDetails(long CollegeId, long CommonMasterId);
        Task<IEnumerable<ErrorLogVM?>> GetAllErrorLogs();
        Task<List<RoleMenusURLVM>> GetRoleMenusURLs(long roleId);
    }
}