using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IDepartmentService
    {
         Task<IEnumerable<DepartmentMasterVM?>> GetAll(long collegeId);
         Task<DepartmentMasterVM?> Get(long id);
         Task<long?> Insert(DepartmentMasterVM departmentMasterVM);
         Task<bool?> Update(DepartmentMasterVM departmentMasterVM);
         Task<bool?> Delete(long id);
         Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
