using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IProgramDetailService
    {
        Task<IEnumerable<ProgramDetailMasterVM?>> GetAll();
        Task<ProgramDetailMasterVM?> Get(long id);
        Task<long?> Insert(ProgramDetailMasterVM programDetailMasterVM);
        Task<bool?> Update(ProgramDetailMasterVM programDetailMasterVM);
        Task<bool?> Delete(long id);
    }
}
