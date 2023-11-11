using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IProgramTypeService
    {
        Task<IEnumerable<ProgramTypeMasterVM?>> GetAll(long collegeId);
        Task<ProgramTypeMasterVM?> Get(long id);
        Task<long?> Insert(ProgramTypeMasterVM programTypeMasterVM);
        Task<bool?> Update(ProgramTypeMasterVM programTypeMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}

