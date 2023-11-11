using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface IBoardService
    {
        Task<IEnumerable<BoardGMasterVM?>> GetAll();
        Task<BoardGMasterVM?> Get(long id);
        Task<long?> Insert(BoardGMasterVM BoardGMasterVM);
        Task<bool?> Update(BoardGMasterVM BoardGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
