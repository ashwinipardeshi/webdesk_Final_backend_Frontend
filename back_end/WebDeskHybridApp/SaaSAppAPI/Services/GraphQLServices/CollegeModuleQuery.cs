using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class CollegeModuleQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public async Task<IEnumerable<CollegeModuleVM?>> AllCollegeModuleAsync([Service] ICollegeModuleService _service)
        {
            return await _service.GetAll();
        }
        /*
         query{
                 allCollegeModule{
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
