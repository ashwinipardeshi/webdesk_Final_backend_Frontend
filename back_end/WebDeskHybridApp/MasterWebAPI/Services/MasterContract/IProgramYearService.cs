using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IProgramYearService
    {
        Task<IEnumerable<ProgramYearMasterVM?>> GetAll(long collegeId);
        Task<ProgramYearMasterVM?> Get(long id);
        Task<long?> Insert(ProgramYearMasterVM programYearMasterVM);
        Task<bool?> Update(ProgramYearMasterVM programYearMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
