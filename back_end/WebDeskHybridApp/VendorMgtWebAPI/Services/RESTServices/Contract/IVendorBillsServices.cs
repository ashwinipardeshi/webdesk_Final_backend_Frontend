using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.RESTServices.Contract
{
    public interface IVendorBillsServices
    {
        Task<IEnumerable<VendorBillVM?>> GetAll();
        Task<long?> Insert(VendorBillVM vendorBillVM);
        Task<bool?> Update(VendorBillVM vendorBillVM);
        Task<bool?> Delete(long id);
    }
}
