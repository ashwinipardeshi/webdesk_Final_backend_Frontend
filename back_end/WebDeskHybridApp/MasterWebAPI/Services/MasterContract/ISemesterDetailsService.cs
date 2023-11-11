using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface ISemesterDetailsService
    {
         Task<IEnumerable<SemesterDetailsMasterVM?>> GetAll(long programMasterId,long programYearId,long academicYearId);
         Task<SemesterDetailsMasterVM?> Get(long id);
         Task<long?> Insert(SemesterDetailsMasterVM semesterDetailsMasterVM);
         Task<bool?> Update(SemesterDetailsMasterVM semesterDetailsMasterVM);
         Task<bool?> Delete(long id);
    }
}
