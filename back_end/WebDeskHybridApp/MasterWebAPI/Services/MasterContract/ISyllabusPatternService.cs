using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface ISyllabusPatternService
    {
        Task<IEnumerable<SyllabusPatternMasterVM?>> GetAll(long collegeId,long academicYearMasterId, long programMasterId);
        Task<SyllabusPatternMasterVM?> Get(long id);
        Task<long?> Insert(SyllabusPatternMasterVM syllabusPatternMasterVM);
        Task<bool?> Update(SyllabusPatternMasterVM syllabusPatternMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long academicYearMasterId, long programMasterId);
    }
}
