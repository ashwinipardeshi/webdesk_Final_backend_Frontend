using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IApplicationRejectReasonsService
    {
        Task<IEnumerable<ApplicationRejectReasonsMasterVM?>> GetAll(long collegeId);
        Task<ApplicationRejectReasonsMasterVM?> Get(long id);
        Task<long?> Insert(ApplicationRejectReasonsMasterVM applicationRejectReasonsMasterVM);
        Task<bool?> Update(ApplicationRejectReasonsMasterVM applicationRejectReasonsMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
