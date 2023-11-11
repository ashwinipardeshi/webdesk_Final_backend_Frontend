using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ICasteCategoryService
    {
        Task<IEnumerable<CasteCategoryGMasterVM?>> GetAll();
        Task<CasteCategoryGMasterVM?> Get(long id);
        Task<long?> Insert(CasteCategoryGMasterVM casteCategoryGMasterVM);
        Task<bool?> Update(CasteCategoryGMasterVM casteCategoryGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
