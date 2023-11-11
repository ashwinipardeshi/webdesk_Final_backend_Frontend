using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class ModuleMasterQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
       
        public async Task<IEnumerable<ModuleMasterGraphVM?>> AllModuleMasterAsync([Service] IModuleService _service)
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
                 allModuleMaster{
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
