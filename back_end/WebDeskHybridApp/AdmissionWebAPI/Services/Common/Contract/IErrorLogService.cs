using AdmissionWebAPI.ViewModels.Common;

namespace AdmissionWebAPI.Services.Common.Contract
{
    public interface IErrorLogService
    {
        Task<IEnumerable<ErrorLogVM?>> GetAllErrorLogs();
    }
}
