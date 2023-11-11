using MasterWebAPI.ViewModels.GlobalMasters;
using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IReligionService
    {
        Task<IEnumerable<ReligionGMasterVM?>> GetAll();
        Task<ReligionGMasterVM?> Get(long id);
        Task<long?> Insert(ReligionGMasterVM religionGMasterVM);
        Task<bool?> Update(ReligionGMasterVM religionGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
