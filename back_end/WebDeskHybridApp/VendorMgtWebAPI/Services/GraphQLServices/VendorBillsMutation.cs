using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.GraphQLServices
{
    [ExtendObjectType("Mutation")]
    public class VendorBillsMutation
    {
        #region Insert
        public async Task<long?> SaveVendorBillsAsync([Service] IVendorBillsServices _service, VendorBillVM vendorBill)
        {
            return await _service.Insert(vendorBill);
        }
        #endregion Insert

        #region Update
        public async Task<bool?> UpdateVendorBillAsync([Service] IVendorBillsServices _service, VendorBillVM updateBill)
        {
            return await _service.Update(updateBill);
        }
        #endregion Update

        #region Delete
        public async Task<bool?> DeleteVendorBillAsync([Service] IVendorBillsServices _service, int id)
        {
            return await _service.Delete(id);
        }
        #endregion Delete
    }
}
