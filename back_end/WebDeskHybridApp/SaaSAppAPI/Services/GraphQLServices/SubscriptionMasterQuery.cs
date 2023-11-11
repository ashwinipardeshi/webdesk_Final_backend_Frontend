using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class SubscriptionMasterQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public async Task<IEnumerable<SubscriptionMasterVM?>> AllSubscriptionMasterAsync([Service] ISubscriptionService _service)
        {
            return await _service.GetAll();
        }

        //public IModuleService? Service { get; set; }

        //public async Task<IEnumerable<ModuleMasterVM?>> AllModuleMasterAsync()
        //{
        //    return await Service.GetAll();
        //}

        /*
         query{
                 allSubscriptionMaster{
                  id,
                  name,
                  days,
                  description,                
                  isActive,                 
                  createdBy,
                  createdDate
                }
              }
         */
    }
}
