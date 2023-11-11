using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.ViewModels;

namespace VendorMgtWebAPI.Services.GraphQLServices
{
    [ExtendObjectType(Name = "Query")]
    [Obsolete]
    public class ErrorLogQuery
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public async Task<IEnumerable<ErrorLogVM?>> AllErrorLogMasterAsync([Service] IErrorLogService _service)
        {
            return await _service.GetAllErrorLogs();
        }
    }
}
