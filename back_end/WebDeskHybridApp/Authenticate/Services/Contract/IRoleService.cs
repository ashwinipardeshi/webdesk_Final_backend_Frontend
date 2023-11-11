using Authenticate.ViewModels;
using Authenticate.ViewModels.Common;

namespace Authenticate.Services.Contract
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleMasterVM?>> GetAll();
        Task<RoleMasterVM?> Get(long id);
        Task<long?> Insert(RoleMasterVM roleMasterVM);
        Task<bool?> Update(RoleMasterVM roleMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
