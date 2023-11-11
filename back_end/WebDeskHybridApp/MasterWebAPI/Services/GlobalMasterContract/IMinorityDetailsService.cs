using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IMinorityDetailsService
    {
        Task<IEnumerable<MinorityDetailsGMasterVM?>> GetAll();
        Task<MinorityDetailsGMasterVM?> Get(long id);
        Task<long?> Insert(MinorityDetailsGMasterVM minorityDetailsGMasterVM);
        Task<bool?> Update(MinorityDetailsGMasterVM minorityDetailsGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
