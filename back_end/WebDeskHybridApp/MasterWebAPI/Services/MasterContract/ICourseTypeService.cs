using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface ICourseTypeService
    {
        Task<IEnumerable<CourseTypeMasterVM?>> GetAll(long collegeId);
        Task<CourseTypeMasterVM?> Get(long id);
        Task<long?> Insert(CourseTypeMasterVM CourseTypeMasterVM);
        Task<bool?> Update(CourseTypeMasterVM CourseTypeMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
