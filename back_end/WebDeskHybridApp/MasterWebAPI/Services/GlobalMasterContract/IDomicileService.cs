using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IDomicileService
    {
         Task<IEnumerable<DomicileGMasterVM?>> GetAll();
         Task<DomicileGMasterVM?> Get(long id);
         Task<long?> Insert(DomicileGMasterVM domicileGmasterVM);
         Task<bool?> Update(DomicileGMasterVM domicileGmasterVM);
         Task<bool?> Delete(long id);
         Task<IEnumerable<OptionVM?>> GetOptions();

    }
}
