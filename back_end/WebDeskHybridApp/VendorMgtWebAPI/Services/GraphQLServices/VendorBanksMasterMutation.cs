using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.GraphQLServices
{
    [ExtendObjectType("Mutation")]
    public class VendorBanksMasterMutation
    {
        public async Task<long?> InsertVendorBanksMasterAsync([Service] IVendorBanksMasterService _service, VendorBanksMasterVM vendorBanksMasterVM)
        {
            if (vendorBanksMasterVM == null)
                return null;
            return await _service.Insert(vendorBanksMasterVM);
        }

        public async Task<bool?> UpdateVendorBanksMasterAsync([Service] IVendorBanksMasterService _service, VendorBanksMasterVM vendorBanksMasterVM)
        {
            if (vendorBanksMasterVM == null)
                return null;
            return await _service.Update(vendorBanksMasterVM);
        }

        public async Task<bool?> DeleteVendorBanksMasterAsync([Service] IVendorBanksMasterService _service, long id)
        {
            if (id < 0)
                return null;
            return await _service.Delete(id);
        }
    }
}
