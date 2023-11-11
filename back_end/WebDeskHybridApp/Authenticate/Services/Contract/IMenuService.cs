using Authenticate.ViewModels;

namespace Authenticate.Services.Contract
{
    public interface IMenuService
    {
        Task<IEnumerable<MenuMasterVM?>> GetAll();
        Task<MenuMasterVM?> Get(long id);
        Task<long?> Insert(MenuMasterVM menuMasterVM);
        Task<bool?> Update(MenuMasterVM menuMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<MenuOptionVM?>> GetOptions();
    }
}
