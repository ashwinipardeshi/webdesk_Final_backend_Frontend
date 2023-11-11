using SaaSAppAPI.ViewModels;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.RESTServices.Contract
{
    public interface ISubscriptionService
    {
        Task<IEnumerable<SubscriptionMasterVM?>> GetAll();
        Task<SubscriptionMasterVM?> Get(long id);
        Task<long?> Insert(SubscriptionMasterVM subscriptionMasterGraphVM);
        Task<bool?> Update(SubscriptionMasterVM subscriptionMasterGraphVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
