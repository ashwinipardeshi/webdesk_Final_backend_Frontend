using SaaSAppAPI.ViewModels;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.RESTServices.Contract
{
    public interface IUserMasterService
    {
        Task<IEnumerable<UserMasterVM?>> GetAll();
        Task<UserMasterVM?> Get(long id);
        Task<long?> Insert(UserMasterVM userMasterVM);
        Task<bool?> Update(UserMasterVM userMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
