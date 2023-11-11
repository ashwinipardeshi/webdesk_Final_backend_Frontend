using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.Masters;

namespace MasterWebAPI.Services.MasterContract
{
    public interface IDocumentService
    {
        Task<IEnumerable<DocumentMasterVM?>> GetAll(long collegeId);
        Task<DocumentMasterVM?> Get(long id);
        Task<long?> Insert(DocumentMasterVM documentMasterVM);
        Task<bool?> Update(DocumentMasterVM documentMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions(long collegeId);
    }
}
