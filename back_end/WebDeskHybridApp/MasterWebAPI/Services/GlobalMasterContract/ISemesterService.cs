using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ISemesterService
    {
         Task<IEnumerable<SemesterGMasterVM?>> GetAll();
         Task<SemesterGMasterVM?> Get(long id);
         Task<long?> Insert(SemesterGMasterVM semesterMasterVM);
         Task<bool?> Update(SemesterGMasterVM semesterMasterVM);
         Task<bool?> Delete(long id);
         Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
