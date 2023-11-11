using VendorMgtMVCApp.ViewModels;
using VendorMgtMVCApp.ViewModels.Common;

namespace VendorMgtMVCApp.Services.Contract
{
    public interface IVendorMasterService
    {
        Task<List<VendorMasterVM?>> GetAll();
        Task<List<VendorMasterVM?>> Get(long id);
        Task<List<GetOption?>> GetOptions();
        Task<long?> Insert(VendorMasterVM vendorMasterVM);
       Task<bool?> Update(VendorMasterVM vendorMasterVM);
       Task<bool?> Delete(long id);
       // Task<long?>(VendorMasterVM vendorMasterVM);
    }
}
