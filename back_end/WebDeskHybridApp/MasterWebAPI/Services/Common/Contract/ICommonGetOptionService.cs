using MasterWebAPI.ViewModels.Common;

namespace MasterWebAPI.Services.Common.Contract
{
    public interface ICommonGetOptionService
    {
        Task<string?> GetMasterNameFromId(string tablename, long Id);
        Task<List<OptionVM>> GetMasterOptions(string tablename);
    }
}
