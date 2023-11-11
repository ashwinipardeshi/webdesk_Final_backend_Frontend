using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ISubCasteService
    {
        Task<IEnumerable<SubCasteGMasterVM?>> GetAll();
        Task<SubCasteGMasterVM?> Get(long id);
        Task<long?> Insert(SubCasteGMasterVM subCasteGMasterVM);
        Task<bool?> Update(SubCasteGMasterVM subCasteGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
