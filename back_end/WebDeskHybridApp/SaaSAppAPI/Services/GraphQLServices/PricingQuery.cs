using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class PricingQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public async Task<IEnumerable<PricingVM?>> AllPricingAsync([Service] IPricingService _service)
        {
            return await _service.GetAll();
        }
        /*
         query{
                 allPricing{
                  id,
                  name,
                  description,                
                  isActive,                 
                  createdBy,
                  createdDate
                }
              }
         */
    }
}

