using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IDistrictService
    {
        Task<IEnumerable<DistrictGMasterVM?>> GetAll();
        Task<DistrictGMasterVM?> Get(long id);
        Task<long?> Insert(DistrictGMasterVM districtGMasterVM);
        Task<bool?> Update(DistrictGMasterVM districtGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
