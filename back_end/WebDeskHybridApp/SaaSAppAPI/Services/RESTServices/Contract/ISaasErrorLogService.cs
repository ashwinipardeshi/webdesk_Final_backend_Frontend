using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.Services.RESTServices.Contract
{
    public interface ISaasErrorLogService
    {
        Task<IEnumerable<ErrorLogVM?>> GetAllErrorLogs();
    }
}
