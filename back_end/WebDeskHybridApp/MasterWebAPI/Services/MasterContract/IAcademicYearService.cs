using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IAcademicYearService
    {
        Task<IEnumerable<AcademicYearMasterVM?>> GetAll(long collegeId, long streamId);
        Task<AcademicYearMasterVM?> Get(long id);
        Task<long?> Insert(AcademicYearMasterVM academicMasterVM);
        Task<bool?> Update(AcademicYearMasterVM academicMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long streamId);
    }
}
