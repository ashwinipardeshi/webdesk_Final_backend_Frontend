using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IRelationService
    {
        Task<IEnumerable<RelationGMasterVM?>> GetAll();
        Task<RelationGMasterVM?> Get(long id);
        Task<long?> Insert(RelationGMasterVM relationGmasterVM);
        Task<bool?> Update(RelationGMasterVM relationGmasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
