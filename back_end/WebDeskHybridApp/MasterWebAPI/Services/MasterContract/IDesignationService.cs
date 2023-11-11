using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IDesignationService
    {
        Task<IEnumerable<DesignationMasterVM?>> GetAll(long collegeId);
        Task<DesignationMasterVM?> Get(long id);
        Task<long?> Insert(DesignationMasterVM designationMasterVM);
        Task<bool?> Update(DesignationMasterVM designationMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
