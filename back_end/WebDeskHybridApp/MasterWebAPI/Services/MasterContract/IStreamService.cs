using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IStreamService
    {
        Task<IEnumerable<StreamMasterVM?>> GetAll(long collegeId);
        Task<StreamMasterVM?> Get(long id);
        Task<long?> Insert(StreamMasterVM streamMasterVM);
        Task<bool?> Update(StreamMasterVM streamMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
