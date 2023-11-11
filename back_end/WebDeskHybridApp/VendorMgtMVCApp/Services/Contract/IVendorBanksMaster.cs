using VendorMgtMVCApp.ViewModels;
using VendorMgtMVCApp.ViewModels.Common;

namespace VendorMgtMVCApp.Services.Contract
{
    public interface IVendorBanksMaster
    {
        Task<List<VendorBanksMasterVM?>> GetAll();
        Task<List<VendorBanksMasterVM?>> Get(long id);
        Task<List<GetOption?>> GetOptions();
        Task<long?> Insert(VendorBanksMasterVM vendorBanksMasterVM);
        Task<bool?> Update(VendorBanksMasterVM vendorBanksMasterVM);
        Task<bool?> Delete(long id);
    }
}
