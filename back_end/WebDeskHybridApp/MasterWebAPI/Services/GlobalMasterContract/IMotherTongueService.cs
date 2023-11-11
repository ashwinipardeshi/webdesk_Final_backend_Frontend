using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
     public interface IMotherTongueService
    {
        Task<IEnumerable<MotherTongueGMasterVM?>> GetAll();
        Task<MotherTongueGMasterVM?> Get(long id);
        Task<long?> Insert(MotherTongueGMasterVM motherTongueGMasterVM);
        Task<bool?> Update(MotherTongueGMasterVM motherTongueGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
