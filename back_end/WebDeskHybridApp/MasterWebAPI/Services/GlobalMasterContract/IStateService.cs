using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IStateService
    {
         Task<IEnumerable<StateGMasterVM?>> GetAll();
         Task<StateGMasterVM?> Get(long id);
         Task<long?> Insert(StateGMasterVM statGMasterVM);
         Task<bool?> Update(StateGMasterVM stateGMasterVM);
         Task<bool?> Delete(long id);
         Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
