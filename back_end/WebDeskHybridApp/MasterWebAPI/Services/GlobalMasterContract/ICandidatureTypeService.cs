using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ICandidatureTypeService
    {
        Task<IEnumerable<CandidatureTypeGMasterVM?>> GetAll();
        Task<CandidatureTypeGMasterVM?> Get(long id);
        Task<long?> Insert(CandidatureTypeGMasterVM candidatureTypeGMasterVM);
        Task<bool?> Update(CandidatureTypeGMasterVM candidatureTypeGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
