using System.Collections;
using VendorMgtMVCApp.ViewModels;
using VendorMgtMVCApp.ViewModels.Common;

namespace VendorMgtMVCApp.Services.Contract
{
    public interface IVendorBillService
    {
        Task<List<VendorBillVM?>> GetAll();
        Task<List<VendorBillVM?>> Get(long id);
        Task<List<GetOption?>> GetOptions();
        Task<List<GetAccountOptions?>> GetAccountOptions();
        Task<long?> Insert(VendorBillVM vendorBillVM);
        Task<bool?> Update(VendorBillVM vendorBillVM);
        Task<bool?> Delete(long id);
        Task<long?> Insert(VendorMasterVM vendorMasterVM);
        Task<long?> Insert(VendorBanksMasterVM vendorBankMasterVM);
    }
}