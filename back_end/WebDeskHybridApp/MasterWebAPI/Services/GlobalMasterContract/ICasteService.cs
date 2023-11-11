using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ICasteService
    {
        Task<IEnumerable<CasteGMasterVM?>> GetAll();
        Task<CasteGMasterVM?> Get(long id);
        Task<long?> Insert(CasteGMasterVM CasteGMasterVM);
        Task<bool?> Update(CasteGMasterVM CasteGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
