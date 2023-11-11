using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IAcademicStatusService
    {
        Task<IEnumerable<AcademicStatusMasterVM?>> GetAll(long collegeId);
        Task<AcademicStatusMasterVM?> Get(long id);
        Task<long?> Insert(AcademicStatusMasterVM academicStatusMasterVM);
        Task<bool?> Update(AcademicStatusMasterVM academicStatusMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}

