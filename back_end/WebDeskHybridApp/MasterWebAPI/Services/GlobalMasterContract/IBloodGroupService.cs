using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IBloodGroupService
    {
        Task<IEnumerable<BloodGroupGMasterVM?>> GetAll();
        Task<BloodGroupGMasterVM?> Get(long id);
        Task<long?> Insert(BloodGroupGMasterVM bloodGroupGMasterVM);
        Task<bool?> Update(BloodGroupGMasterVM bloodGroupGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
