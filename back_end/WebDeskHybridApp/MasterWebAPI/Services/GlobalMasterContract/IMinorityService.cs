using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IMinorityService
    {
        Task<IEnumerable<MinorityGMasterVM?>> GetAll();
        Task<MinorityGMasterVM?> Get(long id);
        Task<long?> Insert(MinorityGMasterVM minorityGMasterVM);
        Task<bool?> Update(MinorityGMasterVM minorityGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}

