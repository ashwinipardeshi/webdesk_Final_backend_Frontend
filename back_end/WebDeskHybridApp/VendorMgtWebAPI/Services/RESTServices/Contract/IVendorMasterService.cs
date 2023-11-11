using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.RESTServices.Contract
{
    public interface IVendorMasterService
    {
        Task<IEnumerable<VendorMasterVM?>> GetAll();
        Task<VendorMasterVM?> Get(long id);
        Task<long?> Insert(VendorMasterVM vendorMasterVM);

        Task<bool?> Update(VendorMasterVM vendorMasterVM);

        Task<bool?> Delete(long id);
    }
}
