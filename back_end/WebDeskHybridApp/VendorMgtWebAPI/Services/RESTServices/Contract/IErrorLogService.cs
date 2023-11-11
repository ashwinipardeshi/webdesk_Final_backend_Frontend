using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.RESTServices.Contract
{
    public interface IErrorLogService
    {
        Task<IEnumerable<ErrorLogVM?>> GetAllErrorLogs();
       
    }
}
