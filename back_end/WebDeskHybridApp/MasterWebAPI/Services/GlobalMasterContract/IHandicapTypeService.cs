using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IHandicapTypeService
    {
        Task<IEnumerable<HandicapTypeGMasterVM?>> GetAll();
        Task<HandicapTypeGMasterVM?> Get(long id);
        Task<long?> Insert(HandicapTypeGMasterVM handicapTypeGMasterVM);
        Task<bool?> Update(HandicapTypeGMasterVM handicapTypeGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
