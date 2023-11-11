using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IProgramService
    {
        Task<IEnumerable<ProgramMasterVM?>> GetAll(long collegeId, long streamId);
        Task<ProgramMasterVM?> Get(long id);
        Task<long?> Insert(ProgramMasterVM programTypeVM);
        Task<bool?> Update(ProgramMasterVM programMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long streamId);
    }
}

