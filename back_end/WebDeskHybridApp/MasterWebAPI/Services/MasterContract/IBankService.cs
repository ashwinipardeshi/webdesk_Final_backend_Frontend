using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IBankService
    {
        Task<IEnumerable<BankMasterVM?>> GetAll(long collegeId);
        Task<BankMasterVM?> Get(long id);
        Task<long?> Insert(BankMasterVM BankMasterVM);
        Task<bool?> Update(BankMasterVM BankMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
