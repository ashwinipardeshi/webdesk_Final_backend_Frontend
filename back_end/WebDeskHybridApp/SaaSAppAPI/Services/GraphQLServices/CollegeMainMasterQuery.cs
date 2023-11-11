using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.ViewModels;

namespace SaaSAppAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class CollegeMainMasterQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public async Task<IEnumerable<CollegeMainMasterVM?>> AllCollegeMainMasterAsync([Service] ICollegeMainMasterService _service)
        {
            return await _service.GetAll();
        }
        

        /*
         query{
                 AllCollegeMainMaster{
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
