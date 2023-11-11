using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IAnnualIncomeService
    {
        Task<IEnumerable<AnnualIncomeGMasterVM?>> GetAll();
        Task<AnnualIncomeGMasterVM?> Get(long id);
        Task<long?> Insert(AnnualIncomeGMasterVM annualIncomeGMasterVM);
        Task<bool?> Update(AnnualIncomeGMasterVM annualIncomeGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
