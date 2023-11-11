using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ICourseCategoryService
    {
         Task<IEnumerable<CourseCategoryGMasterVM?>> GetAll();
         Task<CourseCategoryGMasterVM?> Get(long id);
         Task<long?> Insert(CourseCategoryGMasterVM courseCategoryMasterVM);
         Task<bool?> Update(CourseCategoryGMasterVM courseCategoryMasterVM);
         Task<bool?> Delete(long id);
         Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
