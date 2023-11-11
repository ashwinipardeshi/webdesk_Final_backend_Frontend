using SaaSAppAPI.ViewModels;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.RESTServices.Contract
{
    public interface IModuleService
    {
        Task<IEnumerable<ModuleMasterGraphVM?>> GetAll();
        Task<ModuleMasterGraphVM?> Get(long id);
        Task<long?> Insert(ModuleMasterGraphVM moduleMasterGraphVM);
        Task<bool?> Update(ModuleMasterGraphVM moduleMasterGraphVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();

    }
}
