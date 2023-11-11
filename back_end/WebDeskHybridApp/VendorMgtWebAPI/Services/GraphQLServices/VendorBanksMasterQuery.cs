using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class VendorBanksMasterQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public async Task<IEnumerable<VendorBanksMasterVM?>> AllVendorBanksMasterAsync([Service] IVendorBanksMasterService _service)
        {
            return await _service.GetAll();
        }
    }
}