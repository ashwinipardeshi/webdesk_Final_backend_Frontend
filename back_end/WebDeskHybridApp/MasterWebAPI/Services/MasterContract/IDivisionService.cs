using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IDivisionService
    {
        Task<IEnumerable<DivisionMasterVM?>> GetAll(long collegeId);
        Task<DivisionMasterVM?> Get(long id);
        Task<long?> Insert(DivisionMasterVM divisionMasterVM);
        Task<bool?> Update(DivisionMasterVM divisionMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
