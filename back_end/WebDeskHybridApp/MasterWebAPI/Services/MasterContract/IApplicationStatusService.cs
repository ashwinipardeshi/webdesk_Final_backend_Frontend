using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IApplicationStatusService
    {
        Task<IEnumerable<ApplicationStatusMasterVM?>> GetAll(long collegeId);
        Task<ApplicationStatusMasterVM?> Get(long id);
        Task<long?> Insert(ApplicationStatusMasterVM applicationStatusMasterVM);
        Task<bool?> Update(ApplicationStatusMasterVM ApplicationStatusMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
