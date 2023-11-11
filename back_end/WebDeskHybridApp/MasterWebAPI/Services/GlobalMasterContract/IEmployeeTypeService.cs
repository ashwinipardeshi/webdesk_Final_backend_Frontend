using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IEmployeeTypeService
    {
         Task<IEnumerable<EmployeeTypeGMasterVM?>> GetAll();
         Task<EmployeeTypeGMasterVM?> Get(long id);
         Task<long?> Insert(EmployeeTypeGMasterVM employeeTypeGmasterVM);
         Task<bool?> Update(EmployeeTypeGMasterVM employeeTypeGmasterVM);
         Task<bool?> Delete(long id);
         Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
