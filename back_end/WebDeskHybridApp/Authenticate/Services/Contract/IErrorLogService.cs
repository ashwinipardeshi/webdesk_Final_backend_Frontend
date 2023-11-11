using Authenticate.ViewModels.Common;

namespace Authenticate.Services.Contract
{
    public interface IErrorLogService
    {
        Task<IEnumerable<ErrorLogVM?>> GetAllErrorLogs();
    }
}
