using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
     public interface IBranchService
    {
        Task<IEnumerable<BranchMasterVM?>> GetAll(long collegeId, long programMasterId);
        Task<BranchMasterVM?> Get(long id);
        Task<long?> Insert(BranchMasterVM branchMasterVM);
        Task<bool?> Update(BranchMasterVM branchMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId, long programMasterId);
    }
}
