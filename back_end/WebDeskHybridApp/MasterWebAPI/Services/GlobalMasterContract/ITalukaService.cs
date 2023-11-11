using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ITalukaService
    {
        Task<IEnumerable<TalukaGMasterVM?>> GetAll();
        Task<TalukaGMasterVM?> Get(long id);
        Task<long?> Insert(TalukaGMasterVM talukaGMasterVM);
        Task<bool?> Update(TalukaGMasterVM talukaGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
