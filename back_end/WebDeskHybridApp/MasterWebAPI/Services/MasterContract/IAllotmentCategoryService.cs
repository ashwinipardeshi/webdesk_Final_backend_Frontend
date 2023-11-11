using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IAllotmentCategoryService
    {
        Task<IEnumerable<AllotmentCategoryMasterVM?>> GetAll(long collegeId);
        Task<AllotmentCategoryMasterVM?> Get(long id);
        Task<long?> Insert(AllotmentCategoryMasterVM allotmentCategoryMasterVM);
        Task<bool?> Update(AllotmentCategoryMasterVM allotmentCategoryMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
