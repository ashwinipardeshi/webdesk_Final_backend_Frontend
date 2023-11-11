using SaaSAppAPI.ViewModels;
using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.RESTServices.Contract
{
    public interface IPricingService
    {
        Task<IEnumerable<PricingVM?>> GetAll();
        Task<PricingVM?> Get(long id);
        Task<long?> Insert(PricingVM pricingVM);
        Task<bool?> Update(PricingVM pricingVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
