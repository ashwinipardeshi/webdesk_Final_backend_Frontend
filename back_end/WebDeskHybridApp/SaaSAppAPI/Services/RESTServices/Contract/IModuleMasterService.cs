using SaaSAppAPI.Models;
using SaaSAppAPI.ViewModels;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.RESTServices.Contract
{
    public interface IModuleMasterService
    {
        Task<IEnumerable<ModuleMasterVM?>> GetAll();
        Task<ModuleMasterVM?> Get(long id);
        Task<long?> Insert(ModuleMasterVM moduleMasterVM);
        Task<bool?> Update(ModuleMasterVM moduleMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
