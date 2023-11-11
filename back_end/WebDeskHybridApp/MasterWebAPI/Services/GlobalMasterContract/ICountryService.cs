using MasterWebAPI.ViewModels.Common;
using MasterWebAPI.ViewModels.GlobalMasters;

namespace MasterWebAPI.Services.GlobalMasterContract
{
    public interface ICountryService
    {
        Task<IEnumerable<CountryGMasterVM?>> GetAll();
        Task<CountryGMasterVM?> Get(long id);
        Task<long?> Insert(CountryGMasterVM countryGMasterVM);
        Task<bool?> Update(CountryGMasterVM countryGMasterVM);
        Task<bool?> Delete(long id);
        Task<IEnumerable<OptionVM?>> GetOptions();
    }
}
