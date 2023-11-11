using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IAccreditationService
    {
        Task<IEnumerable<AccreditationMasterVM?>> GetAll(long collegeId, long streamId);
        Task<AccreditationMasterVM?> Get(long id);
        Task<long?> Insert(AccreditationMasterVM accreditationMasterVM);
        Task<bool?> Update(AccreditationMasterVM accreditationMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long streamId);
    }
}
