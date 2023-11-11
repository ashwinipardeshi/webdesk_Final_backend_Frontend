using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface ICollegeService
    {
        Task<IEnumerable<CollegeMasterVM?>> GetAll();
        Task<CollegeMasterVM?> Get(long id);
        Task<long?> Insert(CollegeMasterVM collegeMasterVM);
        Task<bool?> Update(CollegeMasterVM collegeMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
