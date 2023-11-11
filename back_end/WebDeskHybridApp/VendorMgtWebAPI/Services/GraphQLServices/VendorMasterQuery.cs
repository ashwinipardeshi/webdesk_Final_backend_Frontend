using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class VendorMasterQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public async Task<IEnumerable<VendorMasterVM?>> AllVendorMasterAsync([Service] IVendorMasterService _service)
        {
            return await _service.GetAll();
        }

       /* query{
            allVendorMaster{
            Id,
              CollegeId,
                Name ,
                Address ,
                ContactNo ,
                Gstno,
                Pan,
                Tan,
                EmailId,
                Website,
            }
            }*/
    }
}
