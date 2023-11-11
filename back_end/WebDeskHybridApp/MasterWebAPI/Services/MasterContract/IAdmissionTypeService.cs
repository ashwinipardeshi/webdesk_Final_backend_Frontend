using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IAdmissionTypeService
    {
        Task<IEnumerable<AdmissionTypeMasterVM?>> GetAll(long collegeId);
        Task<AdmissionTypeMasterVM?> Get(long id);
        Task<long?> Insert(AdmissionTypeMasterVM admissionTypeMasterVM);
        Task<bool?> Update(AdmissionTypeMasterVM admissionTypeMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
