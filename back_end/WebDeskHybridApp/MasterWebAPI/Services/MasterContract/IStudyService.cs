using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IStudyService
    {
        Task<IEnumerable<StudyMasterVM?>> GetAll(long collegeId);
        Task<StudyMasterVM?> Get(long id);
        Task<long?> Insert(StudyMasterVM studyMasterVM);
        Task<bool?> Update(StudyMasterVM studyMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}

