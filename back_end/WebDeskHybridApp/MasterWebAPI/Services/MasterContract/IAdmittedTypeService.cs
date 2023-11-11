using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IAdmittedTypeService
    {
        Task<IEnumerable<AdmittedTypeMasterVM?>> GetAll(long CollegeId);
        Task<AdmittedTypeMasterVM?> Get(long id);
        Task<long?> Insert(AdmittedTypeMasterVM admittedTypeMasterVM);
        Task<bool?> Update(AdmittedTypeMasterVM admittedTypeMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long CollegeId);
    }
}
