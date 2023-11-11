using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ICommonSubjectListService
    {
        Task<IEnumerable<CommonSubjectListGMasterVM?>> GetAll();
        Task<CommonSubjectListGMasterVM?> Get(long id);
        Task<long?> Insert(CommonSubjectListGMasterVM commonSubjectListGMasterVM);
        Task<bool?> Update(CommonSubjectListGMasterVM commonSubjectListGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
