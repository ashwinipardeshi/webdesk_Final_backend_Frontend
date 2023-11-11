using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.Services.Common.Contract
{
    public interface IGetMasterNameFromId
    {
        Task<string> GetMasterNameFromIdAPI(string tablename, long? Id);

        Task<List<OptionVM>> GetAllOptions(string tablename);
        
    }
}
