using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.RESTServices.Contract
{
    public interface IVendorBanksMasterService
    {
        Task<IEnumerable<VendorBanksMasterVM?>> GetAll();

        //Task<VendorBanksMasterVM?> Get(long id);

        Task<long?> Insert(VendorBanksMasterVM vendorBanksMasterVM);
        Task<bool?> Update(VendorBanksMasterVM vendorBanksMasterVM);
        Task<bool?> Delete(long id);
    }
}
