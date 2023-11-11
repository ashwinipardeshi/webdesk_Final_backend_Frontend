using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class VendorBillsQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public async Task<IEnumerable<VendorBillVM?>> AllVendorBillsAsync([Service] IVendorBillsServices _service)
        {
            return await _service.GetAll();
        }

        /*query 
       {
         allVendorBills()
        {
            id
            billType
       billNo
       }
    }*/
}
}


